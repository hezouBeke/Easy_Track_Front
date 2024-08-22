import axios from 'axios';

const API_URL = 'http://localhost:7000/api/clients/';

// Fonction pour obtenir tous les clients
const getAllClients = () => {
    return axios.get(API_URL);
}

// Fonction pour obtenir un client par ID (si nécessaire)
const getClientById = (id) => {
    return axios.get(`${API_URL}${id}`);
}

// Fonction pour supprimer un client par ID (si nécessaire)
const deleteClientById = (id) => {
    return axios.delete(`${API_URL}${id}`);
}

// Fonction pour désactiver un client par ID (si nécessaire)
const deactivateClientById = (id) => {
    return axios.put(`${API_URL}${id}/deactivate`);
}

export default {
    getAllClients,
    getClientById,
    deleteClientById,
    deactivateClientById,
};
