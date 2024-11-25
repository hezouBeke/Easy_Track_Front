import React from 'react';
import { QRCode } from 'antd'; // Importation du composant QRCode d'Ant Design
import { useNavigate } from 'react-router-dom';

function ShowQR() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/relay'); // Retour à la page précédente
  };

  const courierId = "COURSIER_123"; // À remplacer par une donnée réelle provenant du backend ou des props

  const qrValue = JSON.stringify({
    courierId: courierId,
    action: "relay_package",
  }); // Contenu du QR Code (ex. : ID, action)

  return (
    <div className="flex items-center justify-center min-h-screen font-thin bg-gray-100">
      {/* Bouton de retour en haut */}
      <button
        onClick={handleGoBack}
        className="absolute top-4 left-4 flex items-center px-3 py-2 text-black text-lg"
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
        Options de Scan Qr
      </button>

      {/* Contenu principal */}
      <div className="bg-white shadow-lg rounded-lg p-8 w-11/12 md:w-2/3 lg:w-1/3">
        {/* Titre et description */}
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-3xl font-thin text-gray-800">QR Code</h1>
          {/* Placeholder pour le nom et prénom */}
          <p className="text-sm text-gray-600 text-center mt-2 mb-4">
            Scannez ce QR Code pour transférer un colis. Assurez-vous que le code est bien visible.
          </p>
        </div>
        {/* QR Code */}
        <div className="flex justify-center items-center mb-6 p-6 border border-dashed border-gray-300 rounded-lg">
          <QRCode
            value={qrValue} // Contenu du QR Code
            size={256} // Taille du QR Code
            icon="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" // Icône personnalisée (modifiable ou supprimable)
            errorLevel="H" // Niveau de correction d'erreurs
          />
        </div>
        {/* Informations supplémentaires */}
        <p className="text-sm text-gray-600 text-center">
          Ce QR Code contient les informations nécessaires pour la procédure de relaiement de colis.
        </p>
      </div>
    </div>
  );
}

export default ShowQR;
