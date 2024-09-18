import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',  // Utiliser une largeur fluide
  height: '300px', // Hauteur par défaut pour mobile et petits écrans
};

const center = {
  lat: -4.745,
  lng: -38.523
};

function MyGoogleMap() {
  return (
    <div className="bg-white shadow-lg transition-shadow duration-300 hover:shadow-blue-500 w-full h-auto lg:w-[860px] lg:h-[530px]">
      <LoadScript googleMapsApiKey="AIzaSyA1k2KoK3gmKQ01mI17Rp8rvaoExxdqsDY">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={5}>
          {/* Ajoutez des marqueurs ou autres fonctionnalités ici */}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default MyGoogleMap;
