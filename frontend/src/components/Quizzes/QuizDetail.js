import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosConfig';
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams hook

const QuizDetail = () => {
  const { id } = useParams(); // Get the quiz id from the URL
  const [quiz, setQuiz] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // Store selected answers
  const navigate = useNavigate(); // Initialize useNavigate

  const [attemptId, setAttemptId] = useState(null); // Store attempt ID
  const [timeLeft, setTimeLeft] = useState(null); // Store time left in seconds

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axiosInstance.get(`/api/quizzes/${id}`);
        setQuiz(response.data);
        setTimeLeft(response.data.timeLimit * 60);
      } catch (error) {
        console.error('Error fetching quiz:', error);
      }
    };
    fetchQuiz();
  }, [id]);

  // Timer effect to handle countdown
  useEffect(() => {
    if (timeLeft === 0) {
      handleSubmit(); // Submit the quiz when the time runs out
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Format time (minutes:seconds)
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Handle answer selection
  const handleAnswerSelect = (questionId, option) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  };

  // Handle quiz submission
  const handleSubmit = async () => {
    const answers = Object.keys(selectedAnswers).map((questionId) => ({
      questionId,
      selectedAnswers: [selectedAnswers[questionId]],
    }));

    try {
      const response = await axiosInstance.post(`/api/attempts/${id}`, {
        answers,
      });
      alert(
        `Quiz submitted! You scored ${response.data.attempt.score}/${quiz.questions.length}`
      );
      navigate('/');
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  if (!quiz) return <p className='text-white'>Loading...</p>;

  return (
    <div className='min-h-screen bg-gradient-to-r from-gray-900 via-purple-900 to-gray-800 text-white p-6'>
      <div className='container mx-auto'>
        <h2 className='text-4xl font-bold text-center mb-6'>{quiz.title}</h2>
        <p className='text-lg text-center mb-8'>{quiz.description}</p>

        {/* Timer */}
        <div className='text-2xl text-center mb-6 font-bold'>
          Time Left: {formatTime(timeLeft)}
        </div>

        <ul className='space-y-8'>
          {quiz.questions.map((question) => (
            <li
              key={question._id}
              className='bg-gray-800 p-6 rounded-lg shadow-lg'
            >
              <p className='text-xl font-semibold mb-4'>
                {question.questionText}
              </p>
              <ul className='space-y-2'>
                {question.options.map((option, index) => (
                  <li key={index} className='flex items-center space-x-2'>
                    <label className='inline-flex items-center'>
                      <input
                        type='radio'
                        name={question._id}
                        value={option}
                        className='form-radio h-5 w-5 text-purple-600'
                        checked={selectedAnswers[question._id] === option}
                        onChange={() =>
                          handleAnswerSelect(question._id, option)
                        }
                      />
                      <span className='ml-3'>{option}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <div className='flex justify-center mt-8'>
          <button
            onClick={handleSubmit}
            className='bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300'
          >
            Submit Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizDetail;
