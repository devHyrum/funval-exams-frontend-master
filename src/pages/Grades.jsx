import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import api from '../utils/api';
import { useAuth } from '../hooks/useAuth';

export default function Grades() {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        setLoading(true);
        const response = await api.get('/students/grades');
        setGrades(response.data.grades);
        setError(null);
      } catch (err) {
        console.error('Error fetching grades:', err);
        setError('Error al cargar las calificaciones: ' + (err.response?.data?.message || err.message));
      } finally {
        setLoading(false);
      }
    };
    fetchGrades();
  }, []);

  const calculateAverage = (grades) => {
    if (grades.length === 0) return 0;
    const sum = grades.reduce((acc, grade) => acc + grade.score, 0);
    return (sum / grades.length).toFixed(2);
  };

  if (loading) return <Layout><p>Cargando calificaciones...</p></Layout>;
  if (error) return <Layout><p>Error: {error}</p></Layout>;

  const average = calculateAverage(grades);
  const passed = average >= 80;

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Mis Calificaciones</h1>
      {grades.length === 0 ? (
        <p>No hay calificaciones disponibles.</p>
      ) : (
        <>
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
                  <td className="border border-gray-300 p-2">{grade.exam?.title || 'N/A'}</td>
                  <td className="border border-gray-300 p-2">{grade.score.toFixed(2) || 'N/A'}%</td>
                  <td className="border border-gray-300 p-2">{new Date(grade.submitted).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4">
            <p className="font-bold">Promedio General: {average}%</p>
            <p className={`font-bold ${passed ? 'text-green-500' : 'text-red-500'}`}>
              {passed ? 'Aprobado' : 'No Aprobado'}
            </p>
          </div>
        </>
      )}
    </Layout>
  );
};
