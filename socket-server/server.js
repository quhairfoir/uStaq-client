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
    this.answerSet = new Set;
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
    this.answerSet = new Set(this.stack[this.currentQuestion].indicesToHide.map(i => this.stack[this.currentQuestion].tokens[i].text.content));
    wss.broadcastSystemMessage(`Next question: ${this.question}`);
  }

  checkMessageForAnswer(msg) {
    let msgWords = msg.split(' ');
    msgWords = Array.from(new Set(msgWords));
    let correctGuesses = new Set;

    for (let word of msgWords) {
      for (let answer of this.answerSet) {
        const { steps, similarity } = getEditDistance(word.toLowerCase(), answer.toLowerCase());
        if (similarity === 1) {
          wss.broadcastSystemMessage(`${answer}! You got it!`);
          correctGuesses.add(answer);
        } else if (steps === 1 || similarity >= 0.8) {
          wss.broadcastSystemMessage(`${word} is close...`);
        }
      }
    }

    for (let correctGuess of correctGuesses) {
      this.answerSet.delete(correctGuess);
    }
    if (this.answerSet.size === 0) {
      this.nextQuestion();
    }
  }
}

const staqBot = new gameSystem;

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  wss.broadcastSystemMessage(`A new user has joined the chat. Welcome! The current topic is ${staqBot.topic}`);
  wss.broadcastSystemMessage(`Q: ${staqBot.question}`); //  A: ${staqBot.answerSet}`);

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
      console.log(JSON.stringify(parsedPacket))
      staqBot.checkMessageForAnswer(parsedPacket.data.message)

      // for debugging
      if (parsedPacket.data.message === 'next') {
        wss.broadcastSystemMessage(`The answer was: "${staqBot.answer}".  Moving on...`);
        staqBot.nextQuestion();
      }
      if (parsedPacket.data.message === 'hint') {
        let word = Array.from(staqBot.answerSet)[0];
        wss.broadcastSystemMessage(`Okay, here's a hint: ${word.substr(0, word.length / 2) + '...'}`);
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

wss.broadcastSystemMessage = function broadcastSystemMessage(msgText, display = true) {
  const packet = {
    type: 'system',
    display,
    data: {
      username: '🤖 [StaqBot]',
      message: msgText,
    },
  }
  wss.broadcast(packet);
}