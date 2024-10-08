// import './bootstrap';
import '../css/app.css';
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Companies from './components/Company/Companies';
import Employees from './components/Employee/Employees';
import Tasks from './components/Task/Tasks';

const AppLayout = () => (
    <div id="app-main">
        <Header />
            <Outlet />
        <Footer />
    </div>
);

const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />, 
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
            {
                path: "companies",
                element: <Companies />
            },
            {
                path: "employees",
                element: <Employees />
            },
            {
                path: "tasks",
                element: <Tasks />
            }
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
