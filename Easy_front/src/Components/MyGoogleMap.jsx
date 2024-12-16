import React, { useState } from "react";
import { GoogleMap, LoadScript, Autocomplete } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "645px",
};

const initialCenter = {
  lat: 6.1725, // Centre initial (Togo)
  lng: 1.2314,
};

function MyGoogleMap() {
  const [mapCenter, setMapCenter] = useState(initialCenter); // Centre dynamique
  const [mapZoom, setMapZoom] = useState(12); // Zoom initial
  const [autocomplete, setAutocomplete] = useState(null);

  // Fonction pour rechercher des coordonnées précises avec Geocoding API
  const fetchExactCoordinates = (address) => {
    const GEOCODING_API_URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=AIzaSyDhsuUvcWxn5usgT38tmWPlhCiw3awnev4`;

    fetch(GEOCODING_API_URL)
      .then((response) => response.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          const location = data.results[0].geometry.location;
          setMapCenter({ lat: location.lat, lng: location.lng });
          setMapZoom(15); // Zoom automatique
        } else {
          console.error("Aucune correspondance trouvée pour cet endroit.");
        }
      })
      .catch((error) => console.error("Erreur Geocoding API :", error));
  };

  // Fonction appelée lorsqu'un endroit est sélectionné
  const onPlaceSelected = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place && place.formatted_address) {
        // Appel à Geocoding API pour une localisation précise
        fetchExactCoordinates(place.formatted_address);
      } else if (place.geometry) {
        setMapCenter({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
        setMapZoom(15);
      } else {
        console.error("Impossible de récupérer les coordonnées de cet endroit.");
      }
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <LoadScript
        googleMapsApiKey="AIzaSyDhsuUvcWxn5usgT38tmWPlhCiw3awnev4" // Remplace par ta clé API
        libraries={["places"]}
      >
        {/* Barre de recherche */}
        <div className="p-4 relative z-10">
          <Autocomplete
            onLoad={(autoC) => setAutocomplete(autoC)}
            onPlaceChanged={onPlaceSelected}
          >
            <input
              type="text"
              placeholder="Rechercher "
              className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none shadow-md"
            />
          </Autocomplete>
        </div>

        {/* Carte Google Maps */}
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapCenter}
          zoom={mapZoom}
        />
      </LoadScript>
    </div>
  );
}

export default MyGoogleMap;
