import React from 'react';
import { useNavigate } from 'react-router-dom';

function NotFound() {
    const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white m-auto">
        <div className='flex flex-col border-4 border-gray-900 rounded-md p-8 gap-4'>
            <h1 className="text-4xl">404 Error: Page Not Found</h1>
            <button className='text-center text-xl font-bold bg-accent text-white px-8 py-4 rounded-md hover:bg-secondary hover:text-background' onClick={() => navigate("/")}>
                Go to My Profile
            </button>
        </div>
    </div>
  );
}

export default NotFound;
