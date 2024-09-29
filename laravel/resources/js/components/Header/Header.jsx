import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AuthService from '../../services/AuthService';

const Header = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <header className="bg-blue-600 p-4">
            <h1 className="text-white text-2xl">Company Management</h1>
            <nav>
                <ul className="flex space-x-4">
                    <li>
                        <Link className="text-white hover:underline" to="/">Home</Link>
                    </li>
                    {user ? (
                        <>
                            <li>
                                <Link className="text-white hover:underline" to="/companies">Companies</Link>
                            </li>
                            <li>
                                <Link className="text-white hover:underline" to="/employees">Employees</Link>
                            </li>
                            <li>
                                <Link className="text-white hover:underline" to="/tasks">Tasks</Link>
                            </li>
                            <button className="text-white hover:underline" onClick={logout}>Logout</button>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link className="text-white hover:underline" to="/login">Login</Link>
                            </li>
                            <li>
                                <Link className="text-white hover:underline" to="/register">Register</Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
