import React, { useState, useEffect } from "react";
import expeditionService from "../../services/expeditionService";  // Assurez-vous que ce service existe pour récupérer les expéditions
import Adminsidebar from './Adminsidebar';
import Adminheader from './Adminheader';

function Expeditions() {
    const [expeditions, setExpeditions] = useState([]);
    const [selectedExpedition, setSelectedExpedition] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchExpeditions = async () => {
            try {
                const response = await expeditionService.getAllExpeditions(); // Appel API pour récupérer les expéditions
                setExpeditions(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des expéditions", error);
            }
        };

        fetchExpeditions();
    }, []);

    // Fonction pour ouvrir la modale avec les détails de l'expédition sélectionnée
    const handleViewDetails = (expeditionItem) => {
        setSelectedExpedition(expeditionItem); // Stocker l'expédition sélectionnée
        setShowModal(true);  // Ouvrir la modale
    };

    // Fonction pour fermer la modale
    const closeModal = () => {
        setShowModal(false);
        setSelectedExpedition(null);  // Réinitialiser l'expédition sélectionnée
    };

    return (
        <section className="relative bg-gray-900 text-gray-300 p-12 sm:p-10 min-h-screen flex flex-col font-thin">
            <Adminheader />
            <div className="flex">
                <Adminsidebar />
                <div className="flex-1 mx-auto w-full px-4 lg:px-12 mt-12">
                    {/* Titre de la liste des expéditions */}
                    <div className="text-center mb-6">
                        <h1 className="text-3xl font-thin text-white">Liste des Expéditions</h1>
                    </div>
                    
                    <div className="bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden ml-64">
                        {/* Barre de recherche et filtre */}
                        <div className="flex justify-between items-center bg-gray-100 p-4 border-b-[1px] border-gray-300 font-thin">
                            <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#000000"><path d="M120-160v-640l664 280h-59q-24 0-45.5 1t-37.5 4L180-710v168l242 62-242 60v167l282-118q-8 17-13.5 39.5T441-295L120-160Zm570 80q-78 0-134-55.5T500-269q0-79 56-135t134-56q78 0 134 56t56 135q0 78-56 133.5T690-80Zm70-86 29-31-82-82v-120h-41v139l94 94ZM180-371v-339 457-118Z"/></svg>
                            </div>
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
                                        <th scope="col" className="px-6 py-3 text-left">Order ID</th>
                                        <th scope="col" className="px-6 py-3 text-left">Départ</th>
                                        <th scope="col" className="px-6 py-3 text-left">Destination</th>
                                        <th scope="col" className="px-6 py-3 text-left">Date de Départ</th>
                                        <th scope="col" className="px-6 py-3 text-left">Date d'Arrivée</th>
                                        <th scope="col" className="px-6 py-3 text-left">Numéro de Colis</th>
                                        <th scope="col" className="px-6 py-3 text-left">Expéditeur</th>
                                        <th scope="col" className="px-6 py-3 text-left">Destinataire</th>
                                        <th scope="col" className="px-6 py-3 text-left">Coursier Actuel</th>
                                        <th scope="col" className="px-6 py-3 text-left">Détails</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {expeditions.map(expedition => (
                                        <tr key={expedition._id} className="bg-gray-800 hover:bg-gray-600 transition-all font-thin">
                                            <td className="px-6 py-4">{expedition.expedition_code}</td>
                                            <td className="px-6 py-4">{expedition.lieu_depart}</td>
                                            <td className="px-6 py-4">{expedition.lieu_arrivee}</td>
                                            <td className="px-6 py-4">{expedition.date_depart}</td>
                                            <td className="px-6 py-4">{expedition.date_arrivee}</td>
                                            <td className="px-6 py-4">{expedition.colis_id.numero_colis}</td>
                                            <td className="px-6 py-4">{expedition.colis_id.expéditeur.nom}</td>
                                            <td className="px-6 py-4">{expedition.colis_id.destinataire.nom}</td>
                                            <td className="px-6 py-4">{expedition.coursier_actuel.nom} {expedition.coursier_actuel.prenom}</td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => handleViewDetails(expedition)}
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
            {showModal && selectedExpedition && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-1/3 shadow-lg hover:shadow-xl transition-shadow transform duration-300 font-thin">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">Détails de l'Expédition</h2>
                        <p className="text-gray-700"><strong>Code de l'Expédition :</strong> {selectedExpedition.expedition_code}</p>
                        <p className="text-gray-700"><strong>Numéro de Colis :</strong> {selectedExpedition.colis_id.numero_colis}</p>

                        <h3 className="text-lg font-bold mt-4 text-gray-800">Courses Prévues :</h3>
                        {selectedExpedition.courses.map(course => (
                            <div key={course._id} className="mb-4">
                                <p className="text-gray-700"><strong>Départ :</strong> {course.depart}</p>
                                <p className="text-gray-700"><strong>Arrivée :</strong> {course.arrive}</p>
                                <p className="text-gray-700"><strong>Coursier :</strong> {course.coursier_id.nom} {course.coursier_id.prenom}</p>
                                <p className="text-gray-700"><strong>Véhicule :</strong> {course.coursier_id.vehicule.description}</p>
                            </div>
                        ))}

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

export default Expeditions;
