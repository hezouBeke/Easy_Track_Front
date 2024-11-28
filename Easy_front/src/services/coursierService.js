import axios from 'axios';

const API_URL = 'http://localhost:7000/api/coursiers/';

// Fonction pour obtenir tous les coursiers
const getAllCoursiers = () => {
    return axios.get(`${API_URL}coursier`); // URL corrigée
}

// Fonction pour obtenir un coursier par ID (si nécessaire)
const getCoursierById = (id) => {
    return axios.get(`${API_URL}coursier/${id}`);
}

// Fonction pour supprimer un coursier par ID (si nécessaire)
const deleteCoursierById = (id) => {
    return axios.delete(`${API_URL}coursier/${id}`);
}
const updateCoursierStatus = (id, status) => {
    return axios.patch(`${API_URL}coursier/${id}/status`, { status });
}

const getConnectedCoursier = () => {
    return axios.get(`${API_URL}coursier/me`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Assurez-vous que le token est stocké dans localStorage
        },
    });
};


export default {
    getAllCoursiers,
    getCoursierById,
    deleteCoursierById,
    updateCoursierStatus,
    getConnectedCoursier
   
};
