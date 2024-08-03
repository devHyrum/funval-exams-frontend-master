import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import api from '../utils/api';
import { useAuth } from '../hooks/useAuth';

export default function Videos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await api.get('/videos');
        setVideos(response.data);
      } catch (err) {
        setError('Error al cargar los videos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  const handleGrade = async (videoId, grade) => {
    try {
      await api.post(`/videos/${videoId}/grade`, { grade });
      setVideos(videos.map(v => v._id === videoId ? {...v, grade} : v));
    } catch (error) {
      console.error('Error al calificar el video:', error);
      alert('Error al calificar el video');
    }
  };

  if (loading) return <Layout><p>Cargando videos...</p></Layout>;
  if (error) return <Layout><p>{error}</p></Layout>;

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Videos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map(video => (
          <div key={video._id} className="bg-white p-4 rounded shadow">
            <video src={video.url} controls className="w-full mb-2" />
            <p className="font-semibold">{video.exam.title}</p>
            {user.role === 'teacher' && (
              <p>Estudiante: {video.student.name}</p>
            )}
            {user.role === 'teacher' && !video.grade && (
              <div className="mt-2">
                <input 
                  type="number" 
                  min="0" 
                  max="100" 
                  className="border rounded p-1 mr-2"
                  placeholder="Calificación"
                  onChange={(e) => handleGrade(video._id, e.target.value)}
                />
                <button
                  onClick={() => handleGrade(video._id, document.querySelector(`input[video-id="${video._id}"]`).value)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Calificar
                </button>
              </div>
            )}
            {video.grade && (
              <p className="mt-2">Calificación: {video.grade}%</p>
            )}
          </div>
        ))}
      </div>
    </Layout>
  );
};