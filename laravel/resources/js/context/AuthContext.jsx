import React, { createContext, useContext, useState, useEffect } from 'react';
import AuthService from '../services/AuthService';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loggedUser = localStorage.getItem('user');
        if (loggedUser) {
            setUser(JSON.parse(loggedUser));
        }
    }, []);

    const logout = async () => {
        try {
            await AuthService.logout();
            setUser(null);
            localStorage.removeItem('user');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const value = {
        user,
        setUser,
        logout
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
