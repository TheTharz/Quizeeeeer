import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { jwtDecode } from 'jwt-decode'; // For decoding JWT token

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false); // To check if the user is an admin
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [timeLimit, setTimeLimit] = useState('');
  const [maxAttempts, setMaxAttempts] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  // Fetch quizzes when the component mounts
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axiosInstance.get('/api/quizzes');
        setQuizzes(response.data);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };

    // Check if the user is an admin
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.role === 'admin') {
        setIsAdmin(true);
      }
    }

    fetchQuizzes();
  }, []);

  // Handle quiz creation
  const handleCreateQuiz = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(
        '/api/quizzes',
        { title, description, timeLimit, maxAttempts },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setQuizzes([...quizzes, response.data]);
      setTitle('');
      setDescription('');
      setTimeLimit('');
      setMaxAttempts('');
      setSuccess('Quiz created successfully!');
      setError('');

      navigate(`/quiz/${response.data._id}/add-questions`);
    } catch (error) {
      setError('Failed to create quiz. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className='min-h-screen flex flex-col items-center bg-gradient-to-r from-purple-800 via-indigo-900 to-purple-700 p-6'>
      <h1 className='text-3xl font-bold text-white mb-6'>Quizzes</h1>

      {isAdmin && (
        <div className='bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md mb-6'>
          <h2 className='text-xl font-semibold text-white mb-4'>
            Create a New Quiz
          </h2>
          <form onSubmit={handleCreateQuiz}>
            <div className='mb-4'>
              <label className='block text-sm font-medium text-white'>
                Title
              </label>
              <input
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className='mt-1 p-3 border rounded-md w-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500'
                placeholder='Enter quiz title'
                required
              />
            </div>

            <div className='mb-4'>
              <label className='block text-sm font-medium text-white'>
                Description
              </label>
              <input
                type='text'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className='mt-1 p-3 border rounded-md w-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500'
                placeholder='Enter quiz description'
                required
              />
            </div>

            <div className='mb-4'>
              <label className='block text-sm font-medium text-white'>
                Time Limit (minutes)
              </label>
              <input
                type='number'
                value={timeLimit}
                onChange={(e) => setTimeLimit(e.target.value)}
                className='mt-1 p-3 border rounded-md w-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500'
                placeholder='Enter time limit'
                required
              />
            </div>

            <div className='mb-4'>
              <label className='block text-sm font-medium text-white'>
                Max Attempts
              </label>
              <input
                type='number'
                value={maxAttempts}
                onChange={(e) => setMaxAttempts(e.target.value)}
                className='mt-1 p-3 border rounded-md w-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500'
                placeholder='Enter max attempts'
                required
              />
            </div>

            <button
              type='submit'
              className='bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 px-4 rounded-md mt-2 hover:from-pink-600 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-pink-600'
            >
              Create Quiz
            </button>
          </form>

          {error && <p className='text-red-500 mt-4'>{error}</p>}
          {success && <p className='text-green-500 mt-4'>{success}</p>}
        </div>
      )}

      <h2 className='text-xl font-semibold text-white mb-4'>
        Available Quizzes
      </h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl'>
        {quizzes.map((quiz) => (
          <div
            key={quiz._id}
            className='bg-gray-800 rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105'
          >
            <h3 className='text-lg font-bold text-white mb-2'>{quiz.title}</h3>
            <p className='text-gray-400 mb-4'>{quiz.description}</p>
            <a
              href={`/quiz/${quiz._id}`}
              className='bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 px-4 rounded-md hover:from-pink-600 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-pink-600'
            >
              Start Quiz
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizList;
