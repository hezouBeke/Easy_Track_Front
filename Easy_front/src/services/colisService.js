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
export const getColis = async () => {
    try {
      const response = await axios.get(API_URL, { withCredentials: true });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des colis', error);
      throw error;
    }
  };

  export default {
    createColis,
    getColis
  }
  