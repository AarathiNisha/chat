const socket = new WebSocket('ws://localhost:8080');
const chatLog = document.getElementById('chat-log');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

socket.onmessage = (event) => {
  const message = document.createElement('div');
  message.textContent = event.data;
  chatLog.appendChild(message);
};

sendButton.addEventListener('click', () => {
  const message = messageInput.value;
  socket.send(message);
  messageInput.value = '';
});

messageInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    const message = messageInput.value;
    socket.send(message);
    messageInput.value = '';
  }
});