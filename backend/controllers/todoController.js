require('dotenv').config({ path: __dirname + '/../.env' });

const { createClient } = require('@supabase/supabase-js');
const axios = require('axios');
const { generateSummary } = require('../services/llmService');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

exports.getAllTodos = async (req, res) => {
  try {
    const { data, error } = await supabase.from('todos').select('*');
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
};


exports.createTodo = async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Text is required' });

  try {
    const { data, error } = await supabase
      .from('todos')
      .insert([{ text, completed: false }])
      .select();
    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create todo' });
  }
};


exports.deleteTodo = async (req, res) => {
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
};

exports.summarizeTodos = async (req, res) => {
  try {
    const summary = await generateSummary(req.body.todos);
    await axios.post(process.env.SLACK_WEBHOOK, { text: summary });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Summary failed' });
  }
};