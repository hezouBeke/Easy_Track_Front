import React, { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import scanIcon from '../../assets/scan.png'; // Icône personnalisée
import { useNavigate } from 'react-router-dom';

function ScanQR() {
     
  const navigate = useNavigate();
const handleGoBack = () => {
    navigate('/relay'); // Retour au dashboard
    };

  const [scanner, setScanner] = useState(null);

  useEffect(() => {
    // Initialisation du scanner QR
    const newScanner = new Html5QrcodeScanner("reader", {
      fps: 10, // Images par seconde
      qrbox: 250, // Taille de la zone de détection
    });

    setScanner(newScanner);

    // Rendu du scanner avec un callback pour les QR Codes détectés
    newScanner.render((qrCodeMessage) => {
      console.log('QR Code scanned:', qrCodeMessage);
      alert('QR Code scanné avec succès : ' + qrCodeMessage);
    });

    // Fonction pour supprimer l'icône de téléphone
    const removePhoneIcon = () => {
      const phoneIcon = document.querySelector(".html5-qrcode-anchor");
      if (phoneIcon) {
        phoneIcon.style.display = "none"; // Cacher l'icône de téléphone
      }
    };

    // Appeler la fonction pour supprimer l'icône après l'initialisation
    setTimeout(() => {
      removePhoneIcon();
    }, 500);

    // Nettoyage du scanner lors du démontage du composant
    return () => {
      newScanner.clear(); // Arrête le scanner
    };
  }, []);

  return (
    <div className="flex items-center justify-center font-thin min-h-screen bg-gray-100">
         {/* Bouton de retour */}
      <button
        onClick={handleGoBack}
        className="absolute top-4 left-4 flex items-center px-3 py-2 text-black  text-lg"
      >
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/></svg>
        Options de Scan Qr
      </button>

      <div className="bg-white shadow-lg rounded-lg p-6 w-11/12 md:w-2/3 lg:w-1/3">
        <div className="flex flex-col items-center mb-6">
          {/* Icône personnalisée au-dessus du composant */}
          <img src={scanIcon} alt="Scan QR" className="w-16 h-16 mb-4" />
          <h1 className="text-2xl font-thin text-gray-800">Scanner un QR Code</h1>
          <p className="text-sm text-gray-600 text-center mt-2">
            Positionnez le QR Code dans la zone ci-dessous pour le scanner.
          </p>
        </div>
        {/* Conteneur pour le scanner */}
        <div
          id="reader"
          className="border-2 border-dashed border-gray-300 rounded-md"
          style={{ width: '100%', height: '400px' }}
        ></div>
      </div>
    </div>
  );
}

export default ScanQR;
