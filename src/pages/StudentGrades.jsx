import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import api from '../utils/api';
import { useAuth } from '../hooks/useAuth';

export default function StudentGrades() {
  const [studentGrades, setStudentGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState('');
  const [levels, setLevels] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [gradesResponse, levelsResponse] = await Promise.all([
          api.get('/students/all-grades'),
          api.get('/levels')
        ]);
        setStudentGrades(gradesResponse.data);
        setLevels(levelsResponse.data);
      } catch (err) {
        console.error('Error al cargar los datos:', err);
        setError('Error al cargar los datos: ' + err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const calculateAverage = (grades) => {
    if (!grades || grades.length === 0) return 0;
    const sum = grades.reduce((acc, grade) => acc + (grade.score || 0), 0);
    return (sum / grades.length).toFixed(2);
  };

  const filteredStudents = selectedLevel
    ? studentGrades.filter(student => student.level && student.level._id === selectedLevel)
    : studentGrades;

  if (loading) return <Layout><p>Cargando calificaciones...</p></Layout>;
  if (error) return <Layout><p>Error: {error}</p></Layout>;

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Registro de Notas de Estudiantes</h1>
      <div className="mb-4">
        <label htmlFor="level-select" className="mr-2">Filtrar por nivel:</label>
        <select
          id="level-select"
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
          className="border rounded p-1"
        >
          <option value="">Todos los niveles</option>
          {levels.map(level => (
            <option key={level._id} value={level._id}>{level.name}</option>
          ))}
        </select>
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Nombre</th>
            <th className="border border-gray-300 p-2">Apellidos</th>
            <th className="border border-gray-300 p-2">Nivel</th>
            {[1, 2, 3, 4, 5].map(num => (
              <th key={num} className="border border-gray-300 p-2">Examen {num}</th>
            ))}
            <th className="border border-gray-300 p-2">Promedio General</th>
            <th className="border border-gray-300 p-2">Estado</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map(student => {
            const average = calculateAverage(student.grades);
            return (
              <tr key={student._id}>
                <td className="border border-gray-300 p-2">{student.name || 'N/A'}</td>
                <td className="border border-gray-300 p-2">{student.lastName || 'N/A'}</td>
                <td className="border border-gray-300 p-2">{student.level?.name || 'N/A'}</td>
                {[0, 1, 2, 3, 4].map(index => (
                  <td key={index} className="border border-gray-300 p-2">
                    {student.grades && student.grades[index] ? student.grades[index].score.toFixed(2) : 'N/A'}
                  </td>
                ))}
                <td className="border border-gray-300 p-2">{average}%</td>
                <td className={`border border-gray-300 p-2 ${average >= 80 ? 'text-green-500' : 'text-red-500'}`}>
                  {average >= 80 ? 'Aprobado' : 'No Aprobado'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Layout>
  );
};



 