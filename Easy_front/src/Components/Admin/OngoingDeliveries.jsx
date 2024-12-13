import React, { useEffect, useState } from 'react';
import expeditionService from '../../services/expeditionService'; // Importation de ton service
import coursierImage from '../../assets/man.jpg';
const OngoingDeliveries = () => {
  const [expeditions, setExpeditions] = useState([]);
  const [error, setError] = useState(null); // Stocker les erreurs potentielles

  // Récupérer les expéditions à l'initialisation du composant
  useEffect(() => {
    const fetchExpeditions = async () => {
      try {
        const response = await expeditionService.getAllExpeditions();
        setExpeditions(response.data);
      } catch (err) {
        setError('Erreur lors de la récupération des expéditions');
      }
    };
    fetchExpeditions();
  }, []);

  if (error) {
    return <div>{error}</div>; // Afficher le message d'erreur s'il y en a une
  }

  return (
    <div className="flex flex-col items-start space-y-15 p-7 mt-6 w-full mr-10">
      <div className="p-3 bg-white text-black rounded-lg shadow-lg w-full">
        {/* En-tête */}
        <div className="flex justify-between items-center p-4 bg-blue-500 text-white rounded-t-none shadow-md w-full">
          <h2 className="text-xl font-thin">Suivi des courses expédiées</h2>
        </div>
         {/* Champs de sélection et filtrage */}
    <form className="flex justify-between items-center space-x-4 p-4">
      {/* Select pour choisir une expédition */}
      <div className="relative">
        <label htmlFor="expedition-select" className="sr-only">
          Sélectionner une expédition
        </label>
        <select
          id="expedition-select"
          className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
        >
          <option value="">Sélectionnez une expédition</option>
          {expeditions.map((expedition) => (
            <option key={expedition.id} value={expedition.expedition_code}>
              {expedition.expedition_code}
            </option>
          ))}
        </select>
      </div>

      {/* Input de recherche pour filtrer les colis */}
      <div className="relative w-full">
        <input
          type="search"
          id="search-colis"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Rechercher un colis..."
        />
        <button
          type="submit"
          className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
        >
          <svg
            className="w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </button>
      </div>
    </form>

        {/* Contenu */}
        <div
          className="pt-4 space-y-3"
          style={{ maxHeight: '550px', overflowY: 'auto', scrollbarWidth: 'none' }}
        >
          {expeditions.map((expedition) =>
            expedition.course_ids.map((course, index) => {
              const colis = course.colis_id;
              const coursier = course.coursier_id;

              return (
                <div
                  key={index}
                  className="p-3 mb-5 bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-blue-400 transition-shadow text-sm font-thin w-full"
                >
                  {/* Numéro de suivi et statut */}
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <span className="text-xs font-thin">Numéro de suivi</span>
                      <h3 className="text-md font-semibold text-black">
                        {expedition?.expedition_code || 'N/A'}
                      </h3>
                    </div>
                    <span className="px-2 py-1 bg-yellow-400 text-white text-xs rounded-full">
                      {expedition?.status || 'In Transit'}
                    </span>
                  </div>

                  <hr className="my-2 border-gray-300" style={{ borderWidth: '0.5px' }} />

                  {/* Départ et arrivée */}
                  <div className="flex justify-between items-center mt-2 text-xs">
                    <div className="text-gray-600">
                      <p>Départ</p>
                      <p className="font-semibold">{course.depart || 'N/A'}</p>
                    </div>
                    <div className="text-gray-600">
                      <p>Arrivée</p>
                      <p className="font-semibold">{course.arrive || 'N/A'}</p>
                    </div>
                    <div className="text-gray-600">
                      <p>Type de course</p>
                      <p className="font-semibold">
                        {course.type_course === 'relay' ? 'Relay' : 'Delivery'}
                      </p>
                    </div>
                  </div>

                  <hr className="my-2 border-gray-300" style={{ borderWidth: '0.5px' }} />

                  {/* Informations sur le colis */}
                  <div className="flex justify-between items-center mt-2 text-xs">
                    <div className="flex-1">
                      <p className="text-gray-600">Client expéditeur</p>
                      <p className="font-semibold">{colis?.client_id_exp?.completename || 'N/A'}</p>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-600">Numéro du colis</p>
                      <p className="font-semibold">{colis?.indent_colis || 'N/A'}</p>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-600">Description</p>
                      <p className="font-semibold">{colis?.description || 'N/A'}</p>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-600">Poids</p>
                      <p className="font-semibold">{colis?.poids ? `${colis.poids} kg` : 'N/A'}</p>
                    </div>
                  </div>

                  <hr className="my-2 border-gray-300" style={{ borderWidth: '0.5px' }} />

                  {/* Coursier */}
                  <div className="flex items-center mt-4">
                  <div className="w-8 h-8 rounded-full bg-gray-300 mr-3 overflow-hidden">
        <img
          src={coursierImage}
          alt="Coursier"
          className="w-full h-full object-cover"
        />
      </div>
                    <div className="text-xs">
                      <p className="text-gray-600">Coursier</p>
                      <p className="font-semibold">{coursier?.completename || 'N/A'}</p>
                    </div>
                    <div className="ml-40"></div>
              <div className="flex space-x-5 mt-5 mb-0">
                <button className="flex items-center justify-center space-x-2 bg-white border border-gray-300 text-black py-1 px-3 rounded-lg hover:bg-gray-100 transition text-xs">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20px"
                    viewBox="0 -960 960 960"
                    width="20px"
                    fill="#000000"
                  >
                    <path d="M760-480q0-117-81.5-198.5T480-760v-80q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480h-80Zm-160 0q0-50-35-85t-85-35v-80q83 0 141.5 58.5T680-480h-80Zm198 360q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z" />
                  </svg>
                  <span>Call</span>
                </button>
                <button className="flex items-center justify-center space-x-2 bg-blue-500 text-white py-1 px-4 rounded-lg hover:bg-blue-600 transition text-xs">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20px"
                    viewBox="0 -960 960 960"
                    width="20px"
                    fill="#FFFFFF"
                  >
                    <path d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z" />
                  </svg>
                  <span>Message</span>
                </button>
              </div>
                  </div>
                  
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default OngoingDeliveries;
