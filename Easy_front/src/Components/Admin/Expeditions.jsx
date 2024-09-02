import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import expeditionService from "../../services/expeditionService";
import Adminsidebar from './Adminsidebar';
import Adminheader from './Adminheader';

function Expeditions() {
    const [expeditions, setExpeditions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchExpeditions = async () => {
            try {
                const response = await expeditionService.getAllExpeditions();
                setExpeditions(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des expéditions", error);
            }
        };

        fetchExpeditions();
    }, []);

    const handleViewDetails = async (expeditionId) => {
        navigate(`/expeditions/${expeditionId}`);
    };

    return (
        <section className="relative bg-gray-900 text-gray-300 p-20 sm:p-10 min-h-screen flex flex-col">
            <Adminheader />
            <div className="flex">
                <Adminsidebar />
                <div className="flex-1 mx-auto w-full max-w-screen-5xl lg:px-10 mt-12">
                    <div className="bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden ml-64">
                    <div className="flex justify-end items-center bg-gray-100 p-4 border-b border-gray-300 space-x-2">
                            <button className="bg-gray-700 p-2 rounded-lg flex items-center space-x-2">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000000">
                                        <path d="M456-144v-240h72v84h288v72H528v84h-72Zm-312-84v-72h240v72H144Zm144-132v-84H144v-72h144v-84h72v240h-72Zm144-84v-72h384v72H432Zm144-132v-240h72v84h168v72H648v84h-72Zm-432-84v-72h384v72H144Z"/>
                                    </svg>
                                </span>
                                <span>More filters</span>
                            </button>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="text"

                                    placeholder="Search"
                                    className="px-4 py-2 border rounded-lg text-black"
                                />
                                <button className="text-gray-800">⌘ K</button>
                            </div>
                        </div>
                        <div className="overflow-x-auto mt-0">
                            <table className="w-full text-sm text-right text-gray-900">
                                <thead className="text-xs text-gray-900 font-thin bg-gray-100 w-full border-t border-gray-300">
                                    <tr>
                                        <th scope="col" className="px-6 py-4 w-1/6">Départ</th>
                                        <th scope="col" className="px-6 py-4 w-1/6">Destination</th>
                                        <th scope="col" className="px-6 py-4 w-1/6">Date de Départ</th>
                                        <th scope="col" className="px-6 py-4 w-1/6">Date d'Arrivée</th>
                                        <th scope="col" className="px-6 py-4 w-1/6">Colis</th>
                                        <th scope="col" className="px-6 py-4 w-1/6">E-mail</th>
                                        <th scope="col" className="px-6 py-4 w-1/6">Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {expeditions.map(expedition => (
                                        <tr key={expedition._id} className="hover:bg-gray-700">
                                            <td className="px-6 py-4">{expedition.lieu_depart}</td>
                                            <td className="px-6 py-4">{expedition.lieu_arrivee}</td>
                                            <td className="px-6 py-4">{expedition.date_depart}</td>
                                            <td className="px-6 py-4">{expedition.date_arrivee}</td>
                                            <td className="px-6 py-4">{expedition.colis_id.numero_colis}</td>
                                            <td className="px-6 py-4">{expedition.client_id.email}</td>
                                            <td className="px-6 py-4 text-right">
                                                <button 
                                                    onClick={() => handleViewDetails(expedition._id)}
                                                    className="text-blue-400 hover:text-blue-600"
                                                >
                                                    Voir Détail
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Expeditions;
