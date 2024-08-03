import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import QuestionForm from '../components/QuestionForm';
import { useExams } from '../hooks/useExams';
import api from '../utils/api';

  export default function EditExam() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateExam } = useExams();
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [examResponse, levelsResponse] = await Promise.all([
          api.get(`/exams/${id}`),
          api.get('/levels')
        ]);
        setExam(examResponse.data);
        setLevels(levelsResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExam(prev => ({ ...prev, [name]: value }));
  };

  const handleAddQuestion = (newQuestion) => {
    setExam(prev => ({
      ...prev,
      questions: [...prev.questions, newQuestion]
    }));
  };

  const handleEditQuestion = (index, updatedQuestion) => {
    setExam(prev => ({
      ...prev,
      questions: prev.questions.map((q, i) => i === index ? updatedQuestion : q)
    }));
  };

  const handleDeleteQuestion = (index) => {
    setExam(prev => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index)
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const examToUpdate = {
        title: exam.title,
        level: exam.level,
        timer: exam.timer ? Number(exam.timer) : null,
        questions: exam.questions
      };
      console.log('Datos a enviar:', examToUpdate);
      const response = await updateExam(id, examToUpdate);
      console.log('Respuesta del servidor:', response);
      alert('Examen actualizado con éxito');
      navigate('/exams');
    } catch (error) {
      console.error('Error al actualizar el examen:', error);
      alert('Error al actualizar el examen: ' + (error.response?.data?.message || error.message));
    }
  };

  if (loading) return <Layout><p>Cargando examen...</p></Layout>;
  if (!exam) return <Layout><p>No se encontró el examen</p></Layout>;

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Editar Examen</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Título:</label>
          <input
            type="text"
            name="title"
            value={exam.title}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Nivel:</label>
          <select
            name="level"
            value={exam.level}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Seleccionar nivel</option>
            {levels.map(level => (
              <option key={level._id} value={level._id}>{level.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1">Duración del examen (minutos):</label>
          <input
            type="number"
            name="timer"
            value={exam.timer || ''}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <h2 className="text-xl font-semibold mb-2">Preguntas</h2>
        {exam.questions.map((question, index) => (
          <div key={index} className="mb-4 p-4 border rounded">
            <h3 className="font-semibold">Pregunta {index + 1}</h3>
            <p>{question.question}</p>
            <p>Tipo: {question.type}</p>
            {question.type === 'multiple' && (
              <ul className="list-disc pl-5">
                {question.options.map((opt, i) => (
                  <li key={i}>{opt}</li>
                ))}
              </ul>
            )}
            <p>Respuesta correcta: {question.correctAnswer}</p>
            <button
              type="button"
              onClick={() => handleDeleteQuestion(index)}
              className="bg-red-500 text-white px-2 py-1 rounded mt-2"
            >
              Eliminar pregunta
            </button>
          </div>
        ))}
        
        <h3 className="text-lg font-semibold mb-2">Agregar nueva pregunta</h3>
        <QuestionForm onSubmit={handleAddQuestion} />
        
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Actualizar Examen
        </button>
      </form>
    </Layout>
  );
};
