const axios = require('axios');

exports.handleFunctionCall = async (functionCall) => {
  if (functionCall.name === 'get_room_options') {
    return await getRoomOptions();
  } else if (functionCall.name === 'book_room') {
    const { roomId, fullName, email, nights } = JSON.parse(functionCall.arguments);
    return await bookRoom(roomId, fullName, email, nights);
  } else {
    throw new Error(`Unknown function: ${functionCall.name}`);
  }
};

async function getRoomOptions() {
  try {
    const response = await axios.get('https://bot9assignement.deno.dev/rooms');
    return response.data;
  } catch (error) {
    console.error('Error fetching room options:', error);
    throw new Error('Failed to fetch room options');
  }
}

async function bookRoom(roomId, fullName, email, nights) {
  try {
    const response = await axios.post('https://bot9assignement.deno.dev/book', {
      roomId,
      fullName,
      email,
      nights
    });
    return response.data;
  } catch (error) {
    console.error('Error booking room:', error);
    throw new Error('Failed to book room');
  }
}