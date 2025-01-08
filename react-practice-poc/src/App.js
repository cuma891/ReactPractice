import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmployeeList from './components/EmployeeList.jsx'
import Login from './components/Login.js'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import './App.css';
import AddEmployee from './components/AddEmployee.jsx';

function App() {

  const [showLoginDialog, setShowLoginDialog] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const openLoginDialog = () => {
    setShowLoginDialog(true);
  };

  const closeLoginDialog = () => {
    setShowLoginDialog(false);
  };

  return (
    <div className="App min-h-screen">
      <Router>
      <Header />
      {!isLoggedIn ? (
        <>
        <div className="flex items-center justify-between m-20">
          <div className="image-container">
            <img src="/images/infosys-nyn-tagline-jpg.jpg" alt="Infosys Logo" className="w-auto" />
          </div>

          <div className="flex-1 items-center justify-center">
            <button className="bg-blue-500 text-white py-2 px-4 m-2 rounded hover:bg-blue-600"
              onClick={openLoginDialog}
            >
              Login
            </button>
            <button className="bg-blue-500 text-white py-2 px-4 m-2 rounded hover:bg-blue-600"
           
            >
              Register
            </button>
          </div>
        </div>  
        </>
        ) : (
        <Routes>
          <Route path='/employeeList' element={<EmployeeList />} />
          <Route path='/addEmployee' element={<AddEmployee />} />
        </Routes> )}
        <Footer />
        {showLoginDialog && <Login onClose={closeLoginDialog} setIsLoggedIn={setIsLoggedIn} />}
      </Router>
    </div>
  );
}

export default App;
