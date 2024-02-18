import mongoose from 'mongoose';
import http from 'http';
import socket from 'socket.io';
import app from './app';

const server: http.Server = new http.Server(app);
const io: socket.Server = new socket.Server(server);

const connectedSockets = new Set();

// Emits socket id whenever a new connection is initiated
io.on("connection", onConnection);
    
function onConnection(socket: socket.Socket) {
    console.log(socket.id);
    connectedSockets.add(socket.id);

    socket.on('disconnect', () => {
        console.log('Socket disconnected', socket.id);
        connectedSockets.delete(socket.id);
    });
    
    socket.on('message', (data) => {
        console.log(data)
        socket.broadcast.emit('chat-message', data)
    });

    socket.on('upload', ({data}) => {
        console.log(data);
    });
}
export default server;