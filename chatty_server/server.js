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

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
let clients = {}
wss.on('connection', (client) => {
  console.log('Client connected');
  //initialize a new client id
  const clientId = uuid()
  //send initial client data
  //clientConnected(client, clientId);
  //handle messages
  client.on('message', broadcastBack)
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  //client.on('close', () => {
    //clientDisconnected(clientId)

  //});
  client.on('close', () => console.log('Client disconnected'));
});
//broadcast - goes through each client and sends message data
wss.broadcast = function(data){
  wss.clients.forEach(function(client){
    if (client.readyState === client.OPEN) {
      client.send(data)
    }
  })
}

function broadcastBack(message) {
  console.log(`Received: ${message}`)
  wss.broadcast(message);
}
//connection event
// function clientConnected(client, clientId){
//   //create client data
//   clients[clientId] = {
//     id: clientId,
//     name: //message or username
//     connectedClients: clients
//   }
// }
// //Setup message to be set to the client
// //includes all currently connected clients
// const setupMsg = {
//   type: 'setup',
//   data: {
//     id: clientId,
//     connectedClients: clients
//   }
// }
// //connection message to be sent to the client
// //tells the client who they are
// const connectionMsg = {
//   type: 'connection',
//   data: clients[clientId]
// }

// if (client.readyState === client.OPEN) {
//   client.send(JSON.stringify(setupMsg))
// }
// wss.broadcast(JSON.stringify(connectionMsg))
// console.log(`>>${clients[clientId].name}`, clients[clientId])
// }
// //handles incoming messages
// function handleMessages(incoming){
//   //Broadcast message back no matter what
//   wss.broadcast(incoming)
//   var message = JSON.parse(incoming)

//   switch(message.type) {
//     case 'action':
//     //update client state based on id
//     clients[message.data.id] = clients[message.data]
//     break

//     default:
//       console.log('Unsupported message: ', message)
//   }
// }


























