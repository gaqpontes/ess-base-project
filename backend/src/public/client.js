const socket = io('http://localhost:4000', {});

const messageContainer = document.getElementById('message-container');
const nameInput = document.getElementById('name-input');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    sendMessage();
})

function sendMessage() {
    console.log(messageInput.value);
    const data = {
        name: nameInput.value,
        message: messageInput.value
    }
    socket.emit('message', data);
    renderMessages(true, data);
    messageInput.value = '';
}

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('chat-message', (data) => {
    renderMessages(false, data);
});

function renderMessages(isUserSender, data) {
    const element = `
        <li class="${isUserSender ? 'message-right' : 'message-left'}">
                <p class="message">
                    ${data.message}
                </p>
        </li>
    `;
    messageContainer.innerHTML += element;
}