import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'

const Signup = () => {
    const [formData, setFormData] = useState({});
    const [error, setError] = useState(null);
    const [loading,setLoading]=useState(false);
    const navigate =useNavigate()

    const handleChange =(e)=>{
        setFormData({...formData,[e.target.id]: e.target.value})
      }



      const handleSubmit=async(e)=>{
        e.preventDefault();

        // console.log(formData)

        try {
            setLoading(true);
            const res =await fetch('/api/v1/auth/signup',{
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
            })
      
            const data = await res.json();
            // console.log(data);
            if (data.success === false) {
              setLoading(false);
              setError(data.message);
              return;
            }
            setLoading(false);
            setError(null);
            navigate('/signin');
          } catch (error) {
            setLoading(false);
            setError(error.message);
          }

      }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Create an Account</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              onChange={handleChange}

            />
          </div>
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
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
          >
          {loading ? 'Loading...' : 'Sign up'}
          </button>
        </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to={'/signin'}>
          <span className='text-blue-700'>Signin</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5 self-center'>{error}</p>}

      </div>

    
    </div>
  );
};

export default Signup;
