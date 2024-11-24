import React from 'react';
import { QRCode } from 'react-qr-code';

function ShowQR() {
  const courierId = "COURSIER_123"; // À remplacer par une donnée réelle provenant du backend ou des props

  const qrValue = JSON.stringify({
    courierId: courierId,
    action: "relay_package",
  }); // Contenu du QR Code (ex. : ID, action)

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-11/12 md:w-2/3 lg:w-1/3">
        <div className="flex flex-col items-center mb-6">
       
          <h1 className="text-3xl font-bold text-gray-800"> QR Code</h1> 
          {/* a ce niveau je dois recuperer le non et prenom du coursier   */}
          <p className="text-sm text-gray-600 text-center mt-2 mb-4">
            Scannez ce QR Code pour transférer un colis. Assurez-vous que le code est bien visible.
          </p>
        </div>
        <div className="flex justify-center items-center mb-6 p-6 border border-dashed border-gray-300 rounded-lg">
          <QRCode value={qrValue} size={256} />
        </div>
        <p className="text-sm text-gray-600 text-center">
          Ce QR Code contient les informations nécessaires pour la procédure de relaiement de colis.
        </p>
      </div>
    </div>
  );
}

export default ShowQR;
