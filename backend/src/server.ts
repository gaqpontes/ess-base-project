import mongoose from 'mongoose';
import http from 'http';
import socket from 'socket.io';
import app from './app';

const server: http.Server = new http.Server(app);
const io: socket.Server = new socket.Server(server);

io.on("connection", socket => {
    // Emits socket id whenever a new connection is initiated
    socket.emit("socket-id", socket.id);
  
    // Sends message body to all users in a conversation
    socket.on("send message", body => {
      io.emit("message", body);
    });
  
  });
  
server.listen(8080, () => console.log("server is running on port 8080"));
  