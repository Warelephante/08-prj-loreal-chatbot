// Find the parts of the page the chatbot needs to use.
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const chatWindow = document.getElementById("chatWindow");
const sendBtn = document.getElementById("sendBtn");

// Replace this example address with the class Cloudflare Worker URL.
const workerUrl = "https://wunda-bot.filippramsey.workers.dev/";
const systemMessage = {
  role: "system",
  content:
    "You are a helpful L'Oreal beauty product advisor. Give clear, thoughtful product and routine suggestions and please politely decline to answer any off-topic questions not related to your role.",
};

// Keep this conversation's messages in memory while the page is open.
const conversationHistory = [];

// Add a message as text so message content is displayed safely.
function addMessage(role, content) {
  const messageElement = document.createElement("div");
  messageElement.className = role === "user" ? "msg user" : "msg ai";
  messageElement.textContent = content;
  chatWindow.appendChild(messageElement);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Show a greeting at the start of each new page session.
addMessage("assistant", "👋 Hello! How can I help you today?");

// Send each new message and include the earlier conversation for context.
chatForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const message = userInput.value.trim();
  if (!message) {
    return;
  }

  conversationHistory.push({ role: "user", content: message });
  addMessage("user", message);
  userInput.value = "";
  userInput.disabled = true;
  sendBtn.disabled = true;

  try {
    const response = await fetch(workerUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [systemMessage, ...conversationHistory],
        temperature: 0.4
      }),
    });

    const data = await response.json();
    if (!response.ok || data.error) {
      throw new Error(
        data.error?.message || "The request could not be completed.",
      );
    }

    if (
      !data.choices ||
      !data.choices[0] ||
      !data.choices[0].message ||
      !data.choices[0].message.content
    ) {
      throw new Error("The Worker returned an unexpected response.");
    }

    const reply = data.choices[0].message.content;
    conversationHistory.push({ role: "assistant", content: reply });
    addMessage("assistant", reply);
  } catch (error) {
    addMessage(
      "assistant",
      `Sorry, I could not get a response. ${error.message}`,
    );
  } finally {
    userInput.disabled = false;
    sendBtn.disabled = false;
    userInput.focus();
  }
});
