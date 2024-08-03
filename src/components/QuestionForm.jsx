import React, { useState } from 'react';

  export default function QuestionForm({ onSubmit }) {
  const [question, setQuestion] = useState('');
  const [type, setType] = useState('simple');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');

  const handleAddQuestion = () => {
    if (!question.trim()) {
      alert('La pregunta no puede estar vacía');
      return;
    }

    const newQuestion = {
      question,
      type,
      options: type === 'multiple' ? options.filter(option => option.trim() !== '') : [],
      correctAnswer: type === 'multiple' ? correctAnswer : correctAnswer.trim()

    };


    onSubmit(newQuestion);

    // Resetear el formulario
    setQuestion('');
    setType('simple');
    setOptions(['', '', '', '']);
    setCorrectAnswer('');
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
      <div>
        <label className="block mb-1">Question Type:</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-2 border rounded"
          required
        >
          <option value="simple">Simple</option>
          <option value="multiple">Multiple Choice</option>
          <option value="video">Video</option>
        </select>
      </div>
      {type === 'multiple' && (
        <div>
          <label className="block mb-1">Options:</label>
          {options.map((option, index) => (
            <input
              key={index}
              type="text"
              value={option}
              onChange={(e) => {
                const newOptions = [...options];
                newOptions[index] = e.target.value;
                setOptions(newOptions);
              }}
              className="w-full p-2 border rounded mb-2"
              placeholder={`Option ${index + 1}`}
            />
          ))}
        </div>
      )}
      {type !== 'video' && (
        <div>
          <label className="block mb-1">Correct Answer:</label>
          {type === 'simple' ? (
            <input
              type="text"
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          ) : (
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
          )}
        </div>
      )}
      {type === 'video' && (
        <p>This question will require a video response from the student.</p>
      )}
      <button onClick={handleAddQuestion} type="button" className="bg-green-500 text-white px-4 py-2 rounded">
        Add Question
      </button>
    </div>
  );
};