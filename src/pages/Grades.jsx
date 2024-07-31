// src/pages/Grades.jsx
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import api from '../utils/api';

const Grades = () => {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const response = await api.get('/students/grades');
        setGrades(response.data);
      } catch (err) {
        setError('Error al cargar las calificaciones');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchGrades();
  }, []);

  if (loading) return <Layout><p>Cargando calificaciones...</p></Layout>;
  if (error) return <Layout><p>{error}</p></Layout>;

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Mis Calificaciones</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Examen</th>
            <th className="border border-gray-300 p-2">Calificación</th>
            <th className="border border-gray-300 p-2">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {grades.map(grade => (
            <tr key={grade._id}>
              <td className="border border-gray-300 p-2">{grade.exam.title}</td>
              <td className="border border-gray-300 p-2">{grade.score.toFixed(2)}%</td>
              <td className="border border-gray-300 p-2">{new Date(grade.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default Grades;