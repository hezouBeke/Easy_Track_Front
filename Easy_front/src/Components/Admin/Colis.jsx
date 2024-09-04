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
        <section className="relative bg-gray-900 text-gray-300 p-12 sm:p-10 min-h-screen flex flex-col font-thin">
            <Adminheader />
            <div className="flex">
                <Adminsidebar />
                <div className="flex-1 mx-auto w-full px-4 lg:px-12 mt-12">
                    {/* Titre de la liste des colis */}
                    <div className="text-center mb-6">
                        <h1 className="text-3xl font-thin text-white">Liste des Colis</h1>
                    </div>
                    
                    <div className="bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden ml-64">
                        {/* Ajout de la barre de recherche et des filtres */}
                        <div className="flex justify-between items-center bg-gray-100 p-4 border-b-[1px] border-gray-300 font-thin">
                            {/* SVG Icon on the left */}
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#000000">
                                    <path d="M450-154v-309L180-619v309l270 156Zm60 0 270-156v-310L510-463v309Zm-60 69L150-258q-14-8-22-22t-8-30v-340q0-16 8-30t22-22l300-173q14-8 30-8t30 8l300 173q14 8 22 22t8 30v340q0 16-8 30t-22 22L510-85q-14 8-30 8t-30-8Zm194-525 102-59-266-154-102 59 266 154Zm-164 96 104-61-267-154-104 60 267 155Z"/>
                                </svg>
                            </div>

                            {/* Filters Button and Search Input on the right */}
                            <div className="flex items-center space-x-2">
                                <button className="bg-gray-700 p-2 rounded-lg flex items-center space-x-2">
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
                                            <path d="M120-240v-80h240v80H120Zm0-200v-80h480v80H120Zm0-200v-80h720v80H120Z"/>
                                        </svg>
                                    </span>
                                    <span>More filters</span>
                                </button>
                                
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="px-4 py-2 border rounded-lg text-black font-thin"
                                />
                                <button className="text-gray-800 font-thin">⌘ K</button>
                            </div>
                        </div>

                        <div className="overflow-x-auto mt-0">
                            <table className="w-full text-sm text-left text-gray-100">
                                <thead className="text-xs uppercase bg-gray-700 text-white font-thin">
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
                                        <tr key={colisItem._id} className="bg-gray-800 hover:bg-gray-600 transition-all font-thin">
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
                                                    className="text-blue-400 hover:text-blue-600 transition-transform transform hover:scale-105 font-thin"
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
                    <div className="bg-white rounded-lg p-6 w-1/3 shadow-lg hover:shadow-xl transition-shadow transform duration-300 font-thin">
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
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 shadow-md hover:shadow-lg transition-transform transform hover:scale-105 font-thin"
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
