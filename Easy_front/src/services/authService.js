import axios from 'axios';
const API_URL = 'http://localhost:7000/api/auth/';

const signup = (userData) => {
    return axios.post(API_URL + 'signup', userData);
};

const login = (email, password) => {
    return axios.post(API_URL + 'login', { email, password })
        .then(response => {
            if (response.data.token) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem('user');
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

const authHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        return { Authorization: 'Bearer ' + user.token };
    } else {
        return {};
    }
};

export default {
    signup,
    login,
    logout,
    getCurrentUser,
    authHeader,
};
