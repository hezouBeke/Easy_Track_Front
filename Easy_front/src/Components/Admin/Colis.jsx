import React, { useState, useEffect } from "react";
import colisService from "../../services/colisService";
import Adminsidebar from './Adminsidebar';
import Adminheader from './Adminheader';

function Colis() {
    const [colis, setColis] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedColis, setSelectedColis] = useState(null); // Colis sélectionné pour afficher les détails

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

    // Fonction pour ouvrir la modale avec les détails du colis sélectionné
    const handleViewDetails = (colisItem) => {
        setSelectedColis(colisItem); // On stocke le colis sélectionné
        setShowModal(true); // On ouvre la modale
    };

    // Fonction pour fermer la modale
    const closeModal = () => {
        setShowModal(false);
        setSelectedColis(null); // On remet le colis sélectionné à null
    };

    return (
        <section className="relative bg-gray-900 text-gray-300 p-12 sm:p-10 min-h-screen flex flex-col">
            <Adminheader />
            <div className="flex">
                <Adminsidebar />
                <div className="flex-1 mx-auto w-full px-4 lg:px-12 mt-12">
                    <div className="bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden ml-64">
                        {/* Ajout de la barre de recherche et des filtres */}
                        <div className="flex justify-end items-center bg-gray-100 p-4 border-b-[1px] border-gray-300 space-x-2">
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
                            <table className="w-full text-sm text-left text-gray-100">
                                <thead className="text-xs uppercase bg-gray-700 text-white">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left">Numéro Colis</th>
                                        <th scope="col" className="px-6 py-3 text-left">Description</th>
                                        <th scope="col" className="px-6 py-3 text-left">Expéditeur</th>
                                        <th scope="col" className="px-6 py-3 text-left">Destinataire</th>
                                        <th scope="col" className="px-6 py-3 text-left">Détails</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {colis.map(colisItem => (
                                        <tr key={colisItem._id} className="bg-gray-800 hover:bg-gray-600 transition-all">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {colisItem.numero_colis ? colisItem.numero_colis : 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {colisItem.description ? colisItem.description : 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {colisItem.client_id_exp ? colisItem.client_id_exp.completename : 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {colisItem.client_id_dest ? colisItem.client_id_dest.completename : 'N/A'}
                                            </td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => handleViewDetails(colisItem)}
                                                    className="text-blue-400 hover:text-blue-600 transition-transform transform hover:scale-105"
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

            {/* Modale pour afficher les détails */}
            {showModal && selectedColis && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-1/3 shadow-lg hover:shadow-xl transition-shadow transform duration-300">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">Détails du Colis</h2>
                        <p className="text-gray-700"><strong>Expéditeur:</strong> {selectedColis.client_id_exp.completename}</p>
                        <p className="text-gray-700"><strong>Email Expéditeur:</strong> {selectedColis.client_id_exp.email}</p>
                        <p className="text-gray-700"><strong>Téléphone Expéditeur:</strong> {selectedColis.client_id_exp.tel}</p>

                        <p className="mt-4 text-gray-700"><strong>Destinataire:</strong> {selectedColis.client_id_dest.completename}</p>
                        <p className="text-gray-700"><strong>Email Destinataire:</strong> {selectedColis.client_id_dest.email}</p>
                        <p className="text-gray-700"><strong>Téléphone Destinataire:</strong> {selectedColis.client_id_dest.tel}</p>

                        <div className="mt-6 flex justify-end">
                            <button 
                                onClick={closeModal}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
                            >
                                Fermer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default Colis;
