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
            from: "87 Wern Ddu Lane",
            to: "15 Vicar Lane",
            status: "On the way",
        },
        {
            id: "#001234ABCD",
            from: "40 Broomfield Place",
            to: "44 Helland Bridge",
            status: "On the way",
        },
        {
            id: "#001234ABCD",
            from: "87 Wern Ddu Lane",
            to: "15 Vicar Lane",
            status: "On the way",
        },
        {
            id: "#001234ABCD",
            from: "87 Wern Ddu Lane",
            to: "15 Vicar Lane",
            status: "On the way",
        },
        {
            id: "#001234ABCD",
            from: "87 Wern Ddu Lane",
            to: "15 Vicar Lane",
            status: "On the way",
        },
        {
            id: "#001234ABCD",
            from: "87 Wern Ddu Lane",
            to: "15 Vicar Lane",
            status: "On the way",
        },
    ];

    return (
        <div 
            className="p-2 bg-white rounded-lg shadow-lg mt-10 fixed top-60 left-80 justify-center w-[530px] h-[400px] overflow-y-scroll"
            style={{
                scrollbarWidth: 'none', /* Firefox */
                msOverflowStyle: 'none', /* Internet Explorer 10+ */
            }}
        >
            <style>
                {`
                    /* Chrome, Safari and Opera */
                    .p-2::-webkit-scrollbar {
                        display: none;
                    }
                `}
            </style>
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-semibold">Ongoing delivery</h2>
                <button className="flex items-center text-gray-500 hover:text-gray-700">
                    <span className="mr-2">Filter</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line></svg>
                </button>
            </div>
            {deliveries.map((delivery, index) => (
                <div 
                    key={index} 
                    className="p-4 mb-4 bg-white rounded-lg border border-gray-200 flex items-center shadow hover:shadow-lg transition-shadow"
                >
                    <TruckIcon />
                    <div className="ml-4">
                        <h3 className="text-lg font-semibold">{delivery.id}</h3>
                        <p className="text-sm text-gray-500">
                            {delivery.from} ➞ {delivery.to}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OngoingDeliveries;

