import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaQrcode, FaCamera } from 'react-icons/fa'; 
import interchangeImage from '../../assets/interchange.png';

function RelayOptions() {

  const navigate = useNavigate();
  const handleScanQR = () => {
    navigate('/enter-code'); 
  };



  const handleGoBack = () => {
    navigate('/dashboard/driver'); 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      {/* Bouton de retour */}
      <button
        onClick={handleGoBack}
        className="absolute top-4 left-4 flex items-center px-3 py-2 text-black  text-lg"
      >
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/></svg>
         relaiement de Colis
      </button>

      {/* Contenu principal */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        {/* Image */}
        <div className="flex justify-center mb-6">
          <img
            src={interchangeImage}
            alt="Interaction entre coursiers"
            className="w-16 h-16" // Taille ajustée pour mobile
          />
        </div>
        <h1 className="text-xl font-medium text-center text-gray-800 mb-4">
          Relaiement de Colis
        </h1>
        <p className="text-sm text-gray-600 text-center mb-6">
         Démarer le relaiment du colis 
        </p>
        <div className="flex flex-col space-y-4">
          <button
            onClick={handleScanQR}
            className="flex items-center justify-center px-4 py-3 text-white bg-blue-500 rounded-lg shadow-sm hover:bg-blue-600 transition duration-200 text-sm"
          >
            <FaCamera className="mr-2" />
           Entrer code colis
          </button>
     
        </div>
      </div>
    </div>
  );
}

export default RelayOptions;
