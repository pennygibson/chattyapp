// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid/v4')

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a cllback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
let clients = {}
wss.on('connection', (client) => {
  console.log('Client connected');
  console.log(wss.clients.size);
  let userCount = wss.clients.size;
  wss.broadcast({ type: "UserCountUpdate", count: userCount })
  //initialize a new client id
  const clientId = uuid()
  //send initial client data

  client.on('message', broadcastBack)

  client.on('close', () => {
    console.log('Client disconnected');
    let userCount = wss.clients.size;
    wss.broadcast({ type: "UserCountUpdate", count: userCount })
  });
});
//broadcast - goes through each client and sends message data
wss.broadcast = function(data){

  wss.clients.forEach(function(client){

    if (client.readyState === client.OPEN) {

      client.send(JSON.stringify(data))
    }
  })
}

function broadcastBack(message) {
  message = JSON.parse(message);
  console.log(`Received: ${JSON.stringify(message)}`)
  if (message.type === 'incomingMessage') {
    message.id = uuid()
  }



  wss.broadcast(message);
}



























