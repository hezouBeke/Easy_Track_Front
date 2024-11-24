import React, { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

function ScanQR() {
  const [scanner, setScanner] = useState(null);

  useEffect(() => {
    const newScanner = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: 250,
    });

    setScanner(newScanner);

    newScanner.render((qrCodeMessage) => {
      console.log('QR Code scanned:', qrCodeMessage);
      alert('QR Code scanné avec succès : ' + qrCodeMessage);
    });

    return () => {
      newScanner.clear();
    };
  }, []);

  return (
    <div className="flex flex-col items-center mt-8">
      <h1 className="text-2xl font-bold">Scanner un QR Code</h1>
      <div id="reader" style={{ width: '100%', height: '400px' }}></div>
    </div>
  );
}

export default ScanQR;
