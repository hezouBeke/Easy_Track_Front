import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignaturePad from 'react-signature-canvas';
import signatureIcon from '../../assets/electronic-signature.png'; // Icône personnalisée
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
      setTimeout(() => setErrorMessageVisible(false), 30.00); // Cacher après 3 secondes
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
    <div className="flex flex-col items-center justify-center font-thin min-h-screen bg-white text-black p-4">
       {/* Icône au-dessus de la zone de signature */}
     <div className="mb-6">
        <img src={signatureIcon} alt="Icône signature" className="w-16 h-16 mx-auto" />
      </div>
      <h2 className="text-xl mb-4 text-center">Veuillez signer pour confirmer la réception du colis</h2>

    
      {/* Zone de signature avec bordure fine */}
      <div className="w-full max-w-md mb-6 p-1 border-2 border-gray-500 rounded-md bg-white">
        <SignaturePad
          ref={signaturePadRef}
          backgroundColor="rgba(200, 200, 200, 1)" // Gris clair
          penColor="black"
          canvasProps={{
            className: 'w-full h-80 md:h-100', // Agrandissement de la zone de signature
          }}
        />
      </div>
{/* Boutons */}
<div className="flex justify-center gap-4 mt-4">
  <button
    onClick={clearSignature}
    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center gap-2"
  >
    <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#e8eaed">
      <path d="M480-354v-75.33q0-21 14.5-35.5t35.5-14.5l74.67.66L480-354Zm0 161v-85l201.33-200.67h84.34L480-193Zm3.33 69 352.34-352.67Q851-472 862.17-460.5 873.33-449 878-433.67L526-81.33q-16-5-26.83-15.84Q488.33-108 483.33-124Zm120.34 44L880-356.33v85L688.67-80h-85Zm161.66 0L880-194.67V-130q0 21-14.5 35.5T830-80h-64.67Zm68.34-466.67h-69q-24-97.33-102.34-162Q584-773.33 480-773.33q-122.33 0-207.83 85.5-85.5 85.5-85.5 207.83 0 78 36.5 142.33Q259.67-273.33 320-234v-112.67h66.67V-120H160v-66.67h112q-69.33-48.66-110.67-125.5Q120-389 120-480q0-75 28.5-140.5t77-114q48.5-48.5 114-77T480-840q132.33 0 231.17 83.83 98.83 83.84 122.5 209.5Z"/>
    </svg>
    Réinitialiser
  </button>

  <button
    onClick={saveSignature}
    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2"
  >
    <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#e8eaed">
      <path d="M379.33-244 154-469.33 201.67-517l177.66 177.67 378.34-378.34L805.33-670l-426 426Z"/>
    </svg>
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
