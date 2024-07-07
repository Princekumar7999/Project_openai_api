# Hotel Booking Chatbot

This project implements a simple chatbot for hotel room bookings using Express.js, OpenAI's API, and SQLite with Sequelize.

## Prerequisites

- Node.js (v14 or later)
- npm

## Setup

1. Clone the repository:   git clone  https://github.com/Princekumar7999/dukaanProject

 cd hotel-booking-chatbot

2. Install dependencies:  npm install

3. Create a `.env` file in the root directory and add your OpenAI API key: OPENAI_API_KEY=your_api_key_here
   
4.  Start the server: npm start
  
5. 5. Open your browser and navigate to `http://localhost:3000` to use the chatbot.

## API Endpoints

### POST /chat

Handles user messages and returns chatbot responses.

Request body:
```json
{
"message": "I want to book a room",
"conversationId": "optional-conversation-id"
}

Response:

{
  "message": "Certainly! I'd be happy to help you book a room. Could you please tell me what dates you're looking to stay?",
  "conversationId": "conversation-id"
}

//important(do this also)

 Environment Variables

Create a `.env` file in the root directory of your project:

OPENAI_API_KEY=your_openai_api_key_here
PORT=3000

Update your `app.js` to use the `dotenv` package:

```javascript
// src/app.js
require('dotenv').config();
const express = require('express');
// ... rest of the code

Make sure to install the dotenv package:  npm install dotenv

NEXT :


Package.json

Update your package.json file to include the necessary scripts and dependencies:
{
  "name": "hotel-booking-chatbot",
  "version": "1.0.0",
  "description": "A chatbot for hotel room bookings",
  "main": "src/app.js",
  "scripts": {
    "start": "node src/app.js",
    "dev": "nodemon src/app.js"
  },
  "dependencies": {
    "axios": "^0.21.1",
    "dotenv": "^10.0.0",
    "express": "^4.17.1",
    "openai": "^3.2.1",
    "sequelize": "^6.6.5",
    "sqlite3": "^5.0.2"
  },
  "devDependencies": {
    "nodemon": "^2.0.12"
  }
}

