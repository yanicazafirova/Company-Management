import React from 'react';
import logo from '../../images/logo.jpg';

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white">
            <img src={logo} alt="Company Logo" className="mb-8 w-32 h-auto" />
            <h1 className="text-5xl font-bold text-blue-600 mb-4">Welcome to Company Management!</h1>
            <p className="text-lg text-blue-600 mb-6 text-center max-w-md">
                Manage your companies, employees, and tasks efficiently with our application.
            </p>
        </div>
    );
};

export default Home;
