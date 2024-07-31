// src/pages/TakeExam.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import Layout from '../components/Layout';
import ExamTimer from '../components/ExamTimer';
import VideoRecorder from '../components/VideoRecorder';

const TakeExam = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [videoBlob, setVideoBlob] = useState(null);
  const [timeUp, setTimeUp] = useState(false);

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const response = await api.get(`/exams/${id}`);
        setExam(response.data);
        // Inicializar las respuestas
        const initialAnswers = {};
        response.data.questions.forEach(q => initialAnswers[q._id] = '');
        setAnswers(initialAnswers);
      } catch (error) {
        console.error('Error fetching exam:', error);
        alert('Error al cargar el examen');
      }
    };
    fetchExam();
  }, [id]);

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleVideoRecording = (blob) => {
    setVideoBlob(blob);
  };

/*   const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('answers', JSON.stringify(answers));
      if (videoBlob) {
        formData.append('video', videoBlob, 'recording.webm');
      }
      await api.post(`/students/submit-exam/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Examen enviado con éxito');
      navigate('/dashboard'); // Redirigir al dashboard después de enviar
    } catch (error) {
      console.error('Error submitting exam:', error);
      alert('Error al enviar el examen: ' + error.message);
    }
  }; */

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('answers', JSON.stringify(answers));
      if (videoBlob) {
        formData.append('video', videoBlob, 'recording.webm');
      }
      const response = await api.post(`/students/submit-exam/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert(`Examen enviado con éxito. Tu calificación es: ${response.data.grade.score}`);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error submitting exam:', error);
      alert('Error al enviar el examen: ' + error.message);
    }
  };

  const handleTimeUp = () => {
    setTimeUp(true);
    handleSubmit();
  };

  if (!exam) return <Layout><p>Cargando examen...</p></Layout>;

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">{exam.title}</h1>
      {exam.timer && <ExamTimer duration={exam.timer} onTimeUp={handleTimeUp} />}
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-6">
        {exam.questions.map((question, index) => (
          <div key={question._id} className="bg-white p-4 rounded shadow">
            <p className="font-semibold mb-2">Pregunta {index + 1}: {question.question}</p>
            {question.type === 'simple' && (
              <input
                type="text"
                value={answers[question._id] || ''}
                onChange={(e) => handleAnswer(question._id, e.target.value)}
                className="w-full p-2 border rounded"
                disabled={timeUp}
              />
            )}
            {question.type === 'multiple' && (
              <div className="space-y-2">
                {question.options.map((option, optIndex) => (
                  <label key={optIndex} className="flex items-center">
                    <input
                      type="radio"
                      name={`question-${question._id}`}
                      value={option}
                      checked={answers[question._id] === option}
                      onChange={() => handleAnswer(question._id, option)}
                      className="mr-2"
                      disabled={timeUp}
                    />
                    {option}
                  </label>
                ))}
              </div>
            )}
            {question.type === 'video' && (
              <VideoRecorder onRecordingComplete={handleVideoRecording} />
            )}
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={timeUp}
        >
          Enviar Examen
        </button>
      </form>
    </Layout>
  );
};

export default TakeExam;