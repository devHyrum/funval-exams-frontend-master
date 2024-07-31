import { useState, useEffect } from 'react';
import api from '../utils/api';

export const useExams = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const fetchExams = async () => {
    try {
      setLoading(true);
      const response = await api.get('/exams');
      setExams(response.data);
      setError(null);
    } catch (err) {
      setError('Error al cargar los exámenes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createExam = async (examData) => {
    try {
      const response = await api.post('/exams', examData);
      setExams([...exams, response.data]);
      return response.data;
    } catch (err) {
      setError('Error al crear el examen');
      console.error(err);
      throw err;
    }
  };

  const updateExam = async (id, examData) => {
    try {
      const response = await api.put(`/exams/${id}`, examData);
      setExams(exams.map(exam => exam._id === id ? response.data : exam));
      return response.data;
    } catch (err) {
      setError('Error al actualizar el examen');
      console.error(err);
      throw err;
    }
  };

  const deleteExam = async (id) => {
    try {
      await api.delete(`/exams/${id}`);
      setExams(exams.filter(exam => exam._id !== id));
    } catch (err) {
      setError('Error al eliminar el examen');
      console.error(err);
      throw err;
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  return { exams, loading, error, fetchExams, createExam, updateExam, deleteExam };
};