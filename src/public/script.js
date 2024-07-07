let conversationId = null;

document.getElementById('chat-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const userInput = document.getElementById('user-input');
    const message = userInput.value.trim();
    if (message) {
        addMessage('user', message);
        userInput.value = '';
        try {
            const response = await sendMessage(message);
            addMessage('bot', response.message);
            conversationId = response.conversationId;
        } catch (error) {
            addMessage('bot', 'Sorry, an error occurred. Please try again.');
        }
    }
});

async function sendMessage(message) {
    const response = await fetch('/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, conversationId }),
    });
    if (!response.ok) {
        throw new Error('Failed to send message');
    }
    return response.json();
}

function addMessage(sender, text) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', `${sender}-message`);
    messageElement.textContent = text;
    document.getElementById('chat-messages').appendChild(messageElement);
    messageElement.scrollIntoView({ behavior: 'smooth' });
}