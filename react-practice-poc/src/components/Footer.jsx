import React from 'react'
import '../output.css'

export default function Footer() {
    return (
        <div className='fixed flex  items-center bottom-0 h-28 w-full text-center bg-slate-300'>
            <footer className='flex mx-5 flex-row w-full'>
                <div className='w-1/3 mt-2 text-left'>
                        Contact Us:<br/>
                        <div className="ml-24">Phone No: 1234567890<br/>
                        Mail: infy@careers.infosys.com</div>
                </div>
                <div className='w-1/3 mt-2'>
                    <address>
                        <span>Bengaluru</span><br />
                        <span>Plot No. 44/97 A, 3rd Cross</span><br />
                        <span>Electronic City, Hosur Road</span><br />
                        <span>India</span>
                    </address>
                </div>
                <div className='w-1/3 bottom-0 mt-20'>
                    Copyright © 2025 Infosys Limited
                </div>
            </footer>
        </div>
    )
}