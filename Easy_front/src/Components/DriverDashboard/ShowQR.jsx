import React from 'react';
import { QRCode } from 'react-qr-code';

function ShowQR() {
  const courierId = "COURSIER_123"; // À remplacer par une donnée réelle provenant du backend ou des props

  const qrValue = JSON.stringify({
    courierId: courierId,
    action: "relay_package",
  }); // Contenu du QR Code (ex. : ID, action)

  return (
    <div className="flex flex-col items-center mt-8">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Mon QR Code</h1>
      <div className="mt-4 p-4 border rounded shadow bg-white">
        <QRCode value={qrValue} size={200} />
      </div>
      <p className="text-sm text-gray-600 mt-4">
        Scannez ce QR Code pour transférer un colis.
      </p>
    </div>
  );
}

export default ShowQR;
