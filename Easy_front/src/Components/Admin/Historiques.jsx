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
                        <span className="inline-block bg-blue-600 p-2 rounded-lg mr-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24px"
                                viewBox="0 -960 960 960"
                                width="24px"
                                fill="#FFFFFF"
                            >
                                <path d="M480-120q-138 0-240.5-91.5T122-440h82q14 104 92.5 172T480-200q117 0 198.5-81.5T760-480q0-117-81.5-198.5T480-760q-69 0-129 32t-101 88h110v80H120v-240h80v94q51-64 124.5-99T480-840q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-120Zm112-192L440-464v-216h80v184l128 128-56 56Z" />
                            </svg>
                        </span>
                        <h1 className="text-2xl font-bold">Historique des expéditions</h1>
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
                                                <td colSpan="5" className="bg-gray-00">
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
                                                        <h3 className="text-md font-bold text-center">Courses par Coursiers</h3>

                                                        {groupByCoursiers(expedition.course_ids).map(([coursierName, courses]) => (
                                                            <div key={coursierName} className="mb-8">
                                                                <div
                                                                    className="flex justify-between items-center cursor-pointer mb-5"
                                                                    onClick={() => toggleCoursier(coursierName)}
                                                                >
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
                                                                    <ol className="relative border-s border-gray-200 dark:border-gray-700 ml-4">
                                                                        {courses.map((course, i) => (
                                                                            <li key={i} className="mb-10 ms-8">
                                                                                <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z"/></svg>
                                                                                </span>
                                                                                <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                                                                                    Course {i+1}
                                                                                    {course.type_course === "relay" && (
                                                                                        <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ms-3">
                                                                                            Relay
                                                                                        </span>
                                                                                    )}
                                                                                    {course.type_course === "delivery" && (
        <span className="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 ms-3">
            Delivery
        </span>
    )}
                                                                                </h3>
                                                                                <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                                                                                    Départ : {course.depart || "N/A"}
                                                                                </time>
                                                                                <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                                                                                    Arrivée : {course.arrive || "N/A"}
                                                                                </time>
                                                                                <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                    Heure Début : {course.heure_debut || "N/A"}
                </time>
                <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                    Heure Fin : {course.heure_fin || "N/A"}
                </time>
                                                                                <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                                                                                    Type de Course : {course.type_course || "N/A"}
                                                                                </p>
                                                                                {course.type_course === "relay" ? (
                                                                                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                                                                                        Coursier Relai : {course.relais_coursier_id?.completename || "N/A"}
                                                                                    </p>
                                                                                ) : (
                                                                                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                                                                                        Client Final : {course.client_final_id?.completename || "N/A"}
                                                                                    </p>
                                                                                )}
                                                                               <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
    ID colis : {course.colis_id?.indent_colis || "N/A"}
</p>

                                                                            </li>
                                                                        ))}
                                                                    </ol>
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
