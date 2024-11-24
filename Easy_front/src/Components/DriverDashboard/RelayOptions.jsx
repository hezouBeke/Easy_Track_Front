import React from 'react';
import { useNavigate } from 'react-router-dom';

function RelayOptions() {
  const navigate = useNavigate();

  const handleScanQR = () => {
    navigate('/scan-qr'); // Redirection vers la page de scan
  };

  const handleShowQR = () => {
    navigate('/show-qr'); // Redirection vers la page d'affichage de QR
  };

  return (
    <div className="flex flex-col items-center space-y-4 mt-8">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Relaiement de colis</h1>
      <button
        onClick={handleScanQR}
        className="px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        Scanner un QR Code
      </button>
      <button
        onClick={handleShowQR}
        className="px-6 py-2 text-white bg-green-500 rounded hover:bg-green-600"
      >
        Afficher mon QR Code
      </button>
    </div>
  );
}

export default RelayOptions;