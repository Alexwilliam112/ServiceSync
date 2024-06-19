'use strict';
const { Server } = require('socket.io')
const MessageModel = require('../models/firebase/messageClass')

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('joinRoom', ({ room }) => {
      socket.join(room);
      console.log(`Client joined room: ${room}`);
    });

    socket.on("message:new", ({ message }) => {
      // MessageModel.create({}) //TODO

      // Emit message to everyone in the room
      io.emit("message:update", {
        message,
        received: false
    });
    console.log(message)
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  return io;
};

module.exports = initializeSocket;
