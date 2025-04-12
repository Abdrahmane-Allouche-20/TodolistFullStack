import { MdEmail, MdLock } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import axios from "../axios";
import { TbDoorExit } from "react-icons/tb";
import '../App.css';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const SendData = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !password) {
      setError('All fields are required.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post('user/register', { firstName, lastName, email, password });
      localStorage.setItem('token', response.data.token); // Store the token
      setError('');
      navigate('/todo'); // Redirect to the Todo List page after successful registration
    } catch (error) {
      if (error.response && error.response.data.message === 'Email already exists') {
        setError('Email already exists. Please use a different email.');
      } else {
        setError('An error occurred during registration.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <h1 className="text-white text-4xl font-bold">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto flex justify-center items-center relative h-screen z-50">
      <div className="relative container w-[95%] md:w-1/2 px-4 py-6">
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 right-4 text-xl md:text-3xl text-white"
        >
          <TbDoorExit />
        </button>
        <h1 className="text-2xl md:text-4xl mt-6 text-center text-white font-black">Sign Up</h1>

        {error && (
          <div className="text-red-500 text-center mb-4">
            {error}
          </div>
        )}

        <form onSubmit={SendData} className='my-5 w-[90%] mx-auto'>
          <div className='mb-5 flex gap-5 items-center border-b text-white border-b-gray-400 p-2 text-base md:text-lg'>
            <FaUser className="text-lg md:text-xl" />
            <input
              type="text"
              id="firstName"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              placeholder='First Name'
              className='outline-none font-semibold bg-transparent w-full placeholder:text-gray-300'
            />
          </div>

          <div className='mb-5 flex gap-5 items-center border-b text-white border-b-gray-400 p-2 text-base md:text-lg'>
            <FaUser className="text-lg md:text-xl" />
            <input
              type="text"
              id="lastName"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              placeholder='Last Name'
              className='outline-none font-semibold bg-transparent w-full placeholder:text-gray-300'
            />
          </div>

          <div className='mb-5 flex gap-5 items-center border-b text-white border-b-gray-400 p-2 text-base md:text-lg'>
            <MdEmail className="text-lg md:text-xl" />
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder='Enter Your Email'
              className='outline-none font-semibold bg-transparent w-full placeholder:text-gray-300'
            />
          </div>

          <div className='mb-5 flex gap-5 items-center border-b text-white border-b-gray-400 p-2 text-base md:text-lg'>
            <MdLock className="text-lg md:text-xl" />
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder='Enter Your Password'
              className='outline-none font-semibold bg-transparent w-full placeholder:text-gray-300'
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="hover:scale-105 transition-all ease-in-out bg-gradient-to-br mt-4 rounded-lg text-lg md:text-xl text-white font-semibold from-blue-700 to-sky-400 w-full p-2 text-center"
          >
            {loading ? 'Loading...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;