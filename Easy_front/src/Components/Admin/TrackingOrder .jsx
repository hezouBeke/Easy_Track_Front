import React, { useState, useEffect } from "react";
import expeditionService from "../../services/expeditionService";

const TrackingOrder = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchExpeditions = async () => {
            try {
                const response = await expeditionService.getAllExpeditions();
                const fetchedOrders = response.data.map(order => ({
                    ...order,
                    status: "Delivered" // Définit le statut par défaut à "Delivered"
                }));
                setOrders(fetchedOrders); // Assure-toi que le format des données est correct
            } catch (error) {
                console.error("Erreur lors de la récupération des expéditions", error);
            }
        };
        fetchExpeditions();
    }, []);

    const getStatusClass = (status) => {
        switch (status) {
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
        <div className="p-2 bg-white rounded-lg shadow-lg w-full max-w-full lg:max-w-[1810px] mt-[-35px]">
            {/* En-tête avec barre de recherche et bouton Export */}
            <div className="flex justify-between items-center mb-4 p-4 bg-white">
                <input
                    type="text"
                    placeholder="Tracking Number"
                    className="rounded-md p-2 text-gray-900 w-full md:w-96 border border-gray-300 focus:outline-none"
                />
                <button className="flex items-center text-gray-700 hover:text-gray-900 p-2 ml-4">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                        <path d="m648-140 112-112v92h40v-160H640v40h92L620-168l28 28Zm-448 20q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v268q-19-9-39-15.5t-41-9.5v-243H200v560h242q3 22 9.5 42t15.5 38H200Zm0-120v40-560 243-3 280Zm80-40h163q3-21 9.5-41t14.5-39H280v80Zm0-160h244q32-30 71.5-50t84.5-27v-3H280v80Zm0-160h400v-80H280v80ZM720-40q-83 0-141.5-58.5T520-240q0-83 58.5-141.5T720-440q83 0 141.5 58.5T920-240q0 83-58.5 141.5T720-40Z"/>
                    </svg>
                    <span className="ml-2">Export</span>
                </button>
            </div>
            {/* Tableau des commandes */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-200 sticky top-0 shadow-md">
                        <tr>
                            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Order ID</th>
                            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Départ</th>
                            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Destination</th>
                            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Date de début</th>
                            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Date de fin</th>
                            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Expéditeur</th>
                            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Destinataire</th>
                            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Coursier actuel</th>
                            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={index} className="border-b">
                                <td className="py-2 px-4 text-sm text-gray-700">{order.expedition_code}</td>
                                <td className="py-2 px-4 text-sm text-gray-700">{order.colis_id?.desc_depart || 'N/A'}</td>
                                <td className="py-2 px-4 text-sm text-gray-700">{order.colis_id?.desc_destination || 'N/A'}</td>
                                <td className="py-2 px-4 text-sm text-gray-700">{new Date(order.date_depart).toLocaleDateString()}</td>
                                <td className="py-2 px-4 text-sm text-gray-700">{new Date(order.date_arrivee).toLocaleDateString()}</td>
                                <td className="py-2 px-4 text-sm text-gray-700">{order.colis_id?.client_id_exp?.completename || 'N/A'}</td>
                                <td className="py-2 px-4 text-sm text-gray-700">{order.colis_id?.client_id_dest?.completename || 'N/A'}</td>
                                <td className="py-2 px-4 text-sm text-gray-700">{order.course_ids?.[0]?.coursier_id?.completename || 'N/A'}</td>
                                <td className="py-2 px-4 text-sm">
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
