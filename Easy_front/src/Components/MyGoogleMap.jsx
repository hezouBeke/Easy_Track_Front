import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '800px', // Ajustez la largeur selon vos besoins
  height: '300px', // Ajustez la hauteur pour afficher correctement la carte
};

const center = {
  lat: -4.745,
  lng: -38.523
};

function MyGoogleMap() {
  return (
    <div className="bg-white rounded-lg shadow-lg border-5 border-blue-500 absolute right-4 top-64 h-[150px]">
      <LoadScript googleMapsApiKey="AIzaSyA1k2KoK3gmKQ01mI17Rp8rvaoExxdqsDY">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={5}>
          {/* Vous pouvez ajouter des marqueurs ici si nécessaire */}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default MyGoogleMap;
