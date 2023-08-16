const axios = require('axios');
const {config} = require('dotenv')

config();

const apiKey = process.env.REACT_APP_CHATGPT_API_KEY;
const apiUrl = process.env.REACT_APP_CHATGPT_BASE_URL;
const model = "gpt-3.5-turbo";

console.log(apiKey);
console.log(apiUrl);

const chatGptConfig = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  },
});

async function getChatGptResponse(prompt) {
  try {
    const response = await chatGptConfig.post("", {
      model,
      messages: [
        { role: "system", content: prompt },
      ],
    });

    console.log(response.data.choices[0]);

    return response.data.choices[0].message.content;
  } catch (error) {
    throw new Error("Error connecting to ChatGPT API: " + error.message);
  }
};

module.exports = { getChatGptResponse };
