import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaQrcode, FaCamera } from 'react-icons/fa'; // Importer des icônes

function RelayOptions() {
  const navigate = useNavigate();

  const handleScanQR = () => {
    navigate('/scan-qr'); // Redirection vers la page de scan
  };

  const handleShowQR = () => {
    navigate('/show-qr'); // Redirection vers la page d'affichage de QR
  };

  return (
    <div className="flex flex-col items-center mt-12">
      <div className="bg-white shadow-md rounded-lg p-6 w-11/12 md:w-2/3 lg:w-1/3">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Relaiement de Colis
        </h1>
        <p className="text-sm text-gray-600 text-center mb-6">
          Choisissez une option pour scanner ou afficher votre QR code afin de transférer un colis.
        </p>
        <div className="flex flex-col space-y-4">
          <button
            onClick={handleScanQR}
            className="flex items-center justify-center px-6 py-3 text-white bg-blue-500 rounded-lg shadow hover:bg-blue-600 transition duration-200"
          >
            <FaCamera className="mr-2" />
            Scanner un QR Code
          </button>
          <button
            onClick={handleShowQR}
            className="flex items-center justify-center px-6 py-3 text-white bg-green-500 rounded-lg shadow hover:bg-green-600 transition duration-200"
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
