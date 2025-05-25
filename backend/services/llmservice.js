
const axios = require('axios');

exports.generateSummary = async (todos) => {
  try {
    const prompt = `Create a concise and professional summary of these tasks:\n${todos.map(t => `- ${t.text}`).join('\n')}\n\nSummary:`;
    
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    return response.data.choices[0].message.content.trim();
  } catch (err) {
    throw new Error('LLM API request failed');
  }
};