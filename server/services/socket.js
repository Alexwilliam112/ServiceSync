'use strict';
const { Server } = require('socket.io')
const Message = require('../models/firebase/Messages')

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
      socket.currentRoom = room; // Store the room on the socket
      console.log(`Client joined room: ${room}`);
    });

    if (socket.handshake.auth){
      console.log('username: ' + socket.handshake.auth.username)
    }

    socket.on("message:new", ({ message, roomId, username }) => {
      const room = socket.currentRoom;
      Message.create({message, roomId, username}) //TODO
      console.log(socket.handshake.auth.username); //username
      console.log(message) //pesan

      // Emit message to everyone in the room
      io.to(room).emit("message:update", {
        from: socket.handshake.auth.username,
        message
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
