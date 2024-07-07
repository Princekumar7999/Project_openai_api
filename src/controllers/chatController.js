const openaiService = require('../services/openaiService');
const bookingService = require('../services/bookingService');
const Conversation = require('../../models/conversation');

exports.handleChat = async (req, res, next) => {
  const { message, conversationId } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    let conversation;
    if (conversationId) {
      conversation = await Conversation.findByPk(conversationId);
      if (!conversation) {
        return res.status(404).json({ error: 'Conversation not found' });
      }
    } else {
      conversation = await Conversation.create();
    }

    const history = JSON.parse(conversation.history || '[]');
    history.push({ role: 'user', content: message });

    const openaiResponse = await openaiService.getChatResponse(history);
    history.push({ role: 'assistant', content: openaiResponse.content });

    if (openaiResponse.function_call) {
      const functionResult = await bookingService.handleFunctionCall(openaiResponse.function_call);
      history.push({ role: 'function', name: openaiResponse.function_call.name, content: JSON.stringify(functionResult) });
      
      const followUpResponse = await openaiService.getChatResponse(history);
      history.push({ role: 'assistant', content: followUpResponse.content });
      
      conversation.history = JSON.stringify(history);
      await conversation.save();
      
      return res.json({
        message: followUpResponse.content,
        conversationId: conversation.id
      });
    }

    conversation.history = JSON.stringify(history);
    await conversation.save();

    res.json({
      message: openaiResponse.content,
      conversationId: conversation.id
    });
  } catch (error) {
    next(error);
  }
};

// src/services/openaiService.js
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

exports.getChatResponse = async (messages) => {
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo-0613',
      messages,
      functions: [
        {
          name: 'get_room_options',
          description: 'Get available room options',
          parameters: {
            type: 'object',
            properties: {},
            required: []
          }
        },
        {
          name: 'book_room',
          description: 'Book a room',
          parameters: {
            type: 'object',
            properties: {
              roomId: { type: 'number' },
              fullName: { type: 'string' },
              email: { type: 'string' },
              nights: { type: 'number' }
            },
            required: ['roomId', 'fullName', 'email', 'nights']
          }
        }
      ],
      function_call: 'auto'
    });

    return response.data.choices[0].message;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw new Error('Failed to get response from OpenAI');
  }
};