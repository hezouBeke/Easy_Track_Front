import React, { useState, useEffect } from "react";
import Adminheader from "./Adminheader";
import Adminsidebar from "./Adminsidebar";
import expeditionService from "../../services/expeditionService";

const HistoriqueExpeditions = () => {
    const [expeditions, setExpeditions] = useState([]);
    const [expandedRow, setExpandedRow] = useState(null);

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
                                                                <h4 className="text-sm font-bold mb-2">{coursierName}</h4>
                                                                <ul>
                                                                    {courses.map((course, i) => (
                                                                        <li key={i} className="mb-2">
                                                                            <p><strong>Départ : </strong>{course.depart || "N/A"}</p>
                                                                            <p><strong>Arrivée : </strong>{course.arrive || "N/A"}</p>
                                                                            <p><strong>Type de Course : </strong>{course.type_course || "N/A"}</p>
                                                                        </li>
                                                                    ))}
                                                                </ul>
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
