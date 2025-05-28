import { Link, useNavigate } from '@tanstack/react-router';
import React, { useState } from 'react'
import { registerUser } from '../api/user.api';
import { useAuth } from '../context/AuthContext';


function Register({ setState }) {
  const { login } = useAuth();

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  function handleLogin(e) {
    try {
      e.preventDefault();
      const data = registerUser(name, password, email);
      login(data.user)
      navigate({ to: "/dashboard" })
    } catch (error) {
      console.error('Login failed:', error);
      // Handle error (e.g., show a notification)

    }
  }

  return (
    <div>
      <nav>
        <ul className="flex justify-evenly items-center bg-[#634530] text-white p-5">
          <Link to='/'><li>HOME</li></Link>
          <Link to='/auth'>
            <li>LOGIN</li>
          </Link>
        </ul>
      </nav>
      <div className='bg-[#e9ddd4]' >
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-full max-w-sm h-[45vh] p-6 bg-[#68513f] border-2 border-zinc-800 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-yellow-50">Register</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border bg-slate-200 rounded-md focus:outline-none"
                required
              />
              <input
                type="text"
                placeholder="Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border bg-slate-200 rounded-md focus:outline-none"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border bg-slate-200 rounded-md focus:outline-none"
                required
              />
              <button
                type="submit"
                className="bg-gray-800 w-1/3 translate-x-28 text-white py-2 rounded-md hover:bg-gray-700 transition"
              >
                Register
              </button>
            </form>
            <p className="mt-4 text-center text-gray-50">
              Already have an account? <span className="text-blue-400 cursor-pointer" onClick={() => setState(true)}>Login</span></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register