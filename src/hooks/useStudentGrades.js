import { useState, useEffect } from 'react';
import api from '../utils/api';

export const useStudentGrades = () => {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchGrades = async () => {
    try {
      setLoading(true);
      const response = await api.get('/students/grades');
      setGrades(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching student grades:', err);
      setError('Error al cargar las calificaciones de los estudiantes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGrades();
  }, []);

  return { grades, loading, error, fetchGrades };
};