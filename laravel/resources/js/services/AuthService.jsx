import axios from 'axios';

const API_URL = 'http://localhost:8000';

const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

const register = async (userData) => {
    const response = await axios.post(`${API_URL}/users/register`, userData, {
        headers: {
            'X-CSRF-TOKEN': csrfToken
        }
    });
    
    return response.data;
};

const login = async (userData) => {
    const response = await axios.post(`${API_URL}/users/login`, userData);
    return response.data;
};

const logout = async () => {
    await axios.post(`${API_URL}/users/logout`, {}, {
        headers: {
            'X-CSRF-TOKEN': csrfToken
        }
    });
}

const AuthService = {
    register,
    login,
    logout
};

export default AuthService;
