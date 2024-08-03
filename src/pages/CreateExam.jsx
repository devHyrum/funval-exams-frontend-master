import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import QuestionForm from '../components/QuestionForm';
import { useExams } from '../hooks/useExams';
import api from '../utils/api';

export default function CreateExam() {
<div>CreateExam</div>
  const navigate = useNavigate();
  const { createExam } = useExams();
  const [title, setTitle] = useState('');
  const [level, setLevel] = useState('');
  const [timer, setTimer] = useState('');
  const [questions, setQuestions] = useState([]);
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    const fetchLevels = async () => {
      try {
        const response = await api.get('/levels');
        setLevels(response.data);
      } catch (error) {
        console.error('Error fetching levels:', error);
      }
    };
    fetchLevels();
  }, []);

const handleSubmit = async (e) => {
  e.preventDefault();
  if (questions.length === 0) {
    alert('Debes añadir al menos una pregunta al examen.');
    return;
  }
  try {
    await createExam({
      title,
      level,
      timer: timer ? parseInt(timer) : null,
      questions
    });
    alert('Examen creado con éxito');
    navigate('/exams');
  } catch (error) {
    alert('Error al crear el examen: ' + error.message);
  }
};


const handleAddQuestion = (newQuestion) => {
  setQuestions(prevQuestions => [...prevQuestions, newQuestion]);
};

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Create New Exam</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Level:</label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select a level</option>
            {levels.map((level) => (
              <option key={level._id} value={level._id}>
                {level.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1">Exam duration (minutes):</label>
          <input
            type="number"
            value={timer}
            onChange={(e) => setTimer(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Questions</h2>
          <QuestionForm onSubmit={handleAddQuestion} />
          {questions.map((q, index) => (
            <div key={index} className="mb-4 p-4 border rounded">
              <h3 className="font-semibold">Question {index + 1}</h3>
              <p>{q.question}</p>
              <p>Type: {q.type}</p>
              {q.type === 'multiple' && (
                <ul className="list-disc pl-5">
                  {q.options.map((opt, i) => (
                    <li key={i}>{opt}</li>
                  ))}
                </ul>
              )}
              <p>Correct Answer: {q.correctAnswer}</p>
            </div>
          ))}
        </div>
        
        <button  onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Create Exam
        </button>
      </form>
    </Layout>
  );
};
