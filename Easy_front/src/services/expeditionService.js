import axios from 'axios';

const API_URL = 'http://localhost:7000/api/expeditions/';

// Fonction pour créer une expédition
const createExpedition = (expeditionData) => {
    return axios.post(`${API_URL}expedition`, expeditionData); // Ajouter "expedition"
};


// Fonction pour obtenir toutes les expéditions
const getAllExpeditions = () => {
    return axios.get(`${API_URL}expedition`);
};

// Fonction pour obtenir les détails d'une expédition par ID
const getExpeditionById = (id) => {
    return axios.get(`${API_URL}expeditions/${id}`);
};


// Fonction pour obtenir l'historique d'une expédition
const getExpeditionHistory = (id) => {
    return axios.get(`${API_URL}expeditions/${id}/history`);
};


// Fonction pour obtenir les en-têtes d'authentification
const authHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return { Authorization: 'Bearer ' + user.token };
    } else {
        return {};
    }
};

// Fonction pour obtenir les colis d'une expédition
const getColisByExpedition = (expeditionCode) => {
    return axios.get(`${API_URL}${expeditionCode}/colis`);
};

// Fonction pour obtenir les courses d'un colis
const getCoursesByColis = (colisId) => {
    return axios.get(`http://localhost:7000/api/colis/${colisId}/courses`);
};

export default {
    createExpedition,
    getAllExpeditions,
    getExpeditionById,
    getExpeditionHistory,
    authHeader,
    getColisByExpedition,
    getCoursesByColis,
};
