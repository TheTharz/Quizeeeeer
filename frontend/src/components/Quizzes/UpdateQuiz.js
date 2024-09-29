import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../api/axiosConfig';

const UpdateQuiz = () => {
  const { id } = useParams(); // Get quiz ID from the URL
  const [quizData, setQuizData] = useState({
    title: '',
    description: '',
    timeLimit: '',
    maxAttempts: '',
  });

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axiosInstance.get(`/api/quizzes/${id}`);
        setQuizData(response.data); // Pre-fill form with existing data
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    };

    fetchQuiz();
  }, [id]);

  const handleChange = (e) => {
    setQuizData({ ...quizData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(
        `/api/quizzes/${id}`,
        { ...quizData },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      alert('Quiz updated successfully!');
      // Redirect or update UI after success
    } catch (error) {
      console.error('Error updating quiz:', error);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-r from-gray-900 via-purple-900 to-gray-800 text-white p-6 flex flex-col items-center'>
      <form
        onSubmit={handleSubmit}
        className='bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md'
      >
        <h2 className='text-3xl font-bold mb-4'>Update Quiz</h2>

        <input
          type='text'
          name='title'
          value={quizData.title}
          onChange={handleChange}
          placeholder='Quiz Title'
          className='border border-gray-700 bg-gray-900 p-2 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-purple-600'
          required
        />

        <textarea
          name='description'
          value={quizData.description}
          onChange={handleChange}
          placeholder='Quiz Description'
          className='border border-gray-700 bg-gray-900 p-2 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-purple-600'
        />

        <input
          type='number'
          name='timeLimit'
          value={quizData.timeLimit}
          onChange={handleChange}
          placeholder='Time Limit (minutes)'
          className='border border-gray-700 bg-gray-900 p-2 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-purple-600'
          required
        />

        <input
          type='number'
          name='maxAttempts'
          value={quizData.maxAttempts}
          onChange={handleChange}
          placeholder='Max Attempts'
          className='border border-gray-700 bg-gray-900 p-2 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-purple-600'
          required
        />

        <button
          type='submit'
          className='bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300'
        >
          Update Quiz
        </button>
      </form>
    </div>
  );
};

export default UpdateQuiz;
