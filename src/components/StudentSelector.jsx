// src/components/StudentSelector.jsx
import React, { useState, useEffect } from 'react';
import api from '../utils/api';

const StudentSelector = ({ onSelect }) => {
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await api.get('/users/students');
      setStudents(response.data);
    };
    fetchStudents();
  }, []);

  const handleSelectStudent = (studentId) => {
    setSelectedStudents(prev => 
      prev.includes(studentId) 
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleSubmit = () => {
    onSelect(selectedStudents);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Select Students</h2>
      {students.map(student => (
        <div key={student._id} className="flex items-center mb-2">
          <input
            type="checkbox"
            id={student._id}
            checked={selectedStudents.includes(student._id)}
            onChange={() => handleSelectStudent(student._id)}
            className="mr-2"
          />
          <label htmlFor={student._id}>{student.name}</label>
        </div>
      ))}
      <button 
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        Assign Selected Students
      </button>
    </div>
  );
};

export default StudentSelector;