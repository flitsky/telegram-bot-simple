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
