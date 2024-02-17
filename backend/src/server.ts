import mongoose from 'mongoose';
import http from 'http';
import socket from 'socket.io';
import app from './app';
import Env from './env';

const server: http.Server = new http.Server(app);
const io: socket.Server = new socket.Server(server);

io.on("connection", socket => {
    // Emits socket id whenever a new connection is initiated
    console.log(socket.id);
});
    
export default server;