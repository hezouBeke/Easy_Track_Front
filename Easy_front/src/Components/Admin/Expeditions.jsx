import React, { useState, useEffect } from "react";
import expeditionService from "../../services/expeditionService";
import Adminsidebar from "./Adminsidebar";
import Adminheader from "./Adminheader";

function Expeditions() {
    const [expeditions, setExpeditions] = useState([]);
    const [selectedExpedition, setSelectedExpedition] = useState(null);
    const [expandedCoursiers, setExpandedCoursiers] = useState({});
    const [showModal, setShowModal] = useState(false);

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

    const openModal = (expedition) => {
        setSelectedExpedition(expedition);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedExpedition(null);
        setExpandedCoursiers({}); // Réinitialise les coursiers dépliés
    };

    const toggleCoursier = (coursierId) => {
        setExpandedCoursiers((prev) => ({
            ...prev,
            [coursierId]: !prev[coursierId],
        }));
    };

    const groupByCoursiers = (courseIds) => {
        const grouped = {};
        courseIds.forEach((course) => {
            const coursierId = course.coursier_id?._id;
            if (!grouped[coursierId]) {
                grouped[coursierId] = {
                    coursier: course.coursier_id,
                    courses: [],
                };
            }
            grouped[coursierId].courses.push(course);
        });
        return Object.values(grouped);
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
                        <div className="overflow-x-auto mt-0">
                            <table className="w-full text-sm text-left text-gray-100">
                                <thead className="text-xs uppercase bg-gray-700 text-white font-thin">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Expédition</th>
                                        <th scope="col" className="px-6 py-3">Départ</th>
                                        <th scope="col" className="px-6 py-3">Arrivée</th>
                                        <th scope="col" className="px-6 py-3">Durée Estimée</th>
                                        <th scope="col" className="px-6 py-3">Détails</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {expeditions.map((expedition) => (
                                        <tr key={expedition._id} className="hover:bg-gray-600">
                                            <td className="px-6 py-4">{expedition.expedition_code}</td>
                                            <td className="px-6 py-4">
                                                {new Date(expedition.date_debut_previsionnel).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4">
                                                {new Date(expedition.date_fin_previsionnel).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4">{expedition.duree_estimee}</td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => openModal(expedition)}
                                                    className="text-blue-500 hover:underline"
                                                >
                                                    Voir Détails
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

            {showModal && selectedExpedition && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg p-6 shadow-xl w-2/3 max-h-screen overflow-y-auto">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">Détails de l'Expédition</h2>
                        <p><strong>Code :</strong> {selectedExpedition.expedition_code}</p>
                        <p><strong>Durée :</strong> {selectedExpedition.duree_estimee}</p>
                        <p><strong>Départ :</strong> {new Date(selectedExpedition.date_debut_previsionnel).toLocaleDateString()}</p>
                        <p><strong>Arrivée :</strong> {new Date(selectedExpedition.date_fin_previsionnel).toLocaleDateString()}</p>

                        <h3 className="text-lg font-bold mt-4 text-gray-800">Coursiers et leurs Courses :</h3>
                        {groupByCoursiers(selectedExpedition.course_ids).map(({ coursier, courses }) => (
                            <div key={coursier?._id || "unknown"} className="mb-4 border border-gray-300 rounded-lg">
                                <div
                                    className="bg-gray-200 p-4 flex justify-between items-center cursor-pointer"
                                    onClick={() => toggleCoursier(coursier?._id)}
                                >
                                    <h4 className="text-gray-800 font-bold">
                                        {coursier?.completename || "Coursier inconnu"}
                                    </h4>
                                    <span>{expandedCoursiers[coursier?._id] ? "−" : "+"}</span>
                                </div>
                                {expandedCoursiers[coursier?._id] && (
                                    <div className="p-4 bg-gray-100">
                                        {courses.map((course) => (
                                            <div key={course._id} className="mb-4 border-b border-gray-300 pb-4">
                                                <p><strong>Départ :</strong> {course.depart}</p>
                                                <p><strong>Arrivée :</strong> {course.arrive}</p>
                                                <p><strong>Type de Course :</strong> {course.type_course}</p>
                                                <h5 className="font-bold mt-2">Colis :</h5>
                                                <p><strong>Numéro :</strong> {course.colis_id?.indent_colis || "N/A"}</p>
                                                <p><strong>Taille :</strong> {course.colis_id?.taille || "N/A"}</p>
                                                <p><strong>Description :</strong> {course.colis_id?.description || "N/A"}</p>
                                                <p><strong>Particularité :</strong> {course.colis_id?.particularite || "N/A"}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}

                        <button
                            onClick={closeModal}
                            className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Fermer
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}

export default Expeditions;
