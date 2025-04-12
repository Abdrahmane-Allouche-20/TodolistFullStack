import { Link } from "react-router-dom";

function Home() {
  return (
    
    <div className='max-w-6xl mx-auto h-screen capitalize z-50 relative flex flex-col gap-11 justify-center items-center  '>
      <div className="text-white w-[95%] md:w-2/3 ">
        <h1 className=" font-black text-blue-500 text-xl md:text-5xl text-center md:leading-[60px] ">Welcome to Your To-Do List Application</h1>
        <p className="text-center font-semibold text-sm md:text-xl mb-2 mt-5">Take control of your life, one task at a time.</p>
        <p className="text-center font-semibold text-xs md:text-lg">Embrace discipline, achieve your goals.</p>
      </div>
      <div className="flex capitalize justify-between text-sm md:text-lg font-bold gap-9">
        <Link to='/login'>
        <button className=" py-2 md:py-2.5 w-[85px] md:w-[150px] hover:scale-110 transition-all ease-in-out rounded-lg md:rounded-xl  text-white  bg-gradient-to-br from-blue-600  to-sky-400">
          login
          </button>
        </Link>
        <Link to='/register'>
        <button className=" py-2 md:py-2.5 w-[85px] md:w-[150px] hover:scale-110 transition-all ease-in-out rounded-lg md:rounded-xl bg-gradient-to-br from-gray-500  to-white">
          Sign Up
          </button>
        </Link>
      </div>
      
    </div>
    
    
  )
}

export default Home