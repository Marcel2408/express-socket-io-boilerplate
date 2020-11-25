const form = document.querySelector('#form');
const socketCount = document.querySelector('#socket-count');
const clientId = document.querySelector('#socket-id');
const homeLink = document.querySelector('#home-section-link');
const docsLink = document.querySelector('#documentation-link');
const homeSection = document.querySelector('#home-section');
const docsSection = document.querySelector('#documentation');

const socket = io('http://localhost:3000');
socket.emit('/root/new_socket_connected');
let socketId;

const addMessage = (data) => {
  const { message, sender } = data;
  const text = document.createTextNode(message);
  const listItem = document.createElement('li');
  listItem.append(text);
  const chat = document.getElementById('chat-list');
  if (sender === 'user') {
    listItem.classList.add('list-item', 'right');
    setTimeout(() => chat.appendChild(listItem), 200);
  } else {
    listItem.classList.add('list-item', 'left');
    setTimeout(() => chat.appendChild(listItem), 1000);
  }
};

const getPrevMsgs = ({ messages, id }) => {
  messages.forEach((msg) => {
    const { message } = msg;
    addMessage({ message, sender: 'server' });
  });
  socketId = id;
  clientId.innerHTML = socketId;
};

const updateSocketCount = ({ clientCount }) => { socketCount.innerHTML = clientCount; };

const sendMessage = (e) => {
  e.preventDefault();
  const { value } = e.target.firstElementChild;
  e.target.firstElementChild.value = '';
  socket.emit('/root/new_message', { socketId, message: value });
};

// Helper functions
const goToHomepage = (e) => {
  e.preventDefault();
  homeSection.style.width = '100vw';
  homeSection.style.opacity = '1';
  docsSection.style.width = '0';
  docsSection.style.opacity = '0';
};

const goToDocumentation = (e) => {
  e.preventDefault();
  docsSection.style.width = '100vw';
  docsSection.style.opacity = '1';
  homeSection.style.width = '0';
  homeSection.style.opacity = '0';
};

// Reactive elements > Event listeners
form.addEventListener('submit', sendMessage);
homeLink.addEventListener('click', goToHomepage);
docsLink.addEventListener('click', goToDocumentation);

// Socket events
// Whenever the server emits '/root/welcome' event, update website
socket.on('/root/welcome', getPrevMsgs);
// Whenever the server emits '/root/update_socket_count' event, updates number of sockets connected
socket.on('root/update_socket_count', updateSocketCount);
// Whenever the server emits '/root/update_chat' event, add message to the chat
socket.on('/root/update_chat', addMessage);
