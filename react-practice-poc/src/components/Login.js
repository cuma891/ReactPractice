import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from "@react-oauth/google"
import axios from 'axios';

export default function Login({onClose, setIsLoggedIn}){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        console.log('Username:', username);
        console.log('Password:', password);

        onClose();
        setIsLoggedIn(true);
        navigate('/employeeList'); 
      };

      const onSuccess = (response) => {
        console.log('Login Successful:', response.credential);
        handleGoogleLogin(response);
      };
    
      const onError = () => {
        console.error('Login Failed');
      };
  
      const handleGoogleLogin = async (res) => {
        try {
          console.log("res---",res);
          const tokenMap = JSON.stringify({'idToken' : res.credential});
          const response = await axios.post('http://localhost:8080/auth/google', tokenMap, {
            headers: {
              'Content-Type': 'application/json', // Ensure Content-Type is correct
            },
          });
          console.log(response);
          // setSuccess(response.data.body); 
          // login(response.data);
          // setError("");
          setTimeout(() => {
            //onLoginClose();
            onClose();
            setIsLoggedIn(true);
            navigate('/employeeList');
          }, 1000); 
    
        
        } catch (err) {
          alert(err.response?.data || 'Something went wrong');
         // setError(err.response?.data || 'Something went wrong');
        }
      };

    return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter your username"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter your password"
          />
        </div>
        <div className="flex justify-center items-center">
        <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mr-2"
            onClick={handleLogin}
          >
            Login
          </button>
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
        <div className="mt-3">
        <GoogleLogin
              onSuccess={onSuccess}
              onError={onError}
              size="large"
              text='continue_with'
              theme="filled_blue"
              locale="en"
              useOneTap="true"
              logo_alignment="left"
                >
            </GoogleLogin>
          </div>
      </div>
    </div>
  );
    
}