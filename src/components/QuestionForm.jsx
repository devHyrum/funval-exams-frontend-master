import React, { useState } from 'react';

const QuestionForm = ({ onSubmit, initialData = {} }) => {
  const [question, setQuestion] = useState(initialData.question || '');
  const [options, setOptions] = useState(initialData.options || ['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState(initialData.correctAnswer || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ question, options, correctAnswer });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block mb-1">Question:</label>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      {options.map((option, index) => (
        <div key={index}>
          <label className="block mb-1">Option {index + 1}:</label>
          <input
            type="text"
            value={option}
            onChange={(e) => {
              const newOptions = [...options];
              newOptions[index] = e.target.value;
              setOptions(newOptions);
            }}
            className="w-full p-2 border rounded"
            required
          />
        </div>
      ))}
      <div>
        <label className="block mb-1">Correct Answer:</label>
        <select
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select correct answer</option>
          {options.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
      </div>
      <button onClick={handleSubmit} type="button" className="bg-blue-500 text-white px-4 py-2 rounded">
        {initialData.question ? 'Update Question' : 'Add Question'}
      </button>
    </div>
  );
};

export default QuestionForm;