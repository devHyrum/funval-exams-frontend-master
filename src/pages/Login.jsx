import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import estudiante from '../assets/estudiante.jpg';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <header className="bg-cover bg-center bg-no-repeat border-t-2 border-blue-600 h-screen flex items-center" style={{ backgroundImage: 'url(https://ik.imagekit.io/q5edmtudmz/peter-lloyd-680526-unsplash_TYZn4kayG.jpg)' }}>
      <div className="flex w-full max-w-6xl mx-auto">
        
        <div className="hidden lg:block lg:w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${estudiante})` }}></div>

        {/* Formulario de inicio de sesión */}
        <div className="w-full lg:w-1/2 bg-white p-8  shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">Welcome Back!</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email Address"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Password"
                required
              />
            </div>
            <div className="flex items-center justify-between mb-6">
              <button
                type="submit"
                className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Sign In
              </button>
              <Link to="#" className="text-blue-600 hover:underline text-sm">Forgot Password?</Link>
            </div>
            <div className="flex items-center justify-center mb-6">
              <span className="border-b w-1/5"></span>
              <span className="text-xs text-gray-500 mx-4">or</span>
              <span className="border-b w-1/5"></span>
            </div>
            <div className="mt-6 text-center">
              <Link to="/register" className="text-blue-600 hover:underline text-sm">Don't have an account? Sign Up</Link>
            </div>
          </form>

          {/* Botones de redes sociales */}
          <div className="mt-6 flex justify-center space-x-4">
            <a href="#" className="bg-blue-500 text-white rounded-full p-3 shadow-md hover:bg-blue-600">
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path d="M12 2.04c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10zm0 18.4c-4.6 0-8.4-3.8-8.4-8.4S7.4 3.6 12 3.6 20.4 7.4 20.4 12 16.6 20.4 12 20.4zm1.4-12.7h-2.8v2.7h2.8v1.5h-2.8v6.6h-1.5v-6.6H8.6v-1.5h1.4v-2.7c0-1.3 1-2.4 2.3-2.4 1.3 0 2.3 1 2.3 2.4v2.7zm-1.4 12.2c.8 0 1.5-.7 1.5-1.5s-.7-1.5-1.5-1.5-1.5.7-1.5 1.5.7 1.5 1.5 1.5zm0-2.4c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9z"/>
              </svg>
            </a>
            <a href="#" className="bg-gray-900 text-white rounded-full p-3 shadow-md hover:bg-gray-800">
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path d="M19.2 3.4c-.7-.3-1.5-.5-2.3-.5-2.4 0-4.3 2-4.3 4.4v1h-2.9v2.9h2.9v7.8h3v-7.8h2.8l.4-2.9h-3.2v-1c0-.9.2-1.4 1.4-1.4h1.5v-3.2h-.2z"/>
              </svg>
            </a>
            <a href="#" className="bg-blue-600 text-white rounded-full p-3 shadow-md hover:bg-blue-700">
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path d="M12 4.3c-3.4 0-6.1 2.8-6.1 6.2 0 3.5 2.7 6.3 6.1 6.3 3.4 0 6.1-2.8 6.1-6.3 0-3.4-2.7-6.2-6.1-6.2zm0 10.1c-2.1 0-3.8-1.7-3.8-3.8s1.7-3.8 3.8-3.8c2.1 0 3.8 1.7 3.8 3.8s-1.7 3.8-3.8 3.8zm4.4-10.3c-.8 0-1.4-.7-1.4-1.4 0-.8.7-1.4 1.4-1.4.8 0 1.4.7 1.4 1.4 0 .8-.7 1.4-1.4 1.4zm-4.4 3.1c-2.3 0-4.1 1.8-4.1 4.1s1.8 4.1 4.1 4.1 4.1-1.8 4.1-4.1-1.8-4.1-4.1-4.1z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
