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
    const user = JSON.parse(localStorage.getItem('user'));  // Récupère l'objet 'user'
    const token = user ? user.token : null;  // Extrait le token de l'objet 'user'

    if (!token) {
        console.log("Token JWT manquant");
        return Promise.reject('Token manquant');  // Si le token est absent, retourne une erreur
    }

    // Effectue la requête axios avec le token dans l'entête Authorization
    return axios.get(`${API_URL}coursier/me`, {
        headers: {
            Authorization: `Bearer ${token}`,  // Passe le token dans les entêtes
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
