import React, { useState } from 'react';
import axiosInstance from '../../api/axiosConfig';
const Register = () => {
  const [userData, setUserData] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/api/users/register', userData);
      // Redirect to login or show success message
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name='username'
        onChange={handleChange}
        placeholder='Username'
        required
      />
      <input
        name='password'
        type='password'
        onChange={handleChange}
        placeholder='Password'
        required
      />
      <button type='submit'>Register</button>
    </form>
  );
};

export default Register;
