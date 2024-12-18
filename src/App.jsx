import React, { useState } from 'react';
import QuestionCard from './components/QuestionCard';
import ProgressBar from './components/ProgressBar';
import ResultDisplay from './components/ResultDisplay';
import questions from './data/questions.json';

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-8">
        财富创造力测评
      </h1>
      
      {!showResult ? (
        <>
          <ProgressBar 
            current={currentQuestionIndex + 1} 
            total={questions.questions.length} 
          />
          <QuestionCard
            question={questions.questions[currentQuestionIndex]}
            onAnswer={handleAnswer}
            onNext={handleNext}
          />
        </>
      ) : (
        <ResultDisplay answers={answers} />
      )}
    </div>
  );
}

export default App; 