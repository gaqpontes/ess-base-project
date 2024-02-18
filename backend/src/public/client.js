const socket = io('http://localhost:4000', {});

const messageContainer = document.getElementById('message-container');
const nameInput = document.getElementById('name-input');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const fileForm = document.getElementById('file-form');
const fileInput = document.getElementById('file-input');

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    sendMessage();
})

fileForm.addEventListener('submit', (e) => {
    e.preventDefault();
    sendFile();
});

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

function sendFile() {
    const file = fileInput.files[0];
    const title = file.name;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (() => {
        const data = {
            name: title,
            content: reader.result,
        };
        socket.emit('upload', { data });
    });
};

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('chat-message', (data) => {
    renderMessages(false, data);
});

socket.on('uploaded', (data) => {
    renderFile(false, data);
});

function renderFile(isUserSender, data) {
    const element = `
        <li class="${isUserSender ? 'message-right' : 'message-left'}">
                <p class="message">
                    <img src=${data.buffer} />
                </p>
        </li>
    `;
    messageContainer.innerHTML += element;
}

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