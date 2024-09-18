import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%', // Pour que la carte prenne la hauteur maximale possible
};

const center = {
  lat: -4.745,
  lng: -38.523,
};

function MyGoogleMap() {
  return (
    <div className="bg-white shadow-lg transition-shadow duration-300 hover:shadow-blue-500 w-full h-[400px] lg:h-[600px]"> {/* Ajuste la hauteur ici */}
      <LoadScript googleMapsApiKey="AIzaSyA1k2KoK3gmKQ01mI17Rp8rvaoExxdqsDY">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={5}
        >
          {/* Vous pouvez ajouter des marqueurs ou autres composants ici */}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default MyGoogleMap;
