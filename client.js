const io = require("socket.io-client");
const readline = require("readline");
const crypto = require("crypto");

const socket = io("http://localhost:3000");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "> "
});

let username = "";

socket.on("connect", () => {
  console.log("Connected to the server");

  rl.question("Enter your username: ", (input) => {
    username = input;
    console.log(`Welcome, ${username} to the chat`);
    rl.prompt();

    rl.on("line", (message) => {
      if (message.trim()) {
        // Generate hash for the message
        const hash = crypto.createHash("sha256").update(message).digest("hex");
        
        // Send the message and hash to the server
        socket.emit("message", { username, message, hash });
      }
      rl.prompt();
    });
  });
});

socket.on("message", (data) => {
  const { username: senderUsername, message: senderMessage, hash: receivedHash } = data;

  // Generate hash for the received message and verify it
  const computedHash = crypto.createHash("sha256").update(senderMessage).digest("hex");

  if (receivedHash === computedHash) {
    // Display message if hash matches
    if (senderUsername !== username) {
      console.log(`${senderUsername}: ${senderMessage}`);
    }
  } else {
    console.log(`Warning: Message from ${senderUsername} modified by server.`);
  }

  rl.prompt();
});

socket.on("disconnect", () => {
  console.log("Server disconnected, Exiting...");
  rl.close();
  process.exit(0);
});

rl.on("SIGINT", () => {
  console.log("\nExiting...");
  socket.disconnect();
  rl.close();
  process.exit(0);
});
