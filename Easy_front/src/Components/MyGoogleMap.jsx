import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

function MyGoogleMap() {
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyA1k2KoK3gmKQ01mI17Rp8rvaoExxdqsDY" 
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        {/* Vous pouvez ajouter des marqueurs ici si nécessaire */}
      </GoogleMap>
    </LoadScript>
  );
}

export default MyGoogleMap;
