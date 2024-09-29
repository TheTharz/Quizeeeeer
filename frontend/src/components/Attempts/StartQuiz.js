import React, { useState } from 'react';
import axiosInstance from '../../api/axiosConfig';
const StartQuiz = ({ quizId }) => {
  const [attemptId, setAttemptId] = useState(null);

  const handleStartQuiz = async () => {
    try {
      const response = await axiosInstance.post(
        `/api/attempts/${quizId}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setAttemptId(response.data._id);
      // Redirect to quiz questions or show success message
    } catch (error) {
      console.error('Error starting quiz:', error);
    }
  };

  return (
    <div>
      <button onClick={handleStartQuiz}>Start Quiz</button>
      {attemptId && <p>Quiz started! Attempt ID: {attemptId}</p>}
    </div>
  );
};

export default StartQuiz;
