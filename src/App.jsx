import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

// Importar componentes de páginas
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Exams from './pages/Exams';
import StudentExams from './pages/StudentExams';
import Exam from './pages/Exam';
import CreateExam from './pages/CreateExam';
import EditExam from './pages/EditExam';
import Videos from './pages/Videos';
import Students from './pages/Students';
import Grades from './pages/Grades';
import StudentGrades from './pages/StudentGrades';
import AddLevel from './pages/AddLevel';
import TakeExam from './pages/TakeExam';

export default function App () {
  const { user, loading } = useAuth();
 

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (

    <Routes>
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
      <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
      
      {/* Rutas protegidas */}
      <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path="/exams" element={user ? <Exams /> : <Navigate to="/login" />} />
      <Route path="/student-exams" element={user?.role === 'student' ? <StudentExams /> : <Navigate to="/dashboard" />} />
      <Route path="/student-exams/:id" element={user?.role === 'student' ? <TakeExam /> : <Navigate to="/dashboard" />} />
      <Route path="/exam/:id" element={user ? <Exam /> : <Navigate to="/login" />} />
      <Route path="/exams/create" element={user?.role === 'teacher' ? <CreateExam /> : <Navigate to="/dashboard" />} />
      <Route path="/exams/edit/:id" element={user?.role === 'teacher' ? <EditExam /> : <Navigate to="/dashboard" />} />
      <Route path="/videos" element={user ? <Videos /> : <Navigate to="/login" />} />
      <Route path="/grades" element={user ? <Grades /> : <Navigate to="/login" />} />
      <Route path="/students" element={user?.role === 'teacher' ? <Students /> : <Navigate to="/dashboard" />} />
      <Route path="/student-grades" element={user?.role === 'teacher' ? <StudentGrades /> : <Navigate to="/dashboard" />} />
      <Route path="/add-level" element={user?.role === 'teacher' ? <AddLevel /> : <Navigate to="/dashboard" />} />

      {/* Ruta por defecto */}
      <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
    </Routes>

  );
};