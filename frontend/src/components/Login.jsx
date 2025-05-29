import React, { useState } from 'react';
import { loginUser } from '../api/user.api';
import { Link, useNavigate } from '@tanstack/react-router';
import { useAuth } from '../context/AuthContext';

const Login = ({ setState }) => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('rajdey@gmail.com');
    const [password, setPassword] = useState('123');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const data = await loginUser(password, email);
            console.log('Login successful:', data);
            login(data.user);

            // Assuming login function sets user in context
            navigate({ to: "/dashboard" })

        } catch (error) {
            console.error('Login failed:', error);

        }
    };

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
                <p className='text-center translate-y-48 text-orange-900 text-2xl'>Login to CUSTOMISE your links!!</p>
                <div className="flex items-center justify-center min-h-screen">
                    <div className="w-full max-w-sm h-[40vh] p-6 bg-[#68513f] border-2 border-gray-800 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-6 text-center text-yellow-50">Login</h2>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Username"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 bg-slate-200 border rounded-md focus:outline-none"
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border bg-slate-200 rounded-md focus:outline-none "
                                required
                            />
                            <button
                                type="submit"
                                className="bg-gray-800 w-1/3 translate-x-28 text-white py-2 rounded-md hover:bg-gray-700 transition"
                            >
                                Login
                            </button>
                        </form>
                        <p className="mt-6 text-center text-gray-50">
                            Don't have an account? <span className="text-blue-400 cursor-pointer" onClick={() => setState(false)}>Register</span></p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Login;
