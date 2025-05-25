// src/components/SummaryButton.js
import React from 'react';

const SummaryButton = ({ onClick, isLoading }) => {
  return (
    <button 
      onClick={onClick}
      disabled={isLoading}
      className={`mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity ${
        isLoading ? 'opacity-70 cursor-not-allowed' : ''
      }`}
    >
      {isLoading ? 'Generating Summary...' : '📩 Send Summary to Slack'}
    </button>
  );
};

export default SummaryButton;