import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import QuizList from './components/Quizzes/QuizList';
import QuizDetail from './components/Quizzes/QuizDetail';
import CreateQuiz from './components/Quizzes/CreateQuiz';
import AddQuestion from './components/Questions/AddQuestion';
import StartQuiz from './components/Attempts/StartQuiz';
import UpdateQuiz from './components/Quizzes/UpdateQuiz';
import UpdateQuestion from './components/Questions/UpdateQuestion';
import Navbar from './components/Navbar/Navbar';
import AttemptHistory from './components/Attempts/AttemptHistory';
import Profile from './components/Profile/Profile';

const App = () => {
  const location = useLocation();

  // Define the paths where you don't want to show the Navbar
  const hideNavbarPaths = ['/login'];

  return (
    <>
      {/* Conditionally render the Navbar based on the current location */}
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}

      <Routes>
        <Route path='/' element={<QuizList />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/quiz/:id' element={<QuizDetail />} />
        <Route path='/create-quiz' element={<CreateQuiz />} />
        <Route path='/quiz/:quizId/add-questions' element={<AddQuestion />} />
        <Route path='/quiz/:quizId/start' element={<StartQuiz />} />
        <Route path='/quiz/:id/edit' element={<UpdateQuiz />} />
        <Route path='/question/:id/edit' element={<UpdateQuestion />} />
        <Route path='/attempts' element={<AttemptHistory />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </>
  );
};

const MainApp = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default MainApp;
