import React from 'react';
import expeditionService from '../../services/expeditionService';

const OngoingDeliveries = () => {
//   const [expeditions, setExpeditions] = useState([]);
//   useEffect(() => {
//     const fetchExpeditions = async () => {
//         try {
//             const response = await expeditionService.getAllExpeditions();
//             setExpeditions(response.data);
//         } catch (error) {
//             console.error("Erreur lors de la récupération des expéditions", error);
//         }
//     };

//     fetchExpeditions();
// }, []);

    const deliveries = [
      {
        id: "KG3200L3122324GF",
        departure: "22.08.21 16:40 PM",
        arrival: "24.08.21 12:30 PM",
        customer: "Ella Doer",
        NumColis: "LIIIDN",
        description: "Clothes",
        weight: "1,2 kg",
        coursier: "John Green",
        status: "In Transit",
      },
      {
        id: "KG3200L3122324GF",
        departure: "22.08.21 16:40 PM",
        arrival: "24.08.21",
        customer: "Ella Doer",
        NumColis: "LIIIDN",
        description: "Clothes",
        weight: "1,2 kg",
        coursier: "John Green",
        status: "In Transit",
      },
      {
        id: "KG3200L3122324GF",
        departure: "22.08.21 16:40 PM",
        arrival: "24.08.21 12:30 PM",
        customer: "Ella Doer",
        NumColis: "LIIIDN",
        description: "Clothes",
        weight: "1,2 kg",
        coursier: "John Green",
        status: "In Transit",
      },
      {
        id: "KG3200L3122324GF",
        departure: "22.08.21 16:40 PM",
        arrival: "24.08.21 12:30 PM",
        customer: "Ella Doer",
        NumColis: "LIIIDN",
        description: "Clothes",
        weight: "1,2 kg",
        coursier: "John Green",
        status: "In Transit",
      },
   
   
      
    ];
  
    return (
<div className="flex flex-col items-start space-y-6 p-8 mt-6 w-full lg:ml-[-2] lg:mr-15">
  {/* SECTION Ajouter un colis */}

  {/* Colis expédiés */}
  <div className="p-3 bg-white text-black rounded-lg shadow-lg mt-1 w-full">
    {/* En-tête figée avec fond bleu */}
    <div className="flex justify-between items-center p-4 bg-blue-500 text-white rounded-t-none shadow-md w-full">
      <h2 className="text-xl font-thin">Colis expédiés</h2>
    </div>

    {/* Contenu avec scroll caché */}
    <div className="pt-4 space-y-3" style={{ maxHeight: '550px', overflowY: 'auto', scrollbarWidth: 'none' }}>
      {deliveries.map((delivery, index) => (
        <div
          key={index}
          className="p-3 mb-5 bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-blue-400 transition-shadow text-sm font-thin w-full"
          style={{ transition: 'box-shadow 0.3s ease' }}
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-thin">Numéro de suivi</span>
            <span className="px-2 py-1 bg-yellow-400 text-white text-xs rounded-full">{delivery.status}</span>
          </div>
          <h3 className="text-md font-semibold text-black">{delivery.id}</h3>

          <hr className="my-2 border-gray-300" style={{ borderWidth: '0.5px' }} />

          <div className="flex justify-between items-center mt-2 text-xs">
            <div className="text-gray-600">
              <p>Départ</p>
              <p className="font-semibold">{delivery.departure}</p>
            </div>
            <div className="text-gray-600">
              <p>Arrivée</p>
              <p className="font-semibold">{delivery.arrival}</p>
            </div>
          </div>

          <hr className="my-2 border-gray-300" style={{ borderWidth: '0.5px' }} />

          <div className="flex justify-between items-center mt-2 text-xs">
            <div className="flex-1">
              <p className="text-gray-600">Client</p>
              <p className="font-semibold">{delivery.customer}</p>
            </div>
            <div className="flex-1">
              <p className="text-gray-600">NumColis</p>
              <p className="font-semibold">{delivery.NumColis}</p>
            </div>
            <div className="flex-1">
              <p className="text-gray-600">Description</p>
              <p className="font-semibold">{delivery.description}</p>
            </div>
            <div className="flex-1">
              <p className="text-gray-600">Poids</p>
              <p className="font-semibold">{delivery.weight}</p>
            </div>
          </div>

          <hr className="my-2 border-gray-300" style={{ borderWidth: '0.5px' }} />

          <div className="flex items-center mt-4">
            <div className="w-8 h-8 rounded-full bg-gray-300 mr-3"></div>
            <div className="text-xs">
              <p className="text-gray-600">Coursier</p>
              <p className="font-semibold">{delivery.coursier}</p>
            </div>

            {/* Espace ajouté ici */}
            <div className="ml-16"></div>

            <div className="flex space-x-5 mt-5 mb-0">
              <button className="flex items-center justify-center space-x-2 bg-white border border-gray-300 text-black py-1 px-3 rounded-lg hover:bg-gray-100 transition text-xs">
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000000">
                  <path d="M760-480q0-117-81.5-198.5T480-760v-80q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480h-80Zm-160 0q0-50-35-85t-85-35v-80q83 0 141.5 58.5T680-480h-80Zm198 360q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z"/>
                </svg>
                <span>Call</span>
              </button>
              <button className="flex items-center justify-center space-x-2 bg-blue-500 text-white py-1 px-4 rounded-lg hover:bg-blue-600 transition text-xs">
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#FFFFFF">
                  <path d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z"/>
                </svg>
                <span>Message</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>


    );
  };
  
  export default OngoingDeliveries;
  