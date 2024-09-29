import React, { useState } from 'react';
import axiosInstance from '../../api/axiosConfig';
import { useParams } from 'react-router-dom';

const AddQuestions = () => {
  const { quizId } = useParams(); // Get the quiz ID from the URL params
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState(['', '', '', '']); // Options array
  const [correctAnswers, setCorrectAnswers] = useState([]); // Array of correct answers
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle adding a question
  const handleAddQuestion = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post(
        `/api/questions/${quizId}`,
        { questionText, options, correctAnswers }, // Send correct answers as an array
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setQuestionText('');
      setOptions(['', '', '', '']); // Reset options
      setCorrectAnswers([]); // Reset correct answers
      setSuccess('Question added successfully!');
      setError('');
    } catch (error) {
      setError('Failed to add question. Please try again.');
      setSuccess('');
    }
  };

  // Toggle correct answer for options
  const toggleCorrectAnswer = (index) => {
    if (correctAnswers.includes(index)) {
      setCorrectAnswers(correctAnswers.filter((answer) => answer !== index));
    } else {
      setCorrectAnswers([...correctAnswers, index]);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-r from-gray-900 via-purple-900 to-gray-800 text-white p-6 flex flex-col items-center'>
      <h1 className='text-3xl font-bold mb-6'>Add Questions</h1>

      <form
        onSubmit={handleAddQuestion}
        className='bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md'
      >
        <div className='mb-4'>
          <label className='block text-lg font-medium'>Question</label>
          <input
            type='text'
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            className='mt-1 p-2 border border-gray-700 bg-gray-900 rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-600'
            required
          />
        </div>

        <div className='mb-4'>
          <label className='block text-lg font-medium'>Answers</label>
          {options.map((option, index) => (
            <div key={index} className='flex items-center mb-2'>
              <input
                type='text'
                value={option}
                onChange={(e) => {
                  const newOptions = [...options];
                  newOptions[index] = e.target.value;
                  setOptions(newOptions);
                }}
                className='mt-1 p-2 border border-gray-700 bg-gray-900 rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-600'
                required
              />
              <input
                type='checkbox'
                checked={correctAnswers.includes(index)}
                onChange={() => toggleCorrectAnswer(index)}
                className='ml-2 h-5 w-5'
              />
              <label className='ml-1 text-sm'>Correct</label>
            </div>
          ))}
        </div>

        <button
          type='submit'
          className='bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300'
        >
          Add Question
        </button>
      </form>

      {error && <p className='text-red-500 mt-4'>{error}</p>}
      {success && <p className='text-green-500 mt-4'>{success}</p>}
    </div>
  );
};

export default AddQuestions;
