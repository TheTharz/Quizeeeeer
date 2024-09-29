import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosConfig';
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode

const AttemptHistory = () => {
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get the token from local storage
  const token = localStorage.getItem('token');

  // Decode the token to get the user ID
  let userId;
  if (token) {
    const decodedToken = jwtDecode(token);
    userId = decodedToken.id; // Extract user ID from decoded token
  }

  useEffect(() => {
    const fetchAttempts = async () => {
      try {
        const response = await axiosInstance.get(`/api/stats/${userId}`);
        setAttempts(response.data);
      } catch (err) {
        setError('Failed to fetch attempt history');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchAttempts();
    } else {
      setError('User ID not found.');
      setLoading(false);
    }
  }, [userId]);

  if (loading) return <p className='text-white'>Loading...</p>;
  if (error) return <p className='text-red-500'>{error}</p>;

  return (
    <div className='p-6 bg-gradient-to-r from-gray-900 via-black to-gray-800 w-full min-h-screen'>
      <h1 className='text-4xl font-bold text-white mb-8 text-center'>
        Attempt History
      </h1>

      <div className='bg-gradient-to-r from-purple-900 to-gray-900 p-8 rounded-lg shadow-lg'>
        <h2 className='text-2xl font-semibold text-white mb-6'>Summary</h2>
        <div className='grid grid-cols-3 gap-6 text-center'>
          <div className='bg-gray-800 p-6 rounded-lg shadow-md'>
            <p className='font-bold text-white'>Total Attempts</p>
            <p className='text-3xl text-purple-400'>{attempts.totalAttempts}</p>
          </div>
          <div className='bg-gray-800 p-6 rounded-lg shadow-md'>
            <p className='font-bold text-white'>Total Score</p>
            <p className='text-3xl text-purple-400'>{attempts.totalScore}</p>
          </div>
          <div className='bg-gray-800 p-6 rounded-lg shadow-md'>
            <p className='font-bold text-white'>Average Score</p>
            <p className='text-3xl text-purple-400'>
              {attempts.averageScore?.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      <h2 className='text-3xl font-semibold text-white mt-12 mb-6 text-center'>
        Detailed Attempts
      </h2>

      <div className='space-y-6'>
        {attempts.attempts?.map((attempt, index) => (
          <div
            key={index}
            className='bg-gradient-to-r from-purple-900 via-gray-900 to-purple-900 p-6 rounded-lg shadow-lg text-white'
          >
            <p className='font-bold text-lg'>Quiz Title: {attempt.quizTitle}</p>
            <p>Score: {attempt.score}</p>
            <p>
              Date: {new Date(attempt.createdAt).toLocaleDateString()} at{' '}
              {new Date(attempt.createdAt).toLocaleTimeString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttemptHistory;
