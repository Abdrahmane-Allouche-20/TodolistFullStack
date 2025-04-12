import Home from './components/Home'
import './App.css'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Todo from './components/Todo'
import { Routes,Route } from 'react-router-dom'

function App() {
  return (
    <Routes>
     
        <Route path="/" element={<Home />} /> 
        <Route path="/register" element={<SignUp />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/Login" element={<Login />} />
      
     </Routes>
  )
}

export default App
