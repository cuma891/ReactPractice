import React from 'react'
import '../output.css'

export default function Header(){
    return (
        <div className='flex justify-center items-center sticky top-0 h-28 w-full text-center bg-slate-300'>
            <header className='text-black font-bold text-2xl'>
                Employee Management System <p className='font-extrabold text-blue-950 '>(EMS)</p>
            </header>
        </div>
    )
}