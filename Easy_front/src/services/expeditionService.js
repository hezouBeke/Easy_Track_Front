import axios from 'axios';

const API_URL = 'http://localhost:7000/api/expeditions/';

// Fonction pour créer une expédition
const createExpedition = (expeditionData) => {
    return axios.post(API_URL, expeditionData);
};

// Fonction pour obtenir toutes les expéditions
const getAllExpeditions = () => {
    return axios.get(API_URL);
};

// Fonction pour obtenir une expédition par ID
const getExpeditionById = (id) => {
    return axios.get(`${API_URL}${id}`);
};

// Fonction pour supprimer une expédition par ID
const deleteExpedition = (id) => {
    return axios.delete(`${API_URL}${id}`);
};

// Fonction pour obtenir l'historique d'une expédition
const getExpeditionHistory = (id) => {
    return axios.get(`${API_URL}${id}/history`);
};

// Fonction pour supprimer une expédition et son historique
const deleteExpeditionHistory = (id) => {
    return axios.delete(`${API_URL}${id}/history`);
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

export default {
    createExpedition,
    getAllExpeditions,
    getExpeditionById,
    deleteExpedition,
    getExpeditionHistory,
    deleteExpeditionHistory,
    authHeader
};