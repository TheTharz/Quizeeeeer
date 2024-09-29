import React, { useState } from 'react';
import axiosInstance from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate(); // useNavigate hook for redirection

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(
        '/api/users/login',
        credentials
      );
      const { token, role } = response.data;

      // Save token and role in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      // Redirect based on user role
      if (role === 'admin') {
        navigate('/'); // Admin dashboard route
      } else {
        navigate('/'); // User dashboard route
      }
    } catch (error) {
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-800 via-indigo-900 to-purple-700'>
      <div className='bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full'>
        <h2 className='text-3xl font-bold text-white text-center mb-6'>
          Login
        </h2>

        {error && <p className='text-red-500 mb-4 text-center'>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label
              htmlFor='email'
              className='block text-white text-sm font-medium mb-2'
            >
              Email
            </label>
            <input
              id='email'
              name='email'
              type='email'
              value={credentials.email}
              onChange={handleChange}
              placeholder='Enter your email'
              className='w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500'
              required
            />
          </div>

          <div className='mb-6'>
            <label
              htmlFor='password'
              className='block text-white text-sm font-medium mb-2'
            >
              Password
            </label>
            <input
              id='password'
              name='password'
              type='password'
              value={credentials.password}
              onChange={handleChange}
              placeholder='Enter your password'
              className='w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500'
              required
            />
          </div>

          <button
            type='submit'
            className='w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-md font-semibold hover:from-pink-600 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-pink-600'
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
