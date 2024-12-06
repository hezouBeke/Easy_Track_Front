import React, { useState } from "react";
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "125%", // Garder les dimensions exactes que vous avez définies
};

const center = {
  lat: -4.745,
  lng: -38.523,
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
