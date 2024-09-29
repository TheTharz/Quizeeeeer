import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../api/axiosConfig';

const UpdateQuestion = () => {
  const { id } = useParams(); // Get question ID from the URL
  const [questionData, setQuestionData] = useState({
    questionText: '',
    options: '',
    correctAnswers: '',
  });

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axiosInstance.get(`/api/questions/${id}`);
        const question = response.data;
        setQuestionData({
          questionText: question.questionText,
          options: question.options.join(', '),
          correctAnswers: question.correctAnswers.join(', '),
        });
      } catch (error) {
        console.error('Error fetching question data:', error);
      }
    };

    fetchQuestion();
  }, [id]);

  const handleChange = (e) => {
    setQuestionData({ ...questionData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(
        `/api/questions/${id}`,
        {
          questionText: questionData.questionText,
          options: questionData.options.split(',').map((opt) => opt.trim()),
          correctAnswers: questionData.correctAnswers
            .split(',')
            .map((ans) => ans.trim()),
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      alert('Question updated successfully!');
      // Redirect or update UI after success
    } catch (error) {
      console.error('Error updating question:', error);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-r from-gray-900 via-purple-900 to-gray-800 text-white p-6 flex flex-col items-center'>
      <form
        onSubmit={handleSubmit}
        className='bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md'
      >
        <h2 className='text-3xl font-bold mb-4'>Update Question</h2>

        <input
          type='text'
          name='questionText'
          value={questionData.questionText}
          onChange={handleChange}
          placeholder='Question Text'
          className='border border-gray-700 bg-gray-900 p-2 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-purple-600'
          required
        />

        <input
          type='text'
          name='options'
          value={questionData.options}
          onChange={handleChange}
          placeholder='Options (comma separated)'
          className='border border-gray-700 bg-gray-900 p-2 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-purple-600'
          required
        />

        <input
          type='text'
          name='correctAnswers'
          value={questionData.correctAnswers}
          onChange={handleChange}
          placeholder='Correct Answers (comma separated)'
          className='border border-gray-700 bg-gray-900 p-2 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-purple-600'
          required
        />

        <button
          type='submit'
          className='bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300'
        >
          Update Question
        </button>
      </form>
    </div>
  );
};

export default UpdateQuestion;
