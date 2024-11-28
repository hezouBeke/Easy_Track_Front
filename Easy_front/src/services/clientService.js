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
const getConnectedClient = () => {
    const token = localStorage.getItem('token');  // Récupère le token de localStorage

    if (!token) {
        console.log("Token JWT manquant");
        return Promise.reject('Token manquant'); // Si le token est absent, on retourne une erreur
    }

    // Effectue la requête axios avec le token dans l'entête Authorization
    return axios.get(`${API_URL}client/me`, {
        headers: {
            Authorization: `Bearer ${token}`,  // Passe le token dans les entêtes
        },
    });
};


export default {
    getAllClients,
    getClientById,
    deleteClientById,
    updateClientStatus,
    getConnectedClient

};
