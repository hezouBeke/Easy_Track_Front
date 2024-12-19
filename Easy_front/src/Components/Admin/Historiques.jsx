import React, { useState, useEffect } from "react";
import Adminheader from "./Adminheader";
import Adminsidebar from "./Adminsidebar";
import expeditionService from "../../services/expeditionService";

const HistoriqueExpeditions = () => {
    const [expeditions, setExpeditions] = useState([]);
    const [expandedRow, setExpandedRow] = useState(null);
    const [expandedCoursiers, setExpandedCoursiers] = useState({});

    // Fonction pour récupérer toutes les expéditions
    const fetchExpeditions = async () => {
        try {
            const response = await expeditionService.getAllExpeditions();
            setExpeditions(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des expéditions:", error);
        }
    };

    useEffect(() => {
        fetchExpeditions();
    }, []);

    // Fonction pour gérer l'affichage des détails d'une ligne
    const toggleRow = (index) => {
        setExpandedRow(expandedRow === index ? null : index);
    };

    // Fonction pour plier ou déplier les courses d'un coursier
    const toggleCoursier = (coursierName) => {
        setExpandedCoursiers((prev) => ({
            ...prev,
            [coursierName]: !prev[coursierName],
        }));
    };

    // Fonction pour regrouper les courses par coursiers
    const groupByCoursiers = (courses) => {
        const grouped = {};
        courses.forEach((course) => {
            const coursierName = course.coursier_id?.completename || "Coursier inconnu";
            if (!grouped[coursierName]) {
                grouped[coursierName] = [];
            }
            grouped[coursierName].push(course);
        });
        return Object.entries(grouped); // Renvoie un tableau [coursierName, courses[]]
    };

    return (
        <section className="flex flex-col bg-gray-900 text-gray-200 min-h-screen ml-64 top-36">
            <Adminheader />
            <div className="flex flex-grow">
                <Adminsidebar />
                <div className="flex flex-col w-full px-6 py-28">
                    <div className="flex items-center mb-6">
                        <h1 className="text-2xl font-bold">Historique des Expéditions</h1>
                    </div>
                    <div className="overflow-x-auto bg-gray-800 shadow-lg rounded-lg">
                        <table className="min-w-full table-auto text-left text-gray-200">
                            <thead className="bg-gray-700">
                                <tr>
                                    <th className="py-3 px-4 text-sm font-semibold">Code Expédition</th>
                                    <th className="py-3 px-4 text-sm font-semibold">Durée Estimée</th>
                                    <th className="py-3 px-4 text-sm font-semibold">Date de Départ</th>
                                    <th className="py-3 px-4 text-sm font-semibold">Date de Livraison Prévue</th>
                                    <th className="py-3 px-4 text-sm font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {expeditions.map((expedition, index) => (
                                    <React.Fragment key={index}>
                                        <tr
                                            className="border-b border-gray-700 hover:bg-gray-600 cursor-pointer"
                                            onClick={() => toggleRow(index)}
                                        >
                                            <td className="py-3 px-4">{expedition.expedition_code}</td>
                                            <td className="py-3 px-4">{expedition.duree_estimee}</td>
                                            <td className="py-3 px-4">
                                                {new Date(expedition.date_debut_previsionnel).toLocaleDateString()}
                                            </td>
                                            <td className="py-3 px-4">
                                                {new Date(expedition.date_fin_previsionnel).toLocaleDateString()}
                                            </td>
                                            <td className="py-3 px-4 text-blue-400">
                                                {expandedRow === index ? "Réduire" : "Voir Détails"}
                                            </td>
                                        </tr>
                                        {expandedRow === index && (
                                            <tr>
                                                <td colSpan="5" className="bg-gray-700">
                                                    <div className="p-4">
                                                        <h2 className="text-lg font-bold mb-4">Détails de l'expédition</h2>
                                                        <p>
                                                            <strong>Code : </strong>{expedition.expedition_code}
                                                        </p>
                                                        <p>
                                                            <strong>Durée Estimée : </strong>{expedition.duree_estimee}
                                                        </p>
                                                        <p>
                                                            <strong>Date de Départ : </strong>{new Date(expedition.date_debut_previsionnel).toLocaleDateString()}
                                                        </p>
                                                        <p>
                                                            <strong>Date de Livraison Prévue : </strong>{new Date(expedition.date_fin_previsionnel).toLocaleDateString()}
                                                        </p>
                                                        <hr className="my-4" />
                                                        <h3 className="text-md font-bold">Courses par Coursiers</h3>
                                                        {groupByCoursiers(expedition.course_ids).map(([coursierName, courses]) => (
                                                            <div key={coursierName} className="mb-4">
                                                                <div className="flex justify-between items-center cursor-pointer mb-2" onClick={() => toggleCoursier(coursierName)}>
                                                                    <h4 className="text-sm font-bold">{coursierName}</h4>
                                                                    <button className="text-gray-400 hover:text-white">
                                                                        {expandedCoursiers[coursierName] ? (
                                                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
                                                                                <path d="M480-120 300-300l58-58 122 122 122-122 58 58-180 180ZM358-598l-58-58 180-180 180 180-58 58-122-122-122 122Z" />
                                                                            </svg>
                                                                        ) : (
                                                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
                                                                                <path d="m356-160-56-56 180-180 180 180-56 56-124-124-124 124Zm124-404L300-744l56-56 124 124 124-124 56 56-180 180Z" />
                                                                            </svg>
                                                                        )}
                                                                    </button>
                                                                </div>
                                                                {expandedCoursiers[coursierName] && (
                                                                    <ul>
                                                                        {courses.map((course, i) => (
                                                                            <li key={i} className="mb-2">
                                                                                <p><strong>Départ : </strong>{course.depart || "N/A"}</p>
                                                                                <p><strong>Arrivée : </strong>{course.arrive || "N/A"}</p>
                                                                                <p><strong>Type de Course : </strong>{course.type_course || "N/A"}</p>
                                                                                {course.type_course === "relay" ? (
                                                                                    <p><strong>Coursier Relai : </strong>{course.relais_coursier_id?.completename || "N/A"}</p>
                                                                                ) : (
                                                                                    <p><strong>Client Final : </strong>{course.client_final_id?.completename || "N/A"}</p>
                                                                                )}
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                )}
                                                                <hr className="my-2 border-gray-600" />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HistoriqueExpeditions;
