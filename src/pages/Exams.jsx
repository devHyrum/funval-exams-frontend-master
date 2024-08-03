import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useExams } from '../hooks/useExams';

 
export default function Exams() {
  const { exams, loading, error, deleteExam } = useExams();
  const navigate = useNavigate();

  const handleEdit = (examId) => {
    navigate(`/exams/edit/${examId}`);
  };

  if (loading) return <Layout><p>Cargando exámenes...</p></Layout>;
  if (error) return <Layout><p>{error}</p></Layout>;

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Gestión de Exámenes</h1>
      <Link to="/exams/create" className="bg-green-500 text-white px-4 py-2 rounded mb-4 inline-block">
        Crear Nuevo Examen
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {exams.map(exam => (
          <div key={exam._id} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">{exam.title}</h2>
            <p>Nivel: {exam.level && typeof exam.level === 'object' ? exam.level.name : exam.level}</p>
            <p>Preguntas: {exam.questions ? exam.questions.length : 0}</p>
            <div className="mt-4">
              <button
                onClick={() => handleEdit(exam._id)}
                className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
              >
                Editar
              </button>
              <button
                onClick={() => deleteExam(exam._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};
