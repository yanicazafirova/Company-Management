// import './bootstrap';
import '../css/app.css';
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";


const Home = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-blue-500">
            <h1 className="text-4xl font-bold text-white">Hello, React!</h1>
        </div>
    );
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
    },
]);

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
