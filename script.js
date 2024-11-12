
async function query(data) {
    try {
        const response = await fetch("http://localhost:3000/api/v1/prediction/6b61ca6d-0e4d-4dea-8351-6c936b66460e", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        return result.answer;
    } catch (error) {
        console.error("Error:", error);
        return "Sorry, there was an issue connecting to the chatbot.";
    }
}

function sendMessage() {
    const questionInput = document.getElementById("question");
    const message = questionInput.value.trim();
    if (message === "") return;

    addMessage("user-message", message);
    questionInput.value = "";

    addMessage("bot-message", "Typing..."); // Temporary loading message

    query({ question: message }).then(response => {
        // Replace "Typing..." with actual response
        const botMessages = document.getElementsByClassName("bot-message");
        botMessages[botMessages.length - 1].textContent = response;
    });
}

function addMessage(className, text) {
    const messagesDiv = document.getElementById("messages");
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${className}`;
    messageDiv.textContent = text;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

