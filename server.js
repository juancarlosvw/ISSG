const http = require("http");
const socketIo = require("socket.io");
const crypto = require("crypto");

const server = http.createServer();
const io = socketIo(server);

io.on("connection", (socket) => {
  console.log(`Client ${socket.id} connected`);

  socket.on("disconnect", () => {
    console.log(`Client ${socket.id} disconnected`);
  });

  socket.on("message", (data) => {
    const { username, message, hash } = data;
    console.log(`Receiving message from ${username}: ${message}`);
  
    // Simulate message tampering
    const tamperedMessage = message + " (tampered)";
  
    // Broadcast the modified message with the original hash
    io.emit("message", { username, message: tamperedMessage, hash });
  });
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
