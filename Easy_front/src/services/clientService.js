import axios from 'axios';

const API_URL = 'http://localhost:7000/api/clients/';

// Fonction pour obtenir tous les clients
const getAllClients = () => {
    return axios.get(`${API_URL}client`); // URL corrigée
}

// Fonction pour obtenir un client par ID (si nécessaire)
const getClientById = (id) => {
    return axios.get(`${API_URL}client/${id}`);
}

// Fonction pour supprimer un client par ID (si nécessaire)
const deleteClientById = (id) => {
    return axios.delete(`${API_URL}client/${id}`);
}

const updateClientStatus = (id, status) => {
    return axios.patch(`${API_URL}client/${id}/status`, { status });
};

export default {
    getAllClients,
    getClientById,
    deleteClientById,
    updateClientStatus
};
