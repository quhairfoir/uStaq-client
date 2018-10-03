const express = require('express');
const WebSocket = require('ws');
const SocketServer = require('ws').Server;
const http = require('http');
const https = require('https');

const axios = require('axios');

const uuid = require('uuid/v1');

// Use Damerau-Levenshtein edit distance to detect almost-answers (look for character substitution, deletion, addition, transposition)
const getEditDistance = require('damerau-levenshtein');

const server = express()
  .listen(3001, '0.0.0.0', 'localhost', () => console.log(`Listening on 3001`));

const wss = new SocketServer({ server });

class gameSystem {
  constructor() {
    axios(`http://localhost:8080/stacks/`)
      .then(stacks => {
        this.stacks = stacks.data;
        this.setUpNewGame();
      })
      .catch(error => console.log(error))
  }

  setUpNewGame() {
    wss.broadcastSystemMessage(`A new game is beginning!`)

    let stackData = this.chooseNewStack();
    this.stack = stackData.sentences;
    this.topic = stackData.title;
    this.indicesToReveal = [];
    wss.broadcastSystemMessage(`The new topic is: ${this.topic}`)
    this.currentQuestion = null;
    this.nextQuestion();
  }

  chooseNewStack() {
    if (this.stacks.length === 0) { return null; }

    let r = Math.floor(Math.random() * this.stacks.length);
    return this.stacks[r];
  }

  nextQuestion() {
    if (!this.stack) { return; }

    if (this.currentQuestion === null) {
      this.currentQuestion = 0;
    } else {
      this.currentQuestion++;
      if (this.currentQuestion === this.stack.length) {
        wss.broadcastSystemMessage(`Reached end of stack; starting again.`)
        this.currentQuestion = 0;
      }
    }
    this.question = this.stack[this.currentQuestion].front;
    this.answer = this.stack[this.currentQuestion].back;
    this.answerHash = {};
    this.stack[this.currentQuestion].indicesToHide.forEach(i => {
      let word = this.stack[this.currentQuestion].tokens[i].text.content;
      if (this.answerHash[word] === undefined) {
        this.answerHash[word] = [];
      }
      this.answerHash[word].push(i);
    });
    this.indicesToReveal = [];
    wss.broadcastSystemMessage(`Next question: ${this.question}`);
    wss.broadcastSystemMessage({ state: 'question', field: this.question }, false);
    wss.broadcastSystemMessage({ state: 'indicesToReveal', field: this.indicesToReveal }, false);
  }

  checkMessageForAnswer(msg) {
    let msgWords = msg.split(' ');
    msgWords = Array.from(new Set(msgWords));
    let correctGuesses = new Set;

    for (let word of msgWords) {
      for (let answer of Object.keys(this.answerHash)) {
        const { steps, similarity } = getEditDistance(word.toLowerCase(), answer.toLowerCase());
        if (similarity === 1) {
          wss.broadcastSystemMessage(`${answer}!`, true, '#f0478b');
          correctGuesses.add(answer);
        } else if (steps === 1 || similarity >= 0.8) {
          wss.broadcastSystemMessage(`${word} is close...`);
        }
      }
    }

    for (let correctGuess of correctGuesses) {
      // Update question appearance with correct guesses; pass on information to site.
      let questionArray = this.question.split(' ');
      for (let correctGuessIndex of this.answerHash[correctGuess]) {
        questionArray[correctGuessIndex] = this.stack[this.currentQuestion].tokens[correctGuessIndex].text.content;
      }
      this.question = questionArray.join(' ');
      wss.broadcastSystemMessage({ state: 'question', field: this.question }, false);

      this.indicesToReveal = this.indicesToReveal.concat(this.answerHash[correctGuess]);
      wss.broadcastSystemMessage({ state: 'indicesToReveal', field: this.indicesToReveal }, false);

      delete this.answerHash[correctGuess];
    }

    if (Object.keys(this.answerHash).length === 0) {
      wss.broadcastSystemMessage(`You got it! Get ready for the next question...`, true, '#e0377b');
      setTimeout(() => this.nextQuestion(), 4000);
    }
  }
}

const staqBot = new gameSystem;

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  wss.broadcastSystemMessage(`A new user has joined the chat. We're learning about the following topic: ${staqBot.topic}. Good luck!`);
  wss.broadcastSystemMessage({ state: 'question', field: staqBot.question }, false);
  wss.broadcastSystemMessage({ state: 'indicesToReveal', field: staqBot.indicesToReveal }, false);

  ws.id = uuid();

  ws.on('close', () => {
    console.log('Client disconnected');
    wss.broadcastSystemMessage('A user has disconnected.');
  });

  ws.on('message', function incoming(packet) {
    //wss.broadcastSystemMessage(`...`);

    let parsedPacket = {};
    try {
      parsedPacket = JSON.parse(packet);
      parsedPacket.sender = ws.id;
    } catch(e) {
      console.log('Warning: received a packet in an unexpected format.');
      return;
    }

    if (parsedPacket.type === 'message') {
      wss.broadcast(parsedPacket);
      staqBot.checkMessageForAnswer(parsedPacket.data.message)

      // for debugging
      if (parsedPacket.data.message === 'next') {
        wss.broadcastSystemMessage(`The answer was: "${staqBot.answer}".  Moving on...`);
        staqBot.nextQuestion();
      }
      if (parsedPacket.data.message === 'hint') {
        let answerList = Object.keys(staqBot.answerHash);
        let word = answerList[Math.floor(Math.random() * answerList.length)];
        wss.broadcastSystemMessage(`Okay, here's a hint: ${word.substr(0, word.length / 2) + '...'}`);
      }
      if (parsedPacket.data.message === 'answer') {
        wss.broadcastSystemMessage(`Here's what you're missing: ${Object.keys(staqBot.answerHash).join(' ')}`);
      }
      if (parsedPacket.data.message === 'test') {
        // wss.broadcastSystemMessage({ state: 'topic', field: staqBot.topic }, false);
        // wss.broadcastSystemMessage({ state: 'question', field: staqBot.question }, false);
      }
    } else if (parsedPacket.type === 'system') {
      wss.broadcastSystemMessage(parsedPacket.data);
    } else if (parsedPacket.type === 'protocol') {
      console.log(`--- Incoming protocol message: ${parsedPacket.data} ---`);
    } else {
      // deal with improper communication here if necessary
      console.log(`Received packet with unknown type. Not sure what to do.\n${parsedPacket}`);
    }
  });
});

wss.broadcast = function broadcast(packet) {
  // stamp packet with uuid if it doesn't already have an id;
  // also broadcast # clients
  const id = packet.id || uuid();
  const numClients = wss.clients.size;
  const stringifiedPacket = JSON.stringify({ ...packet, id, numClients });

  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(stringifiedPacket);
    }
  });
};

wss.broadcastSystemMessage = function broadcastSystemMessage(msgText, display = true, colour = '#4a4a4a') {
  const packet = {
    type: 'system',
    display,
    data: {
      username: '🤖 [StaqBot]',
      message: msgText,
      colour, // '#f68ed2'
    },
  }
  wss.broadcast(packet);
}