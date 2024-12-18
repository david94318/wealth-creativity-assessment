import React, { useState } from 'react';

function AnswerOptions({ options, onSelect }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (option) => {
    setSelectedOption(option.value);
    onSelect(option.value);
  };

  return (
    <div className="space-y-3">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => handleSelect(option)}
          className={`w-full p-4 text-left rounded-lg border transition-all
            ${selectedOption === option.value 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-200 hover:border-blue-300'
            }`}
        >
          {option.text}
        </button>
      ))}
    </div>
  );
}

export default AnswerOptions; 