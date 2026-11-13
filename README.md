# Project 8: L'Oréal Chatbot

L’Oréal is exploring the power of AI, and your job is to showcase what's possible. Your task is to build a chatbot that helps users discover and understand L’Oréal’s extensive range of products—makeup, skincare, haircare, and fragrances—as well as provide personalized routines and recommendations.

## 🚀 Launch via GitHub Codespaces

1. In the GitHub repo, click the **Code** button and select **Open with Codespaces → New codespace**.
2. Once your codespace is ready, open the `index.html` file via the live preview.

## ☁️ Cloudflare Note

Before using the chatbot, replace the example `workerUrl` in `script.js` with the Cloudflare Worker URL provided by your class. The browser sends the conversation as a `messages` array to that Worker; the Worker securely calls OpenAI and returns the assistant's reply.

Conversation messages are saved in this browser and restored when the page is opened again. The OpenAI API key stays in the Cloudflare Worker and should never be added to this website's files.

Enjoy building your L’Oréal beauty assistant! 💄
