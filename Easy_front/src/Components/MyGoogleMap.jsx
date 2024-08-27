import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '50%',
  height: '600px'
};

const center = {
  lat: -4.745,
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
        zoom={5}
      >
        {/* Vous pouvez ajouter des marqueurs ici si nécessaire */}
      </GoogleMap>
    </LoadScript>
  );
}

export default MyGoogleMap;
