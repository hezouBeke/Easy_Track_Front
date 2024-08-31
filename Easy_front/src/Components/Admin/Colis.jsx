import React, { useState, useEffect } from "react";
import colisService from "../../services/colisService";
import Adminsidebar from './Adminsidebar';
import Adminheader from './Adminheader';

function Colis() {
    const [colis, setColis] = useState([]);

    useEffect(() => {
        const fetchColis = async () => {
            try {
                const response = await colisService.getAllColis();
                setColis(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des colis", error);
            }
        };

        fetchColis();
    }, []);

    
    return (
        <section className="relative bg-gray-900 text-gray-300 p-12 sm:p-10 min-h-screen flex flex-col">
            <Adminheader />
            <div className="flex">
                <Adminsidebar />
                <div className="flex-1 mx-auto w-full px-4 lg:px-12 mt-12">
                    <div className="bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden ml-64 ">
                        
                        {/* Ajout de la barre de recherche et des filtres */}
                        <div className="flex justify-end items-center bg-gray-100 p-4 border-b-[1px] border-gray-300 space-x-2">
                            <button className="bg-gray-200 p-2 rounded-lg flex items-center space-x-2">
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
                                <thead className="text-xs text-gray-900 bg-gray-900 dark:bg-gray-100 dark:text-gray-900 border-t-[1px] border-gray-400 font-thin">
                                    <tr>
                                        <th scope="col" className="px-4 py-3">Code Colis</th>
                                        <th scope="col" className="px-4 py-3">Description Colis</th>
                                        <th scope="col" className="px-4 py-3">Nom & Prénom du Client</th>
                                        <th scope="col" className="px-4 py-3">Email</th>
                                        <th scope="col" className="px-4 py-3">Téléphone</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {colis.map(colisItem => (
                                        <tr key={colisItem._id} className="hover:bg-gray-900 dark:hover:bg-gray-600">
                                            <td className="px-4 py-3">{colisItem.client_id.completename}</td>
                                            <td className="px-4 py-3">{colisItem.description}</td>
                                            <td className="px-4 py-3">{colisItem.client_id.completename}</td>
                                            <td className="px-4 py-3">{colisItem.client_id.email || 'N/A'}</td>
                                            <td className="px-4 py-3">{colisItem.client_id.tel || 'N/A'}</td>
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

export default Colis;
