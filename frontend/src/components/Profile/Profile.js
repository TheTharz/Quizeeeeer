import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosConfig';
import { jwtDecode } from 'jwt-decode';

const Profile = () => {
  const [user, setUser] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Get the token from local storage
  const token = localStorage.getItem('token');

  // Decode the token to get the user ID
  let userId;
  if (token) {
    const decodedToken = jwtDecode(token);
    userId = decodedToken.id; // Extract user ID from the decoded token
  }

  // Fetch user profile when the component loads
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get(`/api/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
        setName(response.data.name);
        setEmail(response.data.email);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch profile');
        setLoading(false);
      }
    };

    if (token) {
      fetchProfile();
    } else {
      setError('User not authenticated');
      setLoading(false);
    }
  }, [token]);

  // Handle profile update
  const handleUpdate = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setError(null);

    try {
      const updatedData = { name, email };
      if (password) {
        updatedData.password = password; // Add password only if it's updated
      }

      const response = await axiosInstance.put(
        `/api/users/profile`,
        updatedData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSuccessMessage('Profile updated successfully!');
    } catch (err) {
      setError('Failed to update profile');
    }
  };

  if (loading) return <p className='text-white'>Loading...</p>;
  if (error) return <p className='text-red-500'>{error}</p>;

  return (
    <div className='p-6 bg-gradient-to-r from-gray-900 via-black to-gray-800 w-full h-screen'>
      <h1 className='text-4xl font-bold text-white mb-8 text-center'>
        Profile
      </h1>
      {successMessage && (
        <p className='text-green-500 text-center mb-4'>{successMessage}</p>
      )}

      <form
        onSubmit={handleUpdate}
        className='bg-gradient-to-r from-purple-900 to-gray-900 p-8 rounded-lg shadow-lg text-white'
      >
        <div className='mb-6'>
          <label className='block text-lg font-semibold'>Name</label>
          <input
            type='text'
            className='mt-2 p-3 bg-gray-800 text-white rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-500'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Enter your name'
          />
        </div>

        <div className='mb-6'>
          <label className='block text-lg font-semibold'>Email</label>
          <input
            type='email'
            className='mt-2 p-3 bg-gray-800 text-white rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-500'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your email'
          />
        </div>

        <div className='mb-6'>
          <label className='block text-lg font-semibold'>
            Password (Leave empty to keep the current password)
          </label>
          <input
            type='password'
            className='mt-2 p-3 bg-gray-800 text-white rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-500'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter new password (optional)'
          />
        </div>

        <button
          type='submit'
          className='bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg mt-4 w-full transition duration-300'
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
