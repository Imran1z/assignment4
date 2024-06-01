import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { signinStart,signinSuccess,signinFailure } from '../redux/user/userSlice';

const Signin = () => {
    const [formData, setFormData] = useState({});
 const {loading,error}=useSelector((state)=>state.user)
  const navigate =useNavigate()
  const dispatch =useDispatch()


    const handleChange =(e)=>{
        setFormData({...formData,[e.target.id]: e.target.value})
      }

      const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log(formData)
    
        try {
          dispatch(signinStart());
          const res =await fetch('/api/v1/auth/signin',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          })
    
          const data = await res.json();
          console.log(data);
          if (data.success === false) {
            dispatch(signinFailure(data.message))
            return;
          }
          dispatch(signinSuccess(data))
          navigate('/tasks');
        } catch (error) {
          dispatch(signinFailure(error.message))
    
        }
    
        
      }

      

      
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              onChange={handleChange}

            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              onChange={handleChange}

            />
          </div>
          <button
          disabled={loading}
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
          >
          {loading ? 'Loading...' : 'Sign In'}
          </button>
        </form>
        <div className='flex gap-2 mt-5'>
        <p>Don't have an account?</p>
        <Link to={'/signup'}>
          <span className='text-blue-700'>Signup</span>
        </Link>
      </div>
      </div>
      {error && <p className='text-red-500 mt-5 self-center'>{error}</p>}

    </div>
  );
};

export default Signin;
