import React from 'react';

const TruckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#000000">
        <path d="M229.41-160.67q-49.41 0-84.08-34.61-34.66-34.61-34.66-84.05H40v-454q0-27 19.83-46.84Q79.67-800 106.67-800h572.66v164.67h110l130.67 174v182h-74q0 49.44-34.59 84.05t-84 34.61q-49.41 0-84.08-34.61-34.66-34.61-34.66-84.05H348q0 49.33-34.59 84-34.59 34.66-84 34.66Zm-.08-66.66q21.67 0 36.84-15.17 15.16-15.17 15.16-36.83 0-21.67-15.16-36.84-15.17-15.16-36.84-15.16-21.66 0-36.83 15.16-15.17 15.17-15.17 36.84 0 21.66 15.17 36.83 15.17 15.17 36.83 15.17ZM106.67-346H132q17-24 41.69-38.33 24.7-14.34 55-14.34Q259-398.67 284-384q25 14.67 42 38h286.67v-387.33h-506V-346Zm620.66 118.67q21.67 0 36.84-15.17 15.16-15.17 15.16-36.83 0-21.67-15.16-36.84-15.17-15.16-36.84-15.16-21.66 0-36.83 15.16-15.17 15.17-15.17 36.84 0 21.66 15.17 36.83 15.17 15.17 36.83 15.17Zm-48-202.67H860L756-568.67h-76.67V-430ZM360-532.67Z"/>
    </svg>
);

const OngoingDeliveries = () => {
    const deliveries = [
        {
            id: "#001234ABCD",
            from: "Togo ",
            to: "France",
            status: "On the way",
        },
        {
            id: "#001234ABCD",
            from: "Togo ",
            to: "France",
            status: "On the way",
        },
        {
            id: "#001234ABCD",
            from: "Togo ",
            to: "France",
            status: "On the way",
        },
        {
            id: "#001234ABCD",
            from: "Togo ",
            to: "France",
            status: "On the way",
        },
        {
            id: "#001234ABCD",
            from: "Togo ",
            to: "France",
            status: "On the way",
        },
         {
            id: "#001234ABCD",
            from: "Togo ",
            to: "France",
            status: "On the way",
        },
        // ... autres livraisons
    ];

    return (
        <div 
            className="p-3 bg-white text-black rounded-lg shadow-lg mt-10 pt-0 fixed top-60 left-72 justify-center w-[540px] h-[310px] overflow-y-auto"
            style={{
                scrollbarWidth: 'none', /* Firefox */
                msOverflowStyle: 'none', /* Internet Explorer 10+ */
            }}
        >
            <style>
                {`
                    /* Chrome, Safari et Opera */
                    .p-3::-webkit-scrollbar {
                        display: none;
                    }
                `}
            </style>
            {/* En-tête figée avec fond bleu */}
            <div className="flex justify-between items-center p-4 bg-blue-500 text-black rounded-t-lg shadow-lg sticky top-0 z-10">
                <h2 className="text-xl font-semibold">Colis expédiés</h2>
                <button className="flex items-center text-white hover:text-gray-300">
                    <span className="mr-2">Filter</span>
                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#ffffff"><path d="M456-144v-240h72v84h288v72H528v84h-72Zm-312-84v-72h240v72H144Zm144-132v-84H144v-72h144v-84h72v240h-72Zm144-84v-72h384v72H432Zm144-132v-240h72v84h168v72H648v84h-72Zm-432-84v-72h384v72H144Z"/></svg>                </button>
            </div>
            {/* Contenu défilant avec du padding pour éviter le chevauchement */}
            <div className="pt-4">
                {deliveries.map((delivery, index) => (
                    <div 
                        key={index} 
                        className="p-4 mb-4 bg-white rounded-lg border border-gray-200 flex items-center shadow-xl hover:shadow-2xl hover:shadow-blue-400 transition-shadow"
                    >
                        <TruckIcon />
                        <div className="ml-4">
                            <h3 className="text-lg font-semibold text-black">{delivery.id}</h3>
                            <p className="text-sm text-gray-700">
                                {delivery.from} ➞ {delivery.to}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OngoingDeliveries;
