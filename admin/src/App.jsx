import React, { useEffect, useState } from 'react';
import NavBar from './components/NavBar';
import Sidebar from './components/Sidebar';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Add from './pages/Add';
import List from './pages/List';
import Orders from './pages/Orders';
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
console.log("Backend URL:", backendUrl);
export const currency = '$';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');

  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])

  if (token === '') {
    return <Login setToken={setToken} />
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      <NavBar setToken={setToken} />
      <hr />
      <div className="flex w-full">
        <Sidebar />
        <div className="flex-1 mx-8 my-8 text-gray-700 text-base">
          <Routes>
            <Route path="/add" element={token ? <Add token={token} /> : <Navigate to="/" />} />
            <Route path="/list" element={token ? <List token={token} /> : <Navigate to="/" />} />
            <Route path="/order" element={token ? <Orders token={token} /> : <Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
