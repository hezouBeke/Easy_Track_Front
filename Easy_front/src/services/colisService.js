import axios from 'axios';

const API_URL = 'http://localhost:7000/api/coli';

// Fonction pour générer un numéro unique pour chaque colis
const generateUniqueNumber = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let number = '';
  for (let i = 0; i < 8; i++) {
    number += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return number;
};

export const createColis = async (colisData) => {
  try {
    // Ajout du numéro unique au colis
    colisData.numero_colis = generateUniqueNumber();

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
