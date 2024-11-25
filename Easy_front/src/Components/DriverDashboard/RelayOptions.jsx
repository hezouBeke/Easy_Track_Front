import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaQrcode, FaCamera, FaArrowLeft } from 'react-icons/fa'; // Importer des icônes
import interchangeImage from '../../assets/interchange.png';

function RelayOptions() {
  const navigate = useNavigate();

  const handleScanQR = () => {
    navigate('/scan-qr'); // Redirection vers la page de scan
  };

  const handleShowQR = () => {
    navigate('/show-qr'); // Redirection vers la page d'affichage de QR
  };

  const handleGoBack = () => {
    navigate('/dashboard/driver'); // Retour au dashboard
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      {/* Bouton de retour */}
      <button
        onClick={handleGoBack}
        className="absolute top-4 left-4 flex items-center px-3 py-2 text-black  text-lg"
      >
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/></svg>
        Options de relaiement de Colis
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
          Choisissez une option pour scanner ou afficher votre QR code afin de transférer un colis.
        </p>
        <div className="flex flex-col space-y-4">
          <button
            onClick={handleScanQR}
            className="flex items-center justify-center px-4 py-3 text-white bg-blue-500 rounded-lg shadow-sm hover:bg-blue-600 transition duration-200 text-sm"
          >
            <FaCamera className="mr-2" />
            Scanner un QR Code
          </button>
          <button
            onClick={handleShowQR}
            className="flex items-center justify-center px-4 py-3 text-white bg-green-500 rounded-lg shadow-sm hover:bg-green-600 transition duration-200 text-sm"
          >
            <FaQrcode className="mr-2" />
            Afficher mon QR Code
          </button>
        </div>
      </div>
    </div>
  );
}

export default RelayOptions;
