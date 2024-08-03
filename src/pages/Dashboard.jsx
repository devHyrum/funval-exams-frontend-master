import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../hooks/useAuth';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4 text-center">Bienvenido, {user.name}!</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, dignissimos. Consequuntur, voluptas sint omnis vero modi ratione facilis neque aspernatur eveniet eligendi expedita quasi sit fugit libero esse, eum adipisci.</p>
    </Layout>
  );
};

export default Dashboard;