import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the token from localStorage (or any other storage)
    localStorage.removeItem('token');

    // Navigate to the login page
    navigate('/login');
  };

  return (
    <nav className='bg-gradient-to-r from-blue-700 via-purple-700 to-blue-700 p-4 shadow-md'>
      <div className='container mx-auto flex justify-between items-center'>
        <div className='text-white font-bold text-2xl'>
          <Link to='/' className='hover:text-pink-500 transition duration-300'>
            Quiz App
          </Link>
        </div>
        <div className='space-x-6 flex items-center'>
          <Link
            to='/'
            className='text-white font-medium hover:text-pink-400 transition duration-300'
          >
            Home
          </Link>
          <Link
            to='/attempts'
            className='text-white font-medium hover:text-pink-400 transition duration-300'
          >
            Attempt History
          </Link>
          <Link
            to='/profile'
            className='text-white font-medium hover:text-pink-400 transition duration-300'
          >
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className='bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300'
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
