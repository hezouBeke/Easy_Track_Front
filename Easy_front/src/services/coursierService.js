import axios from 'axios';

const API_URL = 'http://localhost:7000/api/coursiers/';

// Fonction pour obtenir tous les coursiers
const getAllCoursiers = () => {
    return axios.get(API_URL);
}

// Fonction pour obtenir un coursier par ID (si nécessaire)
const getCoursierById = (id) => {
    return axios.get(`${API_URL}${id}`);
}

// Fonction pour supprimer un coursier par ID (si nécessaire)
const deleteCoursierById = (id) => {
    return axios.delete(`${API_URL}${id}`);
}

// Fonction pour désactiver un coursier par ID (si nécessaire)
const deactivateCoursierById = (id) => {
    return axios.put(`${API_URL}${id}/deactivate`);
}

export default {
    getAllCoursiers,
    getCoursierById,
    deleteCoursierById,
    deactivateCoursierById,
};
