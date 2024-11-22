import React, { useRef } from 'react';
import SignaturePad from 'react-signature-canvas';

function ConfirmationPage() {
  const signaturePadRef = useRef(null);

  // Fonction pour réinitialiser la signature
  const clearSignature = () => {
    signaturePadRef.current.clear();
  };

  // Fonction pour enregistrer la signature (en base64 par exemple)
  const saveSignature = () => {
    if (signaturePadRef.current.isEmpty()) {
      alert('Veuillez signer avant d\'enregistrer.');
    } else {
      const signatureData = signaturePadRef.current.toDataURL();
      console.log('Signature enregistrée:', signatureData);
      alert('Signature enregistrée avec succès.');
    }
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gray-800 text-white">
      <h2 className="text-xl mb-4">Veuillez signer pour confirmer la réception du colis</h2>
      <SignaturePad 
        ref={signaturePadRef}
        backgroundColor="rgba(255, 255, 255, 0.5)"
        penColor="black"
        canvasProps={{ className: 'border-2 border-gray-500 w-full h-48 md:h-72 rounded-md' }}
      />
      <div className="flex justify-center gap-4 mt-4">
        <button onClick={clearSignature} className="px-4 py-2 bg-red-500 text-white rounded">
          Réinitialiser
        </button>
        <button onClick={saveSignature} className="px-4 py-2 bg-green-500 text-white rounded">
          Enregistrer
        </button>
      </div>
    </div>
  );
}

export default ConfirmationPage;
