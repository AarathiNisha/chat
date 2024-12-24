const express = require('express');
const WebSocket = require('ws');
const app = express();
const wss = new WebSocket.Server({ port: 8080 });

app.use(express.static('public'));

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

