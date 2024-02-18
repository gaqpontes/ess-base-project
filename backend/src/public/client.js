const SERVER_URL = 'http://localhost:5001/api/messages';

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
    const data = {
        name: nameInput.value,
        message: messageInput.value
    };

    fetch(`${SERVER_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to send message');
        }
        return response.json();
    })
    .then(data => {
        console.log(data.data);
        renderMessages(true, data.data);
        messageInput.value = '';
    })
    .catch(error => {
        console.error('Error sending message:', error);
    });
}

function sendFile() {
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (() => {
        const sentData = {
            name: nameInput.value,
            content: reader.result,
        };

        const data = JSON.stringify(sentData)

        fetch(`${SERVER_URL}/upload`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: data,
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to upload file');
            }
            return response.json();
        })
        .then(data => {
            renderFile(false, data.data);
        })
        .catch(error => {
            console.error('Error uploading file:', error);
        });
    });

}

function renderFile(isUserSender, data) {
    const content = data.content;
    const isImage = isBase64Image(content);
    const isVideo = isBase64Video(content);
    const isAudio = isBase64Audio(content);
    const isPdf = isBase64Pdf(content);

    var elementType = '';
    if (isImage) elementType = 'image';
    else if (isVideo) elementType = 'video';
    else if (isAudio) elementType = 'audio';
    else if (isPdf) elementType = 'pdf';
    else elementType = 'document';

    const element = `
        <li class="${isUserSender ? 'message-right' : 'message-left'}">
                <p class="message">
                    ${elementType === 'image' ? `<img src="${content}" />` : ''}
                    ${elementType === 'video' ? `<video src="${content}" controls></video>` : ''}
                    ${elementType === 'audio' ? `<audio src="${content}" controls></audio>` : ''}
                    ${elementType === 'pdf' ? `<embed src="${content}" type="application/pdf" width="100%" height="600px" />` : ''}
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