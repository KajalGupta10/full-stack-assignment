require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());


const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);


app.get('/api/todos', async (req, res) => {
  try {
    const { data, error } = await supabase.from('todos').select('*');
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

app.post('/api/todos', async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Text is required' });

  try {
    const { data, error } = await supabase
      .from('todos')
      .insert([{ text }])
      .select();
    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create todo' });
  }
});

app.delete('/api/todos/:id', async (req, res) => {
  try {
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', req.params.id);
    if (error) throw error;
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

app.post('/api/summarize', async (req, res) => {
  try {
    const { todos } = req.body;


    if (!todos?.length || !Array.isArray(todos)) {
      return res.status(400).json({ error: 'Invalid todos format' });
    }

   
    const prompt = `Summarize the following tasks in English:\n${
      todos.map(t => `- ${t.text}`).join('\n')
    }\n\nSummary:`;

    const cohereResponse = await axios.post(
      'https://api.cohere.ai/v1/generate',
      {
        model: 'command',
        prompt: prompt,
        max_tokens: 150,
        temperature: 0.7,
        truncate: 'END'
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.COHERE_API_KEY}`,
          'Content-Type': 'application/json',
          'Cohere-Version': '2024-02-15'
        }
      }
    );

    const summary = cohereResponse.data.generations[0].text.trim();

    await axios.post(process.env.SLACK_WEBHOOK, { text: summary });

    res.json({ success: true, summary });
  } catch (err) {
    console.error('Summarize Error:', err.response?.data || err.message);
    res.status(500).json({
      error: 'Failed to generate summary',
      details: err.response?.data?.message
    });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
