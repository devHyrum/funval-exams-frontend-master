import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { useStudentExams } from '../hooks/useStudentExams';
import ErrorBoundary from '../components/ErrorBoundary';

export default function StudentExams() {
  const { exams, loading, error } = useStudentExams();

  if (loading) return <Layout><p>Cargando exámenes...</p></Layout>;
  if (error) return <Layout><p>{error}</p></Layout>;

  return (
    <Layout>
       <ErrorBoundary>
      <h1 className="text-2xl font-bold mb-4">Exámenes Disponibles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {exams.map(exam => (
          <div key={exam._id} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">{exam.title}</h2>
            <p>Nivel: {exam.level && typeof exam.level === 'object' ? exam.level.name : exam.level}</p>
            <p>Preguntas: {exam.questions ? exam.questions.length : 0}</p>
            <Link 
              to={`/student-exams/${exam._id}`} 
              className="bg-blue-500 text-white px-3 py-1 rounded mt-4 inline-block"
            >
              Tomar Examen
            </Link>
          </div>
        ))}
      </div>
      </ErrorBoundary>
    </Layout>
  );
};