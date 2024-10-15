// Import the TelegramBot class from the node-telegram-bot-api package
const TelegramBot = require("node-telegram-bot-api");

// Bot 'token' obtained from BotFather
const token = ""; // Replace with your actual bot token. eg> const token = '75532~~~bKY50';

// Check if token is provided
if (!token) {
  console.error(
    "Error: TELEGRAM_BOT_TOKEN is not set. Please set it in the environment or in the code."
  );
  process.exit(1); // Exit process with failure
}

// Initialize the bot with the token and enable polling
const bot = new TelegramBot(token, { polling: true });

// Event listener for incoming messages
bot.on("message", (msg) => {
  const chatId = msg.chat.id;

  // Log the entire message object for debugging purposes
  console.log("Received message:", JSON.stringify(msg, null, 2));

  // Check if the message text is 'hello' (case-insensitive)
  if (/^hello$/i.test(msg.text)) {
    const response = "안녕하세요! 반갑습니다.";

    // Send the response message to the chat
    bot.sendMessage(chatId, response);

    // Log the sent message for debugging
    console.log("Sent response:", response);
  }
});
