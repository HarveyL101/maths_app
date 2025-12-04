import { useState, useEffect } from 'react';
import './App.css';
import axios from "axios";
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
  const [array, setArray] = useState([]);

  const fetchAPI = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api");

      setArray(response.data.lessons);

      console.log(response.data.lessons);
    } catch(error) {
      console.error("API error:", error.message);
    }
  }

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <>
      <h1>Maths Landing Page</h1>

      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </>
  )
}

export default App;
