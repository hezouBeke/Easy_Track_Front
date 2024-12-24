import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import pinCodeImage from '../../assets/pin-code_5312271.png'; // Import de l'image
import { message, Spin } from "antd";
import axios from "axios";

function Entercolis() {
  const navigate = useNavigate();
  const [colisNumber, setColisNumber] = useState('');
  const [coursier_id, setCoursier_id] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGoBack = () => {
    navigate('/relay'); // Retour au dashboard
  };

  const handleValidation = async (e) => {
    e.preventDefault();
    const isRelay = true
    try {
      const response = await axios.put(`http://localhost:7000/api/courses/course/${colisNumber}`, { coursier_id, isRelay });
      console.log('Item updated:', response.data);
      message.success(response.data.message);
    } catch (error) {
      console.log('Item error:', error);
      message.error("Une erreur est survenue lors de la mise à jour.");
    }

    setIsLoading(true);
    setTimeout(() => {
      navigate('/relay');
    }, 2000); // Simuler un délai pour le chargement
  };

  return (
    <div className="flex items-center justify-center font-thin min-h-screen bg-gray-100">
      {/* Bouton de retour */}
      <button
        onClick={handleGoBack}
        className="absolute top-4 left-4 flex items-center px-3 py-2 text-black text-lg hover:text-blue-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#000000"
        >
          <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
        </svg>
        Retour
      </button>

      <div className="bg-white shadow-lg rounded-lg p-8 w-11/12 md:w-2/3 lg:w-1/3">
        <div className="flex flex-col items-center mb-6">
          <img src={pinCodeImage} alt="Pin Code" className="w-16 h-16 mb-4" />
          <h1 className="text-2xl font-medium text-gray-800 mb-4">Saisir les informations </h1>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center w-full h-56">
            <Spin size="large" />
          </div>
        ) : (
          <>
            {/* Champ pour le numéro du colis */}
            <div className="mb-6">
              <label htmlFor="colis_number" className="block text-sm font-medium text-gray-700 mb-2">
                Entrer le code du colis
              </label>
              <input
                type="text"
                id="colis_number"
                value={colisNumber}
                onChange={(e) => setColisNumber(e.target.value)}
                className="block px-4 pb-3 pt-2 w-full text-base text-gray-900 bg-transparent rounded-lg border appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder=""
              />
            </div>

            {/* Champ pour l'identifiant */}
            <div className="mb-6">
              <label htmlFor="user_id" className="block text-sm font-medium text-gray-700 mb-2">
                Entrer votre identifiant
              </label>
              <input
                type="text"
                id="user_id"
                value={coursier_id}
                onChange={(e) => setCoursier_id(e.target.value)}
                className="block px-4 pb-3 pt-2 w-full text-base text-gray-900 bg-transparent rounded-lg border appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder=""
              />
            </div>

            {/* Bouton de validation */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleValidation}
                className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Valider
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Entercolis;
