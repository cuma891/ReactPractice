import React from 'react'
import '../output.css'
import { useNavigate } from "react-router-dom";

export default function Header({ isLoggedIn, onLogout }){
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        onLogout();
        navigate("/"); 
      };
    return (
        <div className='flex sticky top-0 h-28 w-full bg-slate-300'>
            <div className='justify-center items-center text-center w-full m-2'>
            <header className='text-black font-bold text-2xl'>
                Employee Management System <p className='font-extrabold text-blue-950 '>(EMS)</p>
            </header>
            </div>
            {isLoggedIn && (
            <div className='justify-end items-center text-center'>
            <button className="bg-red-500 text-white py-0 px-6 rounded hover:bg-red-600 m-5 h-10"onClick={handleLogout}>Logout</button>
            </div>
            )}
        </div>
    )
}