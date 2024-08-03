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
      if (Array.isArray(response.data)) {
        setExams(response.data);
      } else {
        throw new Error('La respuesta no es un array');
      }
      setError(null);
    } catch (err) {
      setError('Error al cargar los exámenes: ' + err.message);
      setExams([]);
    } finally {
      setLoading(false);
    }
  };

  const createExam = async (examData) => {
    try {
      console.log('Enviando datos del examen:', examData);
      const response = await api.post('/exams', examData);
      console.log('Respuesta del servidor:', response.data);
      setExams([...exams, response.data]);
      return response.data;
    } catch (err) {
      console.error('Error al crear el examen:', err.response ? err.response.data : err.message);
      setError('Error al crear el examen: ' + (err.response ? err.response.data.error : err.message));
      throw err;
    }
  };


  const updateExam = async (id, examData) => {
    try {
      const response = await api.put(`/exams/${id}`, examData);
      console.log('Respuesta de la API:', response.data);
      // Actualiza el estado local si es necesario
      return response.data;
    } catch (error) {
      console.error('Error en updateExam:', error);
      throw error;
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