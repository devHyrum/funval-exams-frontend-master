/* import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import Layout from '../components/Layout';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await api.get('/users/students');
      setStudents(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) return <Layout><p>Cargando estudiantes...</p></Layout>;
  if (error) return <Layout><p>Error: {error}</p></Layout>;

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Mis Alumnos</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Nombre</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Teléfono</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student._id}>
              <td className="py-2 px-4 border-b">{student.name} {student.lastName}</td>
              <td className="py-2 px-4 border-b">{student.email}</td>
              <td className="py-2 px-4 border-b">{student.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default Students; */


import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import api from '../utils/api';
import { useAuth } from '../hooks/useAuth';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [levels, setLevels] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('')
  const [selectedLevel, setSelectedLevel] = useState('')
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await api.get('/users/students');
        setStudents(response.data);
      } catch (err) {
        setError('Error fetching students');
        console.error(err);
      }
    };

    const fetchLevels = async () => {
      try {
        const response = await api.get('/levels')
        setLevels(response.data);
      } catch (error) {
        setError('Error fetching levels')
        console.error(err);
      }
    };

    fetchStudents();
    fetchLevels();
  }, []);

  const handleAssignLevel = async () => {
    if (!selectedStudent || !selectedLevel) {
      alert('Please select both student and level');
      return;
    }
    try {
      const response = await api.post('/students/assign-level', { studentId: selectedStudent, levelId: selectedLevel });
      console.log('Level assigned successfully:', response.data);
      // Refresh students list after assigning level
      const updatedStudents = await api.get('/students');
      setStudents(updatedStudents.data);
    } catch (error) {
      alert('Error assigning level: ' + error.message);
    }
  };

  //if (loading) return <Layout><p>Cargando estudiantes...</p></Layout>;
  if (error) return <Layout><p>{error}</p></Layout>;

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Assign Level to Students</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Last Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Current Level</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
        {students.length === 0 ? (
            <tr>
              <td colSpan="5">No students found</td>
            </tr>
          ) : (
            students.map(student => (
            <tr key={student._id}>
              <td className="border border-gray-300 p-2">{student.name}</td>
              <td className="border border-gray-300 p-2">{student.lastName}</td>
              <td className="border border-gray-300 p-2">{student.email}</td>
              <td className="border border-gray-300 p-2">{student.currentLevel ? student.currentLevel.name : 'No asignado'}</td>

              <td className="border border-gray-300 p-2 justify-center">
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="p-1 border rounded"
                >
                  <option value="">Asignar nivel</option>
                  {levels.map(level => (
                    <option key={level._id} value={level._id}>{level.name}</option>
                  ))}
                </select>
                <button type="submit" className="mx-1 right-0 bg-blue-500 text-white p-2 rounded" onClick={() => setSelectedStudent(student._id)}>Asignar</button>
              </td>
            </tr>
          ))
        )}
        </tbody>
      </table>
      <button onClick={handleAssignLevel} type="submit" className="left-0 mt-1 bg-blue-500 text-white p-2 rounded">Guardar cambios</button>
    </Layout>
  );
};

export default Students;