  // Chatbot Styles
  const chatbotStyle = document.createElement("style");
  chatbotStyle.innerHTML = `
    #chatbot-container {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 1000;
    }
    #chatbot-toggle {
      background-color: #a70817;
      color: white;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 60px;
      width: 60px;
      font-size: 25px;
    }
    #chatbot-popup {
      display: none;
      position: fixed;
      bottom: 99px;
      right: 20px;
      width: 400px;
      max-height: 500px;
      border-radius: 10px;
      background-color: white;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
      display: flex;
      flex-direction: column;
    }
    #chatbot-header {
    background-color: #a70817;
    color: white;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}
    #chatbot-messages {
      flex: 1;
      padding: 10px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    #chatbot-input-container {
      display: flex;
      border-top: 1px solid #ddd;
    }
    #chatbot-input {
      flex: 1;
      padding: 10px;
      border: none;
      outline: none;
    }
    #chatbot-input-container button {
      background-color: #a70817;
      color: white;
      border: none;
      padding: 10px 30px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    #chatbot-input-container button i {
      font-size: 1.2em;
    }
    #close-chatbot {
      background: none;
      border: none;
      color: white;
      cursor: pointer;
    }
    #close-chatbot i {
      font-size: 1.2em;
    }
    .user-message {
      background-color: #f1f1f1;
      color: black;
      padding: 10px;
      border-radius: 10px;
      align-self: flex-end;
      max-width: 80%;
      word-wrap: break-word;
    }
    .bot-message {
      background-color: #e7f5df;
      padding: 10px;
      color: black;

      border-radius: 10px;
      align-self: flex-start;
      display: flex;
      align-items: center;
      gap: 10px;
      max-width: 80%;
      word-wrap: break-word;
    }
    .bot-message i {
      color: #a70817;
      font-size: 1.5em;
    }
    .typing-indicator {
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .dot {
      width: 8px;
      height: 8px;
      background-color: #333;
      border-radius: 50%;
      animation: blink 1.4s infinite;
    }
    .dot:nth-child(2) {
      animation-delay: 0.2s;
    }
    .dot:nth-child(3) {
      animation-delay: 0.4s;
    }
    @keyframes blink {
      0%, 80%, 100% {
        opacity: 0;
      }
      40% {
        opacity: 1;
      }
    }
  `;
  document.head.appendChild(chatbotStyle);

  // Chatbot JavaScript
  const faq = {
    "hi": "Hello! How can I assist you today?",
    "how to create a post": "To create a post, navigate to the 'Create Post' option in the navigation bar and fill out the form with your content.",
    "how to delete a post": "To delete a post, go to your posts list, select the post you want to delete, and click the delete button next to it.",
    "how to edit a post": "To edit a post, open the post you want to modify, click the edit button, make your changes, and save.",
    "how to change profile image": "To change your profile image, go to your profile settings, upload a new image, and save the changes."
  };

  function toggleChatbot() {
    const chatbotPopup = document.getElementById("chatbot-popup");
    chatbotPopup.style.display = chatbotPopup.style.display === "block" ? "none" : "block";
  }

  function sendMessage() {
    const input = document.getElementById("chatbot-input");
    const messages = document.getElementById("chatbot-messages");

    if (input.value.trim() === "") return;

    // User message
    const userMessage = document.createElement("div");
    userMessage.textContent = input.value;
    userMessage.className = "user-message";
    messages.appendChild(userMessage);

    const userQuery = input.value.toLowerCase();
    const botResponse = faq[userQuery] || "I'm sorry, I don't have an answer for that. Can you try rephrasing?";

    // Simulate typing animation
    const typingIndicator = document.createElement("div");
    typingIndicator.className = "typing-indicator";
    typingIndicator.innerHTML = `<div class="dot"></div><div class="dot"></div><div class="dot"></div>`;
    messages.appendChild(typingIndicator);
    messages.scrollTop = messages.scrollHeight;

    // Simulate bot response
    setTimeout(() => {
      messages.removeChild(typingIndicator);
      const botMessage = document.createElement("div");
      botMessage.className = "bot-message";
      botMessage.innerHTML = `<i class="fa-solid fa-robot"></i> <span>${botResponse}</span>`;
      messages.appendChild(botMessage);
      messages.scrollTop = messages.scrollHeight;
    }, 1000);

    input.value = ""; // Clear input
  }
