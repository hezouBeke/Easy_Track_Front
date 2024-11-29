import axios from 'axios';
const API_URL = 'http://localhost:7000/api/auth/';

// Fonction pour inscrire un utilisateur
const signup = (userData) => {
    return axios.post(API_URL + 'signup', userData);
}

// Fonction pour se connecter
const login = (email, password) => {
    return axios.post(API_URL + 'login', { email, password })
        .then(response => {
            if (response.data.token) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        });
}

// Fonction pour se déconnecter
const logout = () => {
    localStorage.removeItem('user');
}

// Fonction pour obtenir l'utilisateur courant
const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
}

// Fonction pour obtenir les utilisateurs par rôle
const getUsersByRole = (role) => {
    return axios.get(API_URL + 'users', { params: { role } });
}

// Fonction pour obtenir les en-têtes d'authentification
const authHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return { Authorization: 'Bearer ' + user.token };
    } else {
        return {};
    }
}

export default {
    signup,
    login,
    logout,
    getCurrentUser,
    authHeader,
    getUsersByRole
};
