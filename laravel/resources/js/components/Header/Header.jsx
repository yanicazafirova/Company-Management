// resources/js/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-blue-600 p-4">
            <h1 className="text-white text-2xl">Company Management</h1>
            <nav>
                <ul className="flex space-x-4">
                    <li>
                        <Link className="text-white hover:underline" to="/">Home</Link>
                    </li>
                    <li>
                        <Link className="text-white hover:underline" to="/companies">Companies</Link>
                    </li>
                    <li>
                        <Link className="text-white hover:underline" to="/employes">Employes</Link>
                    </li>
                    <li>
                        <Link className="text-white hover:underline" to="/tasks">Tasks</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
