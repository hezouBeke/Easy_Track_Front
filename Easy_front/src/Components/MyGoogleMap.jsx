import React, { useState } from "react";
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from "@react-google-maps/api";

const containerStyle = {
  width: "138%", // Prend toute la largeur visible de l'écran
  height: "115%", // Adapte à la hauteur du conteneur
};


const center = {
  lat: 6.1725, // Latitude approximative du centre du Togo
  lng: 1.2314, // Longitude approximative du centre du Togo
};

function MyGoogleMap({ startPoint, endPoint }) {
  const [directions, setDirections] = useState(null);

  const directionsCallback = (response) => {
    if (response && response.status === "OK") {
      setDirections(response);
    } else {
      console.error("Erreur lors de la récupération de l'itinéraire : ", response);
    }
  };

  return (
    <div className="bg-white shadow-lg transition-shadow duration-300 hover:shadow-blue-500 max-w-5xl h-[400px] lg:h-[542px] lg:ml-[-10px] lg:mr-[-10px] rounded-lg">
      <LoadScript googleMapsApiKey="AIzaSyBKhBYPksQJERxsKO-RfwPHSnC7xFLB29U">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={5}
        >
          {/* Directions Service pour tracer l'itinéraire */}
          {startPoint && endPoint && (
            <DirectionsService
              options={{
                origin: startPoint,
                destination: endPoint,
                travelMode: "DRIVING", // Modes disponibles : DRIVING, WALKING, BICYCLING, TRANSIT
              }}
              callback={directionsCallback}
            />
          )}
          {/* Rendu de l'itinéraire */}
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default MyGoogleMap;
