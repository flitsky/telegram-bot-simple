// ---------------------
// botHello.js: Basic Telegram Bot Message Response
// ---------------------

// Import the TelegramBot class from the node-telegram-bot-api package
// This class provides core functionality for interacting with the Telegram Bot API
const TelegramBot = require("node-telegram-bot-api");

// Load environment variables using dotenv
// This allows us to manage sensitive information (like API tokens) without exposing them directly in the code
require("dotenv").config();

// Retrieve the Telegram bot token from the environment variables
// This token is used to authenticate the bot and communicate with Telegram servers
const token = process.env.TELEGRAM_BOT_TOKEN;

// Check if the token is properly set
// If not, log an error message and exit the program
if (!token) {
  console.error(
    "Error: TELEGRAM_BOT_TOKEN is not set. Please set it in the environment variables or in the code."
  );
  process.exit(1); // Exit the process with a failure status
}

// Initialize the bot with the token and enable polling mode
// Polling mode allows the bot to periodically check for new messages from Telegram servers
const bot = new TelegramBot(token, { polling: true });

// Set up an event listener for all incoming messages
bot.on("message", (msg) => {
  // Extract the chat ID where the message came from
  // This ID will be used later to send a response
  const chatId = msg.chat.id;

  // Log the entire message object for debugging purposes
  // This helps in understanding the structure of incoming messages during development
  console.log("Received message:", JSON.stringify(msg, null, 2));

  // Check if the message text is exactly 'hello' (case-insensitive)
  // We use a regular expression to ensure an exact match
  if (/^hello$/i.test(msg.text)) {
    // Set the response message in Korean
    const response = "Hello~! Nice to meet you :-D";

    // Send the response message to the chat
    bot.sendMessage(chatId, response);

    // Log the sent response for debugging
    console.log("Sent response:", response);
  }
});

// ---------------------
// botWithWebApp.js: Telegram Bot with Web App
// ---------------------

// Import the Express framework
const express = require("express");

// Import the HTTPS module to create an HTTPS server
const https = require("https");

// Import the fs module to read SSL certificate files
const fs = require("fs");

// Import the cors middleware
const cors = require("cors");

// Import the body-parser middleware
// This middleware is used to parse incoming request bodies in a middleware before your handlers
const bodyParser = require("body-parser");

// Create an Express application
const app = express();
const port = process.env.PORT || 3000;

// Use the CORS middleware
app.use(cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Define a route for the root URL
app.get("/", (req, res) => {
  res.send("Hello, World!"); // Send a simple response
});

// REST API Endpoint to send a message to a specific chat
app.post("/send-message", async (req, res) => {
  try {
    const { chatId, message } = req.body;
    console.log(req.body);

    if (!chatId || !message) {
      return res.status(400).send({ error: "chatId and message are required" });
    }

    await bot.sendMessage(chatId, message);
    console.log(`Sent message to chat ${chatId}: ${message}`);
    res.send({ success: true });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).send({ error: "Failed to send message" });
  }
});

// HTTPS options to create an HTTPS server
const httpsOptions = {
  key: fs.readFileSync("c:\\Users\\A\\private-key.pem"),
  cert: fs.readFileSync("c:\\Users\\A\\certificate.pem"),
};

// Start the HTTPS REST API server
https.createServer(httpsOptions, app).listen(port, () => {
  console.log(`HTTPS REST API server is running at https://localhost:${port}`);
});
