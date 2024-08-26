import React, { useState, useEffect } from "react";
import expeditionService from "../../services/expeditionService";
import Adminsidebar from './Adminsidebar';
import Adminheader from './Adminheader';

function Expeditions() {
    const [expeditions, setExpeditions] = useState([]);

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

    return (
        <section className="relative bg-gray-50 dark:bg-gray-100 p-3 sm:p-5">
            <Adminheader />
            <Adminsidebar />
            <div className="absolute top-0 left-0 mt-4 ml-4 flex items-center">
                <button onClick={() => navigate(-1)} className="text-gray-300 hover:text-white flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#0255CA">
                        <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/>
                    </svg>
                </button>
                <span className="ml-4 text-xl font-semibold text-black">
                    Liste des expéditions
                </span>
            </div>
            <div className="mx-auto max-w-screen-xl px-4 lg:px-12 mt-12">
                <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-4 py-3">Code du Colis</th>
                                    <th scope="col" className="px-4 py-3">Lieu de Départ</th>
                                    <th scope="col" className="px-4 py-3">Lieu d'Arrivée</th>
                                    <th scope="col" className="px-4 py-3">Courses</th>
                                    <th scope="col" className="px-4 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {expeditions.map(expedition => (
                                    <tr key={expedition._id} className="hover:bg-gray-100 dark:hover:bg-gray-600">
                                        <td className="px-4 py-3">{expedition.colis_id}</td>
                                        <td className="px-4 py-3">{expedition.date_depart}</td>
                                        <td className="px-4 py-3">{expedition.date_arrivee}</td>
                                        <td className="px-4 py-3">
                                            {expedition.course_ids.map((course, index) => (
                                                <div key={index}>
                                                    {course.depart} → {course.arrive}
                                                </div>
                                            ))}
                                        </td>
                                        <td className="px-4 py-3">
                                            <button 
                                                onClick={() => navigate(`/expeditions/${expedition._id}`)}
                                                className="text-blue-500 hover:text-blue-700"
                                            >
                                                Détails
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Expeditions;
