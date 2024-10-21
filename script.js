// Ensure the Telegram Web App is ready
console.log("Telegram WebApp: Initializing...");
Telegram.WebApp.ready();
console.log("Telegram WebApp: Ready state confirmed.");

// Add dom content loaded event
document.addEventListener("DOMContentLoaded", function () {
  // Button click event to send a message to the backend
  const button = document.getElementById("sendHelloButton");

  button.addEventListener("click", function () {
    console.log("Button clicked. Preparing to send a message...");

    let chatId = Telegram.WebApp.initDataUnsafe.user?.id; // User ID from Telegram
    const message = "Hello from WebApp!";

    if (!chatId) {
      chatId = "1816270380"; // default chat ID
      console.log("Default chat ID used: " + chatId);
    } else {
      console.log("User chat ID retrieved: " + chatId);
    }

    fetch("https://f884-211-48-0-121.ngrok-free.app/send-message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ chatId, message }),
    })
      .then((response) => {
        if (!response.ok) {
          console.error(
            "Network response was not ok. Status: " + response.status
          );
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data?.success) {
          console.log("Message sent successfully!");
        } else {
          console.error(
            "Failed to send message: " + (data.error || "Unknown error")
          );
        }
      })
      .catch((error) => {
        console.error("Error sending message: " + error.message);
      });
  });
});
