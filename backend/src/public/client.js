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
    const isImage = isBase64Image(data.buffer);
    const isVideo = isBase64Video(data.buffer);
    const isAudio = isBase64Audio(data.buffer);
    const isPdf = isBase64Pdf(data.buffer);

    var elementType = '';
    if (isImage) elementType = 'image';
    else if (isVideo) elementType = 'video';
    else if (isAudio) elementType = 'audio';
    else if (isPdf) elementType = 'pdf';
    else elementType = 'document';

    const element = `
        <li class="${isUserSender ? 'message-right' : 'message-left'}">
                <p class="message">
                    ${elementType === 'image' ? `<img src="${data.buffer}" />` : ''}
                    ${elementType === 'video' ? `<video src="${data.buffer}" controls></video>` : ''}
                    ${elementType === 'audio' ? `<audio src="${data.buffer}" controls></audio>` : ''}
                    ${elementType === 'pdf' ? `<embed src="${data.buffer}" type="application/pdf" width="100%" height="600px" />` : ''}
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

function isBase64Image(buffer) {
    return new RegExp('^data:image\/(jpeg|png|gif);base64,').test(buffer);
}

function isBase64Video(buffer) {
    return new RegExp('^data:video\/(mp4|webm);base64,').test(buffer);
}

function isBase64Audio(buffer) {
    return new RegExp('^data:audio\/(mp3|wav);base64,').test(buffer);
}

function isBase64Pdf(buffer) {
    return new RegExp('^data:application\/pdf;base64,').test(buffer);
}