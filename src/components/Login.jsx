import { MdEmail, MdLock } from "react-icons/md";
import { TbDoorExit } from "react-icons/tb";
import '../App.css';
import axios from '../axios';
import Avatar from '../assets/vector.png';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const sendData = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("All fields are required.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post('user/login', { email, password });
      localStorage.setItem('token', response.data.token); 
      toast.success("Login successful!");
      setEmail('');
      setPassword('');
      setTimeout(() => navigate('/todo'), 1500); // delay for UX
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto flex justify-center items-center relative h-screen z-50">
      <ToastContainer />
      <div className="relative container w-[95%] md:w-1/2 px-4 py-10">
        <button onClick={() => navigate('/')} className="absolute top-4 right-4 text-xl md:text-3xl text-white">
          <TbDoorExit />
        </button>
        <img src={Avatar} loading="lazy" alt="AVATAR PIC" className="w-1/3 mx-auto" />
        <form onSubmit={sendData} className='my-5 md:w-[90%] mx-auto'>
          <div className='mb-5 flex gap-5 items-center border-b text-white border-b-gray-400 p-2 text-base md:text-lg'>
            <MdEmail className="text-2xl" />
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
            <MdLock className="text-2xl" />
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
            className="hover:scale-105 transition-all ease-in-out bg-gradient-to-br mt-4 rounded-lg text-xl text-white font-semibold from-blue-700 to-sky-400 w-full p-2 text-center"
          >
            {loading ? 'Loading...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
