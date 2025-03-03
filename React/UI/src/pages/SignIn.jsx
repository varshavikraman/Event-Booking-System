import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/IMAGE/logo1.jpeg';

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/signin', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          Email: email,
          Password: password, }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.msg || 'Sign in failed');
      }

      const data = await response.json();
      console.log("Sign-in successful:", data);
      if (data.userRole === 'Admin') {
        navigate('/dashboard'); // Then navigate to dashboard
        navigate('/home'); // Navigate to home first
        
      } else {
        navigate('/home'); // If user, just navigate to home
      }
    } catch (err) {
      setError(err.message || 'Sign in failed: Please try again!');
    }
  };

  return (
    <div className="bg-red-50 min-h-screen flex flex-col">
      <div className="flex-grow flex flex-col items-center justify-center my-10">
        <img src={logo} alt="logo" className="w-16 h-16 sm:w-20 sm:h-20 mb-6" />
        <div className="w-96 max-w-md bg-white mx-auto my-10 p-6 rounded-2xl shadow-lg shadow-[#981D26]">
          <h2 className="text-[#981D26] text-2xl font-medium text-center">Sign In</h2>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="mt-6 mx-10">
              <label htmlFor="email" className="text-sm font-medium text-[#981D26]">Email</label>
              <input 
                type="email" 
                id="email" 
                required 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-60 border border-gray-300 rounded-md p-2 shadow-sm"
              />
            </div>

            <div className="mt-4 mx-10">
              <label htmlFor="password" className="text-sm font-medium text-[#981D26]">Password</label>
              <input 
                type="password" 
                id="password" 
                required 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-60 border border-gray-300 rounded-md p-2 shadow-sm"
              />
            </div>

            <div className="mt-6 flex items-center justify-between mx-10">
              <button type="submit" className="w-24 h-10 bg-[#500E10] text-[#F59B9E] font-medium rounded-lg hover:bg-[#977073] hover:text-white">
                Sign In
              </button>
              <Link to="/forgot-password" className="text-sm text-[#981D26] hover:underline">Forgot Password?</Link>
            </div>
          </form>

          <p className="mt-6 text-center text-sm">
            Don't have an account? 
            <Link to="/signup" className="text-[#981D26] font-medium hover:underline"> Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
