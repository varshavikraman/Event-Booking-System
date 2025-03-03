import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/IMAGE/logo1.jpeg'

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState('User');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Name: name,
          Email: email,
          PhoneNo: phone,
          Password: password,
          UserRole: userRole,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.msg || 'Signup failed');
      }

      const data = await response.json();
      console.log("Signup successful:", data);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Signup failed: Please try again!');
    }
  };

  return (
    <div className="bg-red-50 min-h-screen flex flex-col">
      <div className="flex-grow flex flex-col items-center justify-center my-10">
        <img src={logo} alt="logo" className="w-16 h-16 sm:w-20 sm:h-20 mb-6" />
        <div className="w-11/12 sm:w-96 bg-white rounded-2xl shadow-lg shadow-[#981D26] p-6">
          <h2 className="text-[#981D26] text-2xl sm:text-3xl font-medium text-center mb-6">Create an Account</h2>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="text-[#981D26]">Name:</label><br />
              <input
                type="text"
                id="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2"
              />
            </div>

            <div className="mb-4">
              <label className="text-[#981D26]">Email:</label><br />
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2"
              />
            </div>

            <div className="mb-4">
              <label className="text-[#981D26]">Phone No.:</label><br />
              <input
                type="tel"
                id="phone"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2"
              />
            </div>

            <div className="mb-4">
              <label className="text-[#981D26]">Password:</label><br />
              <input
                type="password"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2"
              />
            </div>

            <div className="mb-4">
              <label className="text-[#981D26]">Role</label>
              <select
                value={userRole}
                onChange={(e) => setUserRole(e.target.value)}
                className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2"
              >
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>
            </div>

            <div className="mb-4">
              <button
                type="submit"
                className="w-full sm:w-auto bg-[#500E10] text-[#F59B9E] font-medium py-2 px-4 rounded-lg hover:bg-[#977073] hover:text-white"
              >
                Sign Up
              </button>
            </div>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-700">
              Already have an account?{' '}
              <Link to="/signin" className="text-[#981D26] font-medium hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
