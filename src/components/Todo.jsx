import { useEffect, useState, useRef } from 'react';
import '../App.css';
import axios from '../axios';
import { AiFillDelete } from 'react-icons/ai';
import errorPic from '../assets/error.png';
import { useNavigate } from 'react-router-dom';
import { IoHome } from "react-icons/io5";

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const ref = useRef();
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found. Please log in.');
      }

      const response = await axios.get('/task', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data.tasks);
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        setError(error.response?.data?.message || 'An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  const addTask = async () => {
    setLoading(true);
    if (!input.trim()) return;
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found. Please log in.');
      }

      await axios.post(
        '/task',
        { task: input },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setInput('');
      ref.current.focus();
      fetchData(); // Refetch tasks after adding a new task
    } catch (error) {
      setError(error.response?.data?.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found. Please log in.');
      }

      await axios.delete(`/task/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      setError(error.response?.data?.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (id) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found. Please log in.');
      }

      const taskToUpdate = tasks.find((task) => task._id === id);
      await axios.patch(
        `/task/${id}`,
        { completed: !taskToUpdate.completed },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === id ? { ...task, completed: !task.completed } : task
        )
      );
    } catch (error) {
      setError(error.response?.data?.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (error) {
    return (
      <div className="h-screen mx-auto max-w-5xl flex flex-col justify-center items-center relative z-40">
        <h1 className="text-white text-2xl md:text-4xl font-bold text-center">Oops!! Something went wrong</h1>
        <p className="text-white text-base md:text-lg font-bold text-center my-5">{error}</p>
        <img src={errorPic} className=" w-1/2 mx-auto" alt="errorPic" />
      </div>
    );
  }

  return (
    <div className=" w-[95%] md:max-w-5xl mx-auto max-h-screen relative z-50 py-6">
     <div className='flex justify-between items-center text-white'>
     <h1 className="text-xl md:text-3xl font-bold ">Make Your Own Today List</h1>
     <button  onClick={() => navigate('/')} className='text-xl md:text-3xl' ><IoHome /></button> 

     </div>
      
      <div className="flex justify-center gap-1 md:gap-3 my-4">
        <input
          type="text"
          placeholder="Add Task..."
          className="flex-1 text-base md:text-xl p-2 md:p-3 font-bold text-white placeholder:text-white/10 outline-none bg-white/20 backdrop-blur-md border border-white/10 rounded-lg shadow-lg"
          onChange={(e) => setInput(e.target.value)}
          ref={ref}
          value={input}
        />
        <button
          onClick={addTask}
          className="bg-gradient-to-br from-blue-600 to-sky-400/70 text-sm md:text-xl text-white font-bold backdrop-blur-md border border-white/10 rounded-lg shadow-lg px-3 md:px-6"
        >
          Add 
        </button>
      </div>
      <div className="flex flex-col gap-3">
        {tasks && tasks.length > 0 ? (
          tasks.map((task) => (
            <div
              onClick={() => updateTask(task._id)}
              className={`flex gap-3 items-center p-3 justify-between transition-all ease-in-out cursor-pointer ${
                task.completed && 'decoration-2 line-through decoration-white'
              } bg-gradient-to-br from-sky-600/20 to-sky-400/20 backdrop-blur-md rounded-lg shadow-lg`}
              key={task._id}
            >
              <h1
                className={` font-bold text-base md:text-lg capitalize transition-all ease-in-out ${
                  task.completed ? 'text-red-500':"text-white"}`}
              >
                {task.task}
              </h1>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteTask(task._id);
                }}
                className="rounded-full flex justify-center items-center h-7 w-7 text-lg bg-white"
              >
                <AiFillDelete />
              </button>
            </div>
          ))
        ) : (
          <p className="text-xl text-white font-bold">There are no tasks</p>
        )}
        {loading && <p className="text-white font-bold text-lg text-center">Loading...</p>}
      </div>
    </div>
  );
}

export default Todo;