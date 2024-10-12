import React, { useState, useEffect } from "react";
import expeditionService from "../../services/expeditionService";  
import Adminsidebar from './Adminsidebar';
import Adminheader from './Adminheader';

function Expeditions() {
    const [expeditions, setExpeditions] = useState([]);
    const [selectedExpedition, setSelectedExpedition] = useState(null);
    const [showModal, setShowModal] = useState(false);



    // Fonction pour ouvrir la modale avec les détails de l'expédition sélectionnée
    const handleViewDetails = (expeditionItem) => {
        setSelectedExpedition(expeditionItem);
        setShowModal(true);  
    };

    // Fonction pour fermer la modale
    const closeModal = () => {
        setShowModal(false);
        setSelectedExpedition(null); 
    };

    return (
        <section className="relative bg-gray-900 text-gray-300 p-12 sm:p-10 min-h-screen flex flex-col font-thin">
            <Adminheader />
            <div className="flex">
                <Adminsidebar />
                <div className="flex-1 mx-auto w-full px-4 lg:px-12 mt-12">
                    <div className="text-center mb-6">
                        <h1 className="text-3xl font-thin text-white">Liste des Expéditions</h1>
                    </div>
                    <div className="bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden ml-64">
                        <div className="flex justify-between items-center bg-gray-100 p-4 border-b-[1px] border-gray-300 font-thin">
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#000000">
                                    <path d="M120-160v-640l664 280h-59q-24 0-45.5 1t-37.5 4L180-710v168l242 62-242 60v167l282-118q-8 17-13.5 39.5T441-295L120-160Zm570 80q-78 0-134-55.5T500-269q0-79 56-135t134-56q78 0 134 56t56 135q0 78-56 133.5T690-80Zm70-86 29-31-82-82v-120h-41v139l94 94ZM180-371v-339 457-118Z"/>
                                </svg>
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
                                    {expeditions.map(expedition => {
                                        const firstCourse = expedition.course_ids?.[0]; // Vérifie si course_ids est disponible
                                        const coursierActuel = firstCourse?.coursier_id ? `${firstCourse.coursier_id.completename}` : 'N/A';

                                        return (
                                            <tr key={expedition._id} className="bg-gray-800 hover:bg-gray-600 transition-all font-thin">
                                                <td className="px-6 py-4">{expedition.expedition_code}</td>
                                                <td className="px-6 py-4">{expedition.colis_id?.desc_depart || 'N/A'}</td>
                                                <td className="px-6 py-4">{expedition.colis_id?.desc_destination || 'N/A'}</td>
                                                <td className="px-6 py-4">{new Date(expedition.date_depart).toLocaleDateString()}</td>
                                                <td className="px-6 py-4">{new Date(expedition.date_arrivee).toLocaleDateString()}</td>
                                                <td className="px-6 py-4">{expedition.colis_id?.numero_colis || 'N/A'}</td>
                                                <td className="px-6 py-4">{expedition.colis_id?.client_id_exp?.completename || 'N/A'}</td>
                                                <td className="px-6 py-4">{expedition.colis_id?.client_id_dest?.completename || 'N/A'}</td>
                                                <td className="px-6 py-4">{coursierActuel}</td>
                                                <td className="px-6 py-4">
                                                    <button
                                                        onClick={() => handleViewDetails(expedition)}
                                                        className="text-blue-400 hover:text-blue-600 transition-transform transform hover:scale-105 font-thin"
                                                    >
                                                        Voir Détail
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {showModal && selectedExpedition && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-1/3 shadow-lg hover:shadow-xl transition-shadow transform duration-300 font-thin">
            {/* Partie supérieure avec les détails du colis */}
            <h2 className="text-xl font-bold mb-4 text-gray-800">Détails de l'Expédition</h2>
            <p className="text-gray-700"><strong>Numéro de Colis :</strong> {selectedExpedition.colis_id?.numero_colis || 'N/A'}</p>
            <p className="text-gray-700"><strong>Description :</strong> {selectedExpedition.colis_id?.description || 'N/A'}</p>
            <p className="text-gray-700"><strong>Taille :</strong> {selectedExpedition.colis_id?.taille || 'N/A'}</p>
            <p className="text-gray-700"><strong>Poids :</strong> {selectedExpedition.colis_id?.poids || 'N/A'} kg</p>
            <p className="text-gray-700"><strong>Particularité :</strong> {selectedExpedition.colis_id?.particularite || 'N/A'}</p>

            {/* Séparation entre les détails du colis et les courses */}
            <h3 className="text-lg font-bold mt-4 text-gray-800">Courses Prévues :</h3>
            
            {/* Contenu des courses prévues */}
            <div
                style={{
                    maxHeight: '250px', // Limite la hauteur visible
                    overflowY: 'scroll', // Permet de scroller verticalement
                    scrollbarWidth: 'none', // Masque la scrollbar sur Firefox
                    msOverflowStyle: 'none', // Masque la scrollbar sur IE et Edge
                }}
                className="pr-2"
            >
                {selectedExpedition.course_ids && selectedExpedition.course_ids.length > 0 ? (
                    selectedExpedition.course_ids.map((course, index) => (
                        <div 
                            key={course._id} 
                            className="mb-8 bg-white p-4 rounded-lg border border-gray-300 transition-shadow duration-300 hover:shadow-lg hover:shadow-blue-500/50" // Blue shadow on hover
                        >
                            {/* Section with dashed line and location icon */}
                            <div className="flex justify-between items-center mb-4">
                                <div className="text-left">
                                    <p className="text-gray-500">Départ</p>
                                    <p className="text-black font-bold">{course.depart || 'N/A'}</p>
                                </div>
                                <div className="flex items-center justify-center">
                                    <div className="flex items-center justify-center">
                                        {/* Dashed line and Location Icon */}
                                        <span className="border-b border-dashed border-gray-500 w-16 mx-2"></span>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                                            <path d="M519-82v-80q42-6 81.5-23t74.5-43l58 58q-47 37-101 59.5T519-82Zm270-146-56-56q26-33 42-72.5t22-83.5h82q-8 62-30.5 115.5T789-228Zm8-292q-6-45-22-84.5T733-676l56-56q38 44 61.5 98T879-520h-82ZM439-82q-153-18-255.5-131T81-480q0-155 102.5-268T439-878v80q-120 17-199 107t-79 211q0 121 79 210.5T439-162v80Zm238-650q-36-27-76-44t-82-22v-80q59 5 113 27.5T733-790l-56 58ZM480-280q-58-49-109-105t-51-131q0-68 46.5-116T480-680q67 0 113.5 48T640-516q0 75-51 131T480-280Zm0-200q18 0 30.5-12.5T523-523q0-17-12.5-30T480-566q-18 0-30.5 13T437-523q0 18 12.5 30.5T480-480Z"/>
                                        </svg>
                                        <span className="border-b border-dashed border-gray-500 w-16 mx-2"></span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-gray-500">Arrivée</p>
                                    <p className="text-black font-bold">{course.arrive || 'N/A'}</p>
                                </div>
                            </div>

                            {/* Separator line between départ - arrivée and coursier - téléphone */}
                            <hr className="my-2 border-blue-700"/>

                            {/* Détails du coursier et téléphone */}
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <p className="text-gray-500">Coursier</p>
                                    <p className="text-black font-bold">{course.coursier_id?.completename || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Téléphone</p>
                                    <p className="text-black font-bold">{course.coursier_id?.tel || 'N/A'}</p>
                                </div>
                            </div>

                            {/* Separator line between coursier - téléphone and véhicule info */}
                            <hr className="my-2 border-blue-700"/>

                            {/* Détails du véhicule */}
                            {course.coursier_id?.vehic_id && (
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-gray-500">Type</p>
                                        <p className="text-black font-bold">{course.coursier_id.vehic_id.type || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Marque</p>
                                        <p className="text-black font-bold">{course.coursier_id.vehic_id.marque || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Immatriculation</p>
                                        <p className="text-black font-bold">{course.coursier_id.vehic_id.immatriculation || 'N/A'}</p>
                                    </div>
                                </div>
                            )}

                        </div>
                    ))
                ) : (
                    <p>Aucune course prévue</p>
                )}
            </div>

            {/* Bouton de fermeture */}
            <div className="mt-6 flex justify-end">
                <button 
                    onClick={closeModal}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 shadow-md hover:shadow-lg transition-transform transform hover:scale-105 font-thin">
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
