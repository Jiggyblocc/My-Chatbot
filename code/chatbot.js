const readline = require('readline');
const { LangChain, ModelType } = require('langchainjs');

// Replace 'your_api_key_here' with your actual API key
const apiKey = 'your_api_key_here';

const langChain = new LangChain({
  modelType: ModelType.GPT3,
  apiKey: apiKey,
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function chatWithBot(userInput) {
  try {
    const response = await langChain.generateText(userInput);
    return response;
  } catch (error) {
    console.error('Error communicating with the chatbot:', error);
    return 'Oops! Something went wrong.';
  }
}

function startChat() {
  rl.question('You: ', async (userInput) => {
    const response = await chatWithBot(userInput);
    console.log('Chatbot:', response);
    startChat(); // Continue the conversation
  });
}

console.log('Chatbot: Hello! Ask me about historical figures.');
startChat(); // Start the conversation
