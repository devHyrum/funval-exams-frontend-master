import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

// Importar componentes de páginas
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Exams from './pages/Exams';
import Exam from './pages/Exam';
import CreateExam from './pages/CreateExam';
import EditExam from './pages/EditExam';
import Videos from './pages/Videos';
import Students from './pages/Students';
import Grades from './pages/Grades';

const App = () => {
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
      <Route path="/exam/:id" element={user ? <Exam /> : <Navigate to="/login" />} />
      <Route path="/exams/create" element={user?.role === 'teacher' ? <CreateExam /> : <Navigate to="/dashboard" />} />
      <Route path="/exams/edit/:id" element={user?.role === 'teacher' ? <EditExam /> : <Navigate to="/dashboard" />} />
      <Route path="/videos" element={user ? <Videos /> : <Navigate to="/login" />} />
      <Route path="/grades" element={user ? <Grades /> : <Navigate to="/login" />} />
      <Route path="/students" element={user?.role === 'teacher' ? <Students /> : <Navigate to="/dashboard" />} />
      
      {/* Ruta por defecto */}
      <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
    </Routes>
  );
};

export default App;