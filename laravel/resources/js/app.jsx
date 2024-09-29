// import './bootstrap';
import '../css/app.css';
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import { AuthProvider } from './context/AuthContext';


const Home = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-blue-500">
            <h1 className="text-4xl font-bold text-white">Hello, React!</h1>
        </div>
    );
};

const router = createBrowserRouter([
    {
        // path: "/",
        // element: <Home/>,
        path: "/",
        element: <Register />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            },
        ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
    <React.StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </React.StrictMode>
);
