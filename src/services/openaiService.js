const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

exports.getChatResponse = async (messages) => {
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
};