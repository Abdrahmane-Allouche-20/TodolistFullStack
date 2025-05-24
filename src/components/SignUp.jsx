import { MdEmail, MdLock } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import axios from "../axios";
import { TbDoorExit } from "react-icons/tb";
import '../App.css';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
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
      await axios.post('user/register', { firstName, lastName, email, password });
      setError('');
      toast.success('Registration successful! Please log in.');
      setShowModal(true); // Show login prompt modal
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

  return (
    <div className="max-w-4xl mx-auto flex justify-center items-center relative h-screen z-50">
      <ToastContainer />
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 shadow-xl text-center">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Registration Successful 🎉</h2>
            <p className="text-gray-700 mb-6">You're all set! Please log in to continue.</p>
            <button
              onClick={() => navigate('/login')}
              className="bg-sky-600 hover:bg-sky-700 text-white px-5 py-2 rounded-md font-semibold"
            >
              Go to Login
            </button>
          </div>
        </div>
      )}

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
          <div className='mb-5 flex gap-5 items-center border-b text-white border-b-gray-400 p-2'>
            <FaUser />
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="outline-none bg-transparent w-full placeholder:text-gray-300"
            />
          </div>

          <div className='mb-5 flex gap-5 items-center border-b text-white border-b-gray-400 p-2'>
            <FaUser />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="outline-none bg-transparent w-full placeholder:text-gray-300"
            />
          </div>

          <div className='mb-5 flex gap-5 items-center border-b text-white border-b-gray-400 p-2'>
            <MdEmail />
            <input
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="outline-none bg-transparent w-full placeholder:text-gray-300"
            />
          </div>

          <div className='mb-5 flex gap-5 items-center border-b text-white border-b-gray-400 p-2'>
            <MdLock />
            <input
              type="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="outline-none bg-transparent w-full placeholder:text-gray-300"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="hover:scale-105 transition-all ease-in-out bg-gradient-to-br mt-4 rounded-lg text-lg md:text-xl text-white font-semibold from-blue-700 to-sky-400 w-full p-2"
          >
            {loading ? 'Loading...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
