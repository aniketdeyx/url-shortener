import { Link, useNavigate } from '@tanstack/react-router';
import React, { useState } from 'react';
import { registerUser } from '../api/user.api';
import { useAuth } from '../context/AuthContext';

function Register({ setState }) {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await registerUser(name, password, email);
      login(data.user);
      navigate({ to: "/dashboard" });
    } catch (error) {
      console.error('Register failed:', error);
      setError(error?.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='max-h-screen'>
      <nav>
        <ul className="flex justify-evenly items-center bg-[#634530] text-white p-5">
          <Link to='/'><li>HOME</li></Link>
          <Link to='/auth'><li>LOGIN</li></Link>
        </ul>
      </nav>
      <div className='bg-[#e9ddd4] p-6'>
        <div className="flex lg:items-center translate-y-24 lg:translate-y-1 lg:justify-center min-h-screen">
          <div className="w-full max-w-sm h-[50vh] p-6 bg-[#68513f] border-2 border-zinc-800 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center text-yellow-50">Register</h2>

            {error && <p className="text-red-300 text-sm text-center mb-2">{error}</p>}

            <form onSubmit={handleRegister} className="space-y-4">
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
                placeholder="Email"
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
                disabled={loading}
                className={`bg-gray-800 w-1/3 mx-auto block text-white py-2 rounded-md transition ${
                  loading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-700"
                }`}
              >
                {loading ? 'Registering...' : 'Register'}
              </button>
            </form>

            <p className="mt-4 text-center text-gray-50">
              Already have an account?{' '}
              <span className="text-blue-400 cursor-pointer" onClick={() => setState(true)}>
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
