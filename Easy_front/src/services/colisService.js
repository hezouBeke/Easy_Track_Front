import axios from 'axios';

const API_URL = 'http://localhost:7000/api/coli/'; // Assurez-vous que l'URL se termine par un "/"

// Fonction pour générer un numéro unique pour chaque colis

export const createColis = async (colisData) => {
  try {
    const response = await axios.post(`${API_URL}colis`, colisData, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création du colis', error);
    throw error;
  }
};


// Fonction pour obtenir tous les colis
const getAllColis = () => {
  return axios.get(`${API_URL}colis`); // Ajout de "colis/" pour correspondre à la route backend
}

export default {
  getAllColis,
  createColis
};

