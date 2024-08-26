import axios from 'axios';

const API_URL = 'http://localhost:7000/api/coli';

export const createColis = async (colisData) => {
  try {
    const response = await axios.post(API_URL, colisData, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création du colis', error);
    throw error;
  }
};

const getColisById = (id) => {
  return axios.get(`${API_URL}${id}`);
}

// Fonction pour obtenir tous les colis
const getAllColis = () => {
  return axios.get(API_URL);
}

export default {
  getColisById,
  getAllColis,
  createColis
};