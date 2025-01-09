import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import EmployeeList from './components/EmployeeMgmt.jsx'
import Login from './components/Login.js'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import './App.css';


function App() {

  const [showLoginDialog, setShowLoginDialog] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(
    () => JSON.parse(localStorage.getItem('isLoggedIn')) || false
  );

  useEffect(() => {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  const openLoginDialog = () => {
    setShowLoginDialog(true);
  };

  const closeLoginDialog = () => {
    setShowLoginDialog(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="App min-h-screen">   
    <Router>
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
     <Routes>
     <Route
      path="/"
      element={
        isLoggedIn ? (
          <Navigate to="/employeeList" replace />
        ) : (
              <>
                <div className="flex items-center justify-between m-20">
                  <div className="image-container">
                    <img src="/images/infosys-nyn-tagline-jpg.jpg" alt="Infosys Logo" className="w-auto" />
                  </div>

                  <div className="flex-1 items-center justify-center">
                    <button
                      className="bg-blue-500 text-white py-2 px-4 m-2 rounded hover:bg-blue-600"
                      onClick={openLoginDialog}
                    >
                      Login
                    </button>
                    <button className="bg-blue-500 text-white py-2 px-4 m-2 rounded hover:bg-blue-600">
                      Register
                    </button>
                  </div>
                </div>
              </>
            )
          }
        />
      
  
          <Route path='/employeeList' element={isLoggedIn ? <EmployeeList /> : <Navigate to="/" replace />} />
        </Routes>
        <Footer />
        {showLoginDialog && <Login onClose={closeLoginDialog} setIsLoggedIn={setIsLoggedIn} />}
      </Router>
    </div>
  );
}

export default App;
