import React from 'react';
import AnswerOptions from './AnswerOptions';

function QuestionCard({ question, onAnswer, onNext }) {
  const handleOptionSelect = (value) => {
    onAnswer(question.id, value);
    onNext();
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-4">
      <h2 className="text-xl mb-4">{question.text}</h2>
      <AnswerOptions 
        options={question.options} 
        onSelect={handleOptionSelect} 
      />
    </div>
  );
}

export default QuestionCard; 