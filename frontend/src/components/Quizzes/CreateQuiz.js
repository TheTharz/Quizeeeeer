import React, { useState } from 'react';
import axiosInstance from '../../api/axiosConfig';

const CreateQuiz = () => {
  const [quizData, setQuizData] = useState({ title: '', description: '' });

  const handleChange = (e) => {
    setQuizData({ ...quizData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/api/quizzes', quizData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      // Handle successful creation
    } catch (error) {
      console.error('Error creating quiz:', error);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-r from-gray-900 via-purple-900 to-gray-800 text-white p-6 flex justify-center items-center'>
      <form
        onSubmit={handleSubmit}
        className='bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg'
      >
        <h2 className='text-3xl font-bold text-center mb-6'>Create Quiz</h2>

        <div className='mb-4'>
          <label htmlFor='title' className='block text-lg font-semibold mb-2'>
            Quiz Title
          </label>
          <input
            id='title'
            name='title'
            type='text'
            onChange={handleChange}
            placeholder='Enter quiz title'
            className='w-full p-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600'
            required
          />
        </div>

        <div className='mb-6'>
          <label
            htmlFor='description'
            className='block text-lg font-semibold mb-2'
          >
            Description
          </label>
          <textarea
            id='description'
            name='description'
            onChange={handleChange}
            placeholder='Enter quiz description'
            className='w-full p-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 h-32'
            required
          />
        </div>

        <div className='flex justify-center'>
          <button
            type='submit'
            className='bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300'
          >
            Create Quiz
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateQuiz;
