const form = document.querySelector('#form');
const input = document.querySelector('#chat-message');
const socketCount = document.querySelector('#socket-count');
const clientId = document.querySelector('#socket-id');
const homeLink = document.querySelector('#home-section-link');
const homeSection = document.querySelector('#home-section');
const docsSection = document.querySelector('#documentation');

const socket = io('http://localhost:3000');
socket.emit('/root/new_socket_connected');
let socketId;

// Socket event handlers
function addMessage(data) {
  const { message, sender } = data;
  const text = document.createTextNode(message);
  const listItem = document.createElement('li');
  if (sender === 'user') listItem.classList.add('list-item', 'right');
  else listItem.classList.add('list-item', 'left');
  const chat = document.getElementById('chat-list');
  listItem.appendChild(text);
  if (sender === 'user') setTimeout(() => chat.appendChild(listItem), 200);
  else setTimeout(() => chat.appendChild(listItem), 1000);
}

function getPrevMsgs({ messages, id }) {
  messages.forEach((msg) => {
    const { message } = msg;
    addMessage({ message, sender: 'server' });
  });
  socketId = id;
  clientId.innerHTML = socketId;
}

function updateSocketCount(data) {
  const { clientCount } = data;
  socketCount.innerHTML = clientCount;
}

// Sends a chat message to the server
function sendMessage(e) {
  e.preventDefault();
  const { value } = input;
  input.value = '';
  socket.emit('/root/new_message', { socketId, message: value });
}

// Helper functions
function goToHomepage(e) {
  e.preventDefault();
  homeSection.style.width = '100vw';
  homeSection.style.opacity = '1';
  docsSection.style.width = '0';
  docsSection.style.opacity = '0';
}

// Reactive elements > Event listeners
form.addEventListener('submit', sendMessage);
homeLink.addEventListener('click', goToHomepage);

// Socket events
// Whenever the server emits '/root/welcome' event, update website
socket.on('/root/welcome', getPrevMsgs);
// Whenever the server emits '/root/update_socket_count' event, updates number of sockets connected
socket.on('root/update_socket_count', updateSocketCount);
// Whenever the server emits '/root/update_chat' event, add message to the chat
socket.on('/root/update_chat', addMessage);
