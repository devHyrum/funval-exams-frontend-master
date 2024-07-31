/* import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import Layout from '../components/Layout';

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await api.get('/videos');
      setVideos(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) return <Layout><p>Cargando videos...</p></Layout>;
  if (error) return <Layout><p>Error: {error}</p></Layout>;

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Mis Videos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map(video => (
          <div key={video._id} className="bg-white shadow-md rounded-lg p-4">
            <video src={video.videoUrl} controls className="w-full mb-2" />
            <p className="font-semibold">{video.exam.title}</p>
            <p className="text-sm text-gray-600">{new Date(video.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Videos; */

import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import api from '../utils/api';
import { useAuth } from '../hooks/useAuth';

const Videos = () => {
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

  if (loading) return <Layout><p>Cargando videos...</p></Layout>;
  if (error) return <Layout><p>{error}</p></Layout>;

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Videos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map(video => (
          <div key={video._id} className="bg-white p-4 rounded shadow">
            <video src={video.url} controls className="w-full mb-2" />
            <p className="font-semibold">{video.title}</p>
            <p>Examen: {video.exam.title}</p>
            {user.role === 'teacher' && (
              <p>Estudiante: {video.student.name}</p>
            )}
            {user.role === 'teacher' && !video.grade && (
              <button
                onClick={() => {/* Implementar lógica para calificar */}}
                className="bg-blue-500 text-white px-3 py-1 rounded mt-2"
              >
                Calificar
              </button>
            )}
            {video.grade && (
              <p className="mt-2">Calificación: {video.grade}</p>
            )}
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Videos;