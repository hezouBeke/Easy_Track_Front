import React from 'react';

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#FFFFFF">
    <path d="M763-145q-121-9-229.5-59.5T339-341q-86-86-135.5-194T144-764q-2-21 12.29-36.5Q170.57-816 192-816h136q17 0 29.5 10.5T374-779l24 106q2 13-1.5 25T385-628l-97 98q20 38 46 73t57.97 65.98Q422-361 456-335.5q34 25.5 72 45.5l99-96q8-8 20-11.5t25-1.5l107 23q17 5 27 17.5t10 29.5v136q0 21.43-16 35.71Q784-143 763-145ZM255-600l70-70-17.16-74H218q5 38 14 73.5t23 70.5Zm344 344q35.1 14.24 71.55 22.62Q707-225 744-220v-90l-75-16-70 70ZM255-600Zm344 344Z" />
  </svg>
);

const MessageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#FFFFFF">
    <path d="M240-384h336v-72H240v72Zm0-132h480v-72H240v72Zm0-132h480v-72H240v72ZM96-96v-696q0-29.7 21.15-50.85Q138.3-864 168-864h624q29.7 0 50.85 21.15Q864-821.7 864-792v480q0 29.7-21.15 50.85Q821.7-240 792-240H240L96-96Zm114-216h582v-480H168v522l42-42Zm-42 0v-480 480Z" />
  </svg>
);

const OngoingDeliveries = () => {
  const deliveries = [
    {
      id: "KG3200L3122324GF",
      departure: "22.08.21 16:40 PM",
      arrival: "24.08.21 12:30 PM",
      customer: "Ella Doer",
      price: "1334 $",
      description: "Clothes",
      weight: "1,2 kg",
      driver: "John Green",
      status: "In Transit",
    },
  ];

  return (
    <div className="flex flex-col items-start space-y-10 p-8 justify-items-start lg:pl-[40px] lg:w-[calc(100%-10px)] lg:mt-[20px]">
      {/* SECTION Ajouter un colis */}
      <div className="p-6 bg-gradient-to-r from-gray-800 to-black rounded-lg shadow-md w-full max-w-lg lg:max-w-[500px] lg:ml-[20px] lg:mr-[40px]">
        <h2 className="text-xl font-semibold text-white">Ajouter un colis</h2>
        <p className="text-sm text-gray-400 mt-2">Remplissez le formulaire pour créer un nouveau colis</p>

        <div className="relative mt-4">
          <input
            type="text"
            placeholder="Numéro de suivi"
            className="w-full px-4 py-3 text-white bg-gray-800 border border-gray-500 rounded-full focus:outline-none focus:border-gray-400 placeholder-gray-400"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-black p-2 rounded-full hover:bg-gray-300 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Colis expédiés */}
      <div className="p-3 bg-white text-black rounded-lg shadow-lg mt-10 pt-0 justify-start w-full max-w-lg lg:max-w-[500px] lg:ml-[20px]">
        <style>
          {`
            /* Hide scrollbar on specific browsers */
            .p-3::-webkit-scrollbar { display: none; }
            .p-3 { -ms-overflow-style: none; scrollbar-width: none; }
          `}
        </style>
        {/* En-tête figée avec fond bleu */}
        <div className="flex justify-between items-center p-4 bg-blue-500 text-white rounded-t-none shadow-md sticky top-0 z-10 w-full">
          <h2 className="text-xl font-thin">Colis expédiés</h2>
        </div>

        {/* Contenu défilant */}
        <div className="pt-4 space-y-3">
          {deliveries.map((delivery, index) => (
            <div
              key={index}
              className="p-3 mb-3 bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-blue-400 transition-shadow text-sm font-thin w-full"
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
                  <p className="text-gray-600">Prix</p>
                  <p className="font-semibold">{delivery.price}</p>
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
                  <p className="text-gray-600">Livreur</p>
                  <p className="font-semibold">{delivery.driver}</p>
                </div>
                <div className="ml-auto flex space-x-2">
                  <button className="bg-black text-white p-2 rounded-full flex justify-center items-center">
                    <PhoneIcon />
                  </button>
                  <button className="bg-black text-white p-2 rounded-full flex justify-center items-center">
                    <MessageIcon />
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
