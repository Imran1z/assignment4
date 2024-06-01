import React from 'react';
import { Link } from 'react-router-dom'; 
import { useDispatch, useSelector } from 'react-redux';


const Header = () => {
    const {currentUser,loading,error}= useSelector((state)=>state.user)



    

    return (
        <header className="bg-white shadow-lg py-4">
            <div className="max-w-6xl mx-auto flex justify-between items-center px-4">
                <div>
                    <Link to="/" className="text-xl font-bold text-gray-800">Home</Link>
                </div>
                <div className="flex space-x-4">
                    {currentUser ? (
                        <>
                            <Link to="/tasks" className="text-gray-800 hover:text-blue-500">Tasks</Link>
                            
                        </>
                    ) : (
                        <>
                            <Link to="/signup" className="text-gray-800 hover:text-blue-500">Sign Up</Link>
                            <Link to="/signin" className="text-gray-800 hover:text-blue-500">Sign In</Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
