/* import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useExams } from '../hooks/useExams';
import Layout from '../components/Layout';
import QuestionForm from '../components/QuestionForm';

const EditExam = () => {
  const { id } = useParams();
  const { exams, updateExam } = useExams();
  const [exam, setExam] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentExam = exams.find(e => e._id === id);
    if (currentExam) {
      setExam(currentExam);
    }
  }, [id, exams]);

  const handleUpdateQuestion = (index, updatedQuestion) => {
    const updatedQuestions = [...exam.questions];
    updatedQuestions[index] = updatedQuestion;
    setExam({ ...exam, questions: updatedQuestions });
  };

  const handleAddQuestion = (newQuestion) => {
    setExam({ ...exam, questions: [...exam.questions, newQuestion] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateExam(id, exam);
      alert('Examen actualizado con éxito');
      navigate('/exams');
    } catch (error) {
      alert('Error al actualizar el examen: ' + error.message);
    }
  };

  if (!exam) return <Layout><p>Cargando examen...</p></Layout>;

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Editar Examen</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Título:</label>
          <input
            type="text"
            value={exam.title}
            onChange={(e) => setExam({ ...exam, title: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Nivel:</label>
          <select
            value={exam.level}
            onChange={(e) => setExam({ ...exam, level: e.target.value })}
            className="w-full p-2 border rounded"
            required
          >
            <option value="Elementary">Elementary</option>
            <option value="A1">A1</option>
            <option value="A2">A2</option>
            <option value="B1">B1</option>
          </select>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Preguntas</h2>
          {exam.questions.map((question, index) => (
            <div key={index} className="mb-4 p-4 border rounded">
              <QuestionForm
                initialData={question}
                onSubmit={(updatedQuestion) => handleUpdateQuestion(index, updatedQuestion)}
              />
            </div>
          ))}
          <QuestionForm onSubmit={handleAddQuestion} />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Actualizar Examen
        </button>
      </form>
    </Layout>
  );
};

export default EditExam; */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import QuestionForm from '../components/QuestionForm';
import { useExams } from '../hooks/useExams';
import api from '../utils/api';

const EditExam = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateExam } = useExams();
  const [exam, setExam] = useState(null);
  const [title, setTitle] = useState('');
  const [level, setLevel] = useState('');
  const [timer, setTimer] = useState('');
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const response = await api.get(`/exams/${id}`);
        const examData = response.data;
        setExam(examData);
        setTitle(examData.title);
        setLevel(examData.level);
        setTimer(examData.timer ? examData.timer.toString() : '');
        setQuestions(examData.questions);
      } catch (error) {
        console.error('Error fetching exam:', error);
        alert('Error al cargar el examen');
      }
    };
    fetchExam();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateExam(id, {
        title,
        level,
        timer: timer ? parseInt(timer) : null,
        questions
      });
      alert('Examen actualizado con éxito');
      navigate('/exams');
    } catch (error) {
      alert('Error al actualizar el examen: ' + error.message);
    }
  };

  const handleAddQuestion = (question) => {
    setQuestions([...questions, question]);
  };

  const handleUpdateQuestion = (index, updatedQuestion) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = updatedQuestion;
    setQuestions(updatedQuestions);
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  if (!exam) return <Layout><p>Cargando examen...</p></Layout>;

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Editar Examen</h1>
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
              <QuestionForm
                initialData={question}
                onSubmit={(updatedQuestion) => handleUpdateQuestion(index, updatedQuestion)}
              />
              <button
                type="button"
                onClick={() => handleDeleteQuestion(index)}
                className="bg-red-500 text-white px-3 py-1 rounded mt-2"
              >
                Eliminar Pregunta
              </button>
            </div>
          ))}
          <QuestionForm onSubmit={handleAddQuestion} />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Actualizar Examen
        </button>
      </form>
    </Layout>
  );
};

export default EditExam;