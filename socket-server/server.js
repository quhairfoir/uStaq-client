// var express = require('express')
// var app = express()


// server = app.listen(3001, function () {
//     console.log('server is running on port 3001')
// });

// var socket = require('socket.io');
// io = socket(server);

// io.on('connection', (socket) => {
//     console.log(socket.id);

//     socket.on('SEND_MESSAGE', function(data){
//         io.emit('RECEIVE_MESSAGE', data)
//     })
// })

const express = require('express');
const WebSocket = require('ws');
const SocketServer = require('ws').Server;
const http = require('http');
const https = require('https');

const uuid = require('uuid/v1');

const server = express()
//   .use(express.static('public'))
  .listen(3001, '0.0.0.0', 'localhost', () => console.log(`Listening on 3001`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  wss.broadcastSystemMessage('A new user has joined the chat.');

  ws.id = uuid();

  ws.on('close', () => {
    console.log('Client disconnected');
    wss.broadcastSystemMessage('A user has disconnected.');
  });

  ws.on('message', function incoming(packet) {
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