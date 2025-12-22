import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Button from '../../components/common/Button';

const AdminLogin = () => {
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Mock Authentication - Simple for demo purposes
        if (password === 'admin123') {
            localStorage.setItem('isAdmin', 'true');
            navigate('/admin/dashboard');
        } else {
            alert('Invalid Password');
        }
    };

    return (
        <>
            <Helmet>
                <title>Admin Login | PyrusMedia</title>
            </Helmet>
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="bg-[#111] p-8 rounded-2xl border border-gray-800 w-full max-w-md">
                    <h1 className="text-2xl font-bold text-white mb-6 text-center">Admin Access</h1>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <input
                                type="password"
                                placeholder="Enter Admin Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-black border border-gray-800 rounded-lg p-3 text-white focus:outline-none focus:border-[#bebd19]"
                            />
                        </div>
                        <Button type="submit" className="w-full justify-center">Login</Button>
                    </form>
                    <p className="text-gray-500 text-xs text-center mt-4">Hint: admin123</p>
                </div>
            </div>
        </>
    );
};

export default AdminLogin;
