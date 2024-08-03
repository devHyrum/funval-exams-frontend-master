import { useState, useEffect } from 'react';
import api from '../utils/api';

export const useStudentExams = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStudentExams = async () => {
    try {
      setLoading(true);
      const response = await api.get('/students/exams');
      setExams(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching student exams:', err);
      setError('Error al cargar los exámenes. Por favor, intenta de nuevo más tarde.');
      setExams([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentExams();
  }, []);

  return { exams, loading, error, fetchStudentExams };
};