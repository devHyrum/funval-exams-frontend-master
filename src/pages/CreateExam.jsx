/* import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExams } from '../hooks/useExams';
import Layout from '../components/Layout';
import QuestionForm from '../components/QuestionForm';

const CreateExam = () => {
  const [title, setTitle] = useState('');
  const [level, setLevel] = useState('');
  const [questions, setQuestions] = useState([]);
  const { createExam } = useExams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (questions.length === 0) {
        alert('Debes añadir al menos una pregunta al examen.');
        return;
      }
      await createExam({ title, level, questions });
      alert('Examen creado con éxito');
      navigate('/exams');
    } catch (error) {
      console.error('Error al crear el examen:', error);
      alert('Error al crear el examen: ' + error.message);
    }
  };

  const handleAddQuestion = (question) => {
    setQuestions([...questions, question]);
  };


  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Crear Nuevo Examen</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Título:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Nivel:</label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Seleccione un nivel</option>
            <option value="Elementary">Elementary</option>
            <option value="A1">A1</option>
            <option value="A2">A2</option>
            <option value="B1">B1</option>
          </select>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Preguntas</h2>
          {questions.map((question, index) => (
            <div key={index} className="mb-4 p-4 border rounded">
              <p><strong>Pregunta:</strong> {question.question}</p>
              <p><strong>Opciones:</strong> {question.options.join(', ')}</p>
              <p><strong>Respuesta correcta:</strong> {question.correctAnswer}</p>
            </div>
          ))}
          <QuestionForm onSubmit={handleAddQuestion} />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Crear Examen
        </button>
      </form>
    </Layout>
  );
};

export default CreateExam; */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import QuestionForm from '../components/QuestionForm';
import { useExams } from '../hooks/useExams';

const CreateExam = () => {
  const navigate = useNavigate();
  const { createExam } = useExams();
  const [title, setTitle] = useState('');
  const [level, setLevel] = useState('');
  const [timer, setTimer] = useState('');
  const [questions, setQuestions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
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

  const handleAddQuestion = (question) => {
    setQuestions([...questions, question]);
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Crear Nuevo Examen</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Título:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Nivel:</label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Seleccione un nivel</option>
            <option value="Elementary">Elementary</option>
            <option value="A1">A1</option>
            <option value="A2">A2</option>
            <option value="B1">B1</option>
          </select>
        </div>
         <div>
          <label className="block mb-1">Tiempo del examen (minutos):</label>
          <input
            type="number"
            value={timer}
            onChange={(e) => setTimer(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Preguntas</h2>
          {questions.map((question, index) => (
            <div key={index} className="mb-4 p-4 border rounded">
              <h3 className="font-semibold">Pregunta {index + 1}</h3>
              <p>{question.question}</p>
              <p>Tipo: {question.type}</p>
              {question.type === 'multiple' && (
                <ul className="list-disc pl-5">
                  {question.options.map((option, optIndex) => (
                    <li key={optIndex}>{option}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          <QuestionForm onSubmit={handleAddQuestion} />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Crear Examen
        </button>
      </form>
    </Layout>
  );
};

export default CreateExam;