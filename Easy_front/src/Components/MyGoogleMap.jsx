import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '115%', // La carte occupe toute la hauteur du conteneur
};

const center = {
  lat: -4.745,
  lng: -38.523,
};

function MyGoogleMap() {
  return (
    <div className="bg-white shadow-lg transition-shadow duration-300 hover:shadow-blue-500 max-w-4xl h-[400px] lg:h-[542px] lg:ml-[-60px] mt-14 lg:mr-[-20px] rounded-lg">
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
