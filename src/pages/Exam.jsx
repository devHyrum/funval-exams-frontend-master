import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import api from '../utils/api';
import { useAuth } from '../hooks/useAuth';

 export default function Exam() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const response = await api.get(`/exams/${id}`);
        setExam(response.data);
      } catch (err) {
        setError('Error al cargar el examen');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchExam();
  }, [id]);

  if (loading) return <Layout><p>Cargando examen...</p></Layout>;
  if (error) return <Layout><p>{error}</p></Layout>;
  if (!exam) return <Layout><p>No se encontró el examen</p></Layout>;

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">{exam.title}</h1>
      <p>Nivel: {exam.level.name}</p>
      <p>Tiempo: {exam.timer} minutos</p>
      <h2 className="text-xl font-semibold mt-4 mb-2">Preguntas:</h2>
      <ul className="list-disc pl-5">
        {exam.questions.map((question, index) => (
          <li key={index} className="mb-2">
            {question.question} ({question.type})
          </li>
        ))}
      </ul>
      {user.role === 'student' && (
        <button
          onClick={() => navigate(`/exams/${id}/take`)}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
        >
          Comenzar Examen
        </button>
      )}
    </Layout>
  );
};