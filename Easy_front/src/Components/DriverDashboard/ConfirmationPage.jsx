import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignaturePad from 'react-signature-canvas';

function ConfirmationPage() {
  const signaturePadRef = useRef(null);
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const [errorMessageVisible, setErrorMessageVisible] = useState(false);
  const navigate = useNavigate();

  const clearSignature = () => {
    signaturePadRef.current.clear();
  };

  const saveSignature = () => {
    if (signaturePadRef.current.isEmpty()) {
      setErrorMessageVisible(true);
      setTimeout(() => setErrorMessageVisible(false), 3000); // Cacher après 3 secondes
    } else {
      const signatureData = signaturePadRef.current.toDataURL();
      console.log('Signature enregistrée:', signatureData);
      setSuccessMessageVisible(true);
      setTimeout(() => {
        setSuccessMessageVisible(false);
        navigate('/dashboard/driver'); // Rediriger vers le dashboard du coursier
      }, 1000); // Attendre 3 secondes avant la redirection
    }
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gray-800 text-white">
      <h2 className="text-xl mb-4">Veuillez signer pour confirmer la réception du colis</h2>

      {/* Zone de signature */}
      <SignaturePad
        ref={signaturePadRef}
        backgroundColor="rgba(255, 255, 255, 0.5)"
        penColor="black"
        canvasProps={{
          className: 'border-2 border-gray-500 w-full h-48 md:h-72 rounded-md',
        }}
      />

      {/* Boutons */}
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={clearSignature}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Réinitialiser
        </button>
        <button
          onClick={saveSignature}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Enregistrer
        </button>
      </div>

      {/* Alerte de succès */}
      {successMessageVisible && (
        <div className="fixed top-10 right-10 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg shadow-lg">
          <div className="flex items-center">
            <svg
              aria-hidden="true"
              className="w-6 h-6 mr-2 text-green-700"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
            Signature enregistrée avec succès.
          </div>
        </div>
      )}

      {/* Alerte d'erreur */}
      {errorMessageVisible && (
        <div className="fixed top-10 right-10 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg shadow-lg">
          <div className="flex items-center">
            <svg
              aria-hidden="true"
              className="w-6 h-6 mr-2 text-red-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.675-1.36 3.44 0l3.25 5.778A1.5 1.5 0 0114.514 11H5.486a1.5 1.5 0 01-1.434-2.123l3.25-5.778zM11 14a1 1 0 10-2 0 1 1 0 002 0z"
                clipRule="evenodd"
              ></path>
            </svg>
            Veuillez signer avant d'enregistrer.
          </div>
        </div>
      )}
    </div>
  );
}

export default ConfirmationPage;
