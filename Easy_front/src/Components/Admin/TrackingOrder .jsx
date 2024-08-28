import React from 'react';

const TrackingOrder = () => {
    const orders = [
        {
            id: "#001234ABCD",
            Départ: "Togo",
            Destination: "France",
            Datedébut: "01/05/2024",
            Datefin: "01/05/2024",
            Expéditeur: "BEKE hezou",
            Destinataire: "ATAKORA jean",
            coursier:"TAKPASOUKA JUNIOR",
            status: "Delivered"
        },
        {
            id: "#001234ABCD",
            Départ: "Togo",
            Destination: "France",
            Datedébut: "01/05/2024",
            Datefin: "01/05/2024",
            Expéditeur: "BEKE hezou",
            Destinataire: "ATAKORA jean",
            coursier:"TAKPASOUKA JUNIOR",
            status: "Delivered"
        },
        {
            id: "#001234ABCD",
            Départ: "Togo",
            Destination: "France",
            Datedébut: "01/05/2024",
            Datefin: "01/05/2024",
            Expéditeur: "BEKE hezou",
            Destinataire: "ATAKORA jean",
            coursier:"TAKPASOUKA JUNIOR",
            status: "Delivered"
        },
        {
            id: "#001234ABCD",
            Départ: "Togo",
            Destination: "France",
            Datedébut: "01/05/2024",
            Datefin: "01/05/2024",
            Expéditeur: "BEKE hezou",
            Destinataire: "ATAKORA jean",
            coursier:"TAKPASOUKA JUNIOR",
            status: "Delivered"
        }
        ,
        {
            id: "#001234ABCD",
            Départ: "Togo",
            Destination: "France",
            Datedébut: "01/05/2024",
            Datefin: "01/05/2024",
            Expéditeur: "BEKE hezou",
            Destinataire: "ATAKORA jean",
            coursier:"TAKPASOUKA JUNIOR",
            status: "Delivered"
        }
        ,
        {
            id: "#001234ABCD",
            Départ: "Togo",
            Destination: "France",
            Datedébut: "01/05/2024",
            Datefin: "01/05/2024",
            Expéditeur: "BEKE hezou",
            Destinataire: "ATAKORA jean",
            coursier:"TAKPASOUKA JUNIOR",
            status: "Delivered"
        }
        ,
        {
            id: "#001234ABCD",
            Départ: "Togo",
            Destination: "France",
            Datedébut: "01/05/2024",
            Datefin: "01/05/2024",
            Expéditeur: "BEKE hezou",
            Destinataire: "ATAKORA jean",
            coursier:"TAKPASOUKA JUNIOR",
            status: "Delivered"
        }
        ,
        {
            id: "#001234ABCD",
            Départ: "Togo",
            Destination: "France",
            Datedébut: "01/05/2024",
            Datefin: "01/05/2024",
            Expéditeur: "BEKE hezou",
            Destinataire: "ATAKORA jean",
            coursier:"TAKPASOUKA JUNIOR",
            status: "Delivered"
        }
        ,
        {
            id: "#001234ABCD",
            Départ: "Togo",
            Destination: "France",
            Datedébut: "01/05/2024",
            Datefin: "01/05/2024",
            Expéditeur: "BEKE hezou",
            Destinataire: "ATAKORA jean",
            coursier:"TAKPASOUKA JUNIOR",
            status: "Delivered"
        }
        ,
        {
            id: "#001234ABCD",
            Départ: "Togo",
            Destination: "France",
            Datedébut: "01/05/2024",
            Datefin: "01/05/2024",
            Expéditeur: "BEKE hezou",
            Destinataire: "ATAKORA jean",
            coursier:"TAKPASOUKA JUNIOR",
            status: "Delivered"
        }
    ];

    const getStatusClass = (status) => {
        switch(status) {
            case "Delivered":
                return "bg-green-100 text-green-700";
            case "Pending":
                return "bg-yellow-100 text-yellow-700";
            case "Shipping":
                return "bg-blue-100 text-blue-700";
            default:
                return "";
        }
    };

    return (
        <div className="fixed bottom-0 right-0 left-64 p-5 bg-white rounded-lg shadow-lg w-[1450px] max-h-[30vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-thin">Tracking</h2>
                <div className="flex items-center">
                    <input 
                        type="text" 
                        placeholder="Search.." 
                        className="border border-gray-300 rounded-md p-2 mr-4"
                    />
                    <button className="flex items-center text-gray-500 hover:text-gray-700 mr-4">
                        <span className="mr-2">Filter</span>
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000000"><path d="M456-144v-240h72v84h288v72H528v84h-72Zm-312-84v-72h240v72H144Zm144-132v-84H144v-72h144v-84h72v240h-72Zm144-84v-72h384v72H432Zm144-132v-240h72v84h168v72H648v84h-72Zm-432-84v-72h384v72H144Z"/></svg>
                    </button>
                    <button className="flex items-center text-gray-500 hover:text-gray-700">
                        <span className="mr-2">Exports</span>
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000000"><path d="M480-336 288-528l51-51 105 105v-342h72v342l105-105 51 51-192 192ZM263.72-192Q234-192 213-213.15T192-264v-72h72v72h432v-72h72v72q0 29.7-21.16 50.85Q725.68-192 695.96-192H263.72Z"/></svg>
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="py-2 text-left text-sm font-semibold text-gray-600">Order ID</th>
                            <th className="py-2 text-left text-sm font-semibold text-gray-600">Départ</th>
                            <th className="py-2 text-left text-sm font-semibold text-gray-600">Destination</th>
                            <th className="py-2 text-left text-sm font-semibold text-gray-600">Date de début</th>
                            <th className="py-2 text-left text-sm font-semibold text-gray-600">Date de fin</th>
                            <th className="py-2 text-left text-sm font-semibold text-gray-600">Expéditeur</th>
                            <th className="py-2 text-left text-sm font-semibold text-gray-600">Destinataire</th>
                            <th className="py-2 text-left text-sm font-semibold text-gray-600">Coursier actuel</th>
                            <th className="py-2 text-left text-sm font-semibold text-gray-600">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={index} className="border-b">
                                <td className="py-2 text-sm text-gray-700">{order.id}</td>
                                <td className="py-2 text-sm text-gray-700">{order.Départ}</td>
                                <td className="py-2 text-sm text-gray-700">{order.Destination}</td>
                                <td className="py-2 text-sm text-gray-700">{order.Datedébut}</td>
                                <td className="py-2 text-sm text-gray-700">{order.Datefin}</td>
                                <td className="py-2 text-sm text-gray-700">{order.Expéditeur}</td>
                                <td className="py-2 text-sm text-gray-700">{order.Destinataire}</td>
                                <td className="py-2 text-sm text-gray-700">{order.coursier}</td>
                         
                                <td className="py-2 text-sm">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(order.status)}`}>
                                        {order.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TrackingOrder;
