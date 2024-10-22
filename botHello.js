// ---------------------
// botHello.js: Basic Telegram Bot Message Response
// ---------------------

// Import the TelegramBot class from the node-telegram-bot-api package
// This class provides essential methods and properties for interacting with the Telegram Bot API
const TelegramBot = require("node-telegram-bot-api");

// Load environment variables using dotenv
// This allows us to securely manage sensitive information, such as API tokens, without hardcoding them into the source code
require("dotenv").config();

// Retrieve the Telegram bot token from the environment variables
// This token is crucial for authenticating the bot and establishing communication with Telegram servers
const token = process.env.TELEGRAM_BOT_TOKEN;

// Verify if the token is correctly set
// If the token is missing, log an error message and terminate the program to prevent unauthorized access
if (!token) {
  console.error(
    "Error: TELEGRAM_BOT_TOKEN is not set. Please set it in the environment variables or in the code."
  );
  process.exit(1); // Exit the process with a failure status to indicate an error
}

// Initialize the bot with the token and enable polling mode
// Polling mode allows the bot to periodically check for new messages from Telegram servers, ensuring real-time interaction
const bot = new TelegramBot(token, { polling: true });

// Set up an event listener for all incoming messages
// This listener triggers a callback function whenever a new message is received by the bot
bot.on("message", (msg) => {
  // Log the entire message object for debugging purposes
  // This helps developers understand the structure and content of incoming messages during development
  console.log("Received message:", JSON.stringify(msg, null, 2));

  // Extract the chat ID from the incoming message
  // The chat ID is used to identify the conversation and send responses back to the correct user
  const chatId = msg.chat.id;
  const text = msg.text?.toLowerCase(); // Convert the message text to lowercase to handle case-insensitive commands

  // Check if the message text is 'hello'
  // If it is, invoke the handleHelloCommand function to process the command
  if (text === "hello") {
    handleHelloCommand(chatId);
  }
  // Additional command handlers can be added here as needed
});

// Function to handle the 'hello' command
// This function sends a friendly greeting message back to the user
function handleHelloCommand(chatId) {
  const response = "Hello~! Nice to meet you :-D";
  bot
    .sendMessage(chatId, response) // Send the greeting message to the user
    .then(() => console.log("Sent response:", response)) // Log the successful sending of the message
    .catch((error) => console.error("Error sending message:", error)); // Log any errors that occur during message sending
}
