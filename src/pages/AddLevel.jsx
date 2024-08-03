import React, { useState } from 'react';
import api from '../utils/api.js';

  export default function AddLevel() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/levels', { name, description });
      setSuccess('Nivel agregado exitosamente');
      setError(null);
      setName('');
      setDescription('');
    } catch (error) {
      setError('Error al agregar el nivel');
      setSuccess(null);
    }
  };

  return (
    <div>
      <h1>Agregar Nivel</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre del Nivel:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Descripción:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">Agregar Nivel</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};
