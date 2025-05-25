// src/components/TodoList.js
import React from 'react';

const TodoList = ({ todos, onDelete }) => {
  return (
    <div className="mt-6 space-y-3">
      {todos.map((todo) => (
        <div key={todo.id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <span className="text-gray-700">{todo.text}</span>
          <button 
            onClick={() => onDelete(todo.id)}
            className="px-3 py-1 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default TodoList;