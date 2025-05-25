// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoList from './components/TodoList';
import SummaryButton from './components/SummaryButton';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Fetch todos
  useEffect(() => {
    axios.get('http://localhost:5000/api/todos')
      .then((res) => setTodos(res.data))
      .catch((err) => console.error('Fetch error:', err));
  }, []);

  // Add todo
  const addTodo = () => {
    if (!newTodo.trim()) return;
    axios.post('http://localhost:5000/api/todos', { text: newTodo, completed: false })
      .then((res) => setTodos([...todos, res.data]))
      .then(() => setNewTodo(''))
      .catch((err) => setMessage('Error adding todo'));
  };

  // Delete todo
  const deleteTodo = (id) => {
    axios.delete(`http://localhost:5000/api/todos/${id}`)
      .then(() => setTodos(todos.filter(todo => todo.id !== id)))
      .catch((err) => setMessage('Error deleting todo'));
  };

  // Generate summary
  const handleSummary = () => {
    setIsLoading(true);
    axios.post('http://localhost:5000/api/summarize', { todos })
      .then(() => {
        setMessage(' Summary sent to Slack!');
        setIsLoading(false);
      })
      .catch(() => {
        setMessage(' Failed to send summary');
        setIsLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">🚀 Todo Summary Assistant</h1>
      
      <div className="flex gap-2 mb-8">
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter new todo..."
          className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
        />
        <button 
          onClick={addTodo}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Add Todo
        </button>
      </div>

      <TodoList todos={todos} onDelete={deleteTodo} />
      
      <SummaryButton onClick={handleSummary} isLoading={isLoading} />
      
      {message && (
        <p className={`mt-4 p-3 rounded-lg ${message.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default App;