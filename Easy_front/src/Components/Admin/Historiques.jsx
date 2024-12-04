import React, { useState, useEffect } from "react";
import Adminheader from "./Adminheader";
import Adminsidebar from "./Adminsidebar";
import expeditionService from "../../services/expeditionService";

const Historiques = () => {
    const [expeditions, setExpeditions] = useState([]);
    const [expandedRow, setExpandedRow] = useState(null);

    // Récupérer les expéditions via le service
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

    // Gestion de l'extension d'une ligne
    const toggleRow = (index) => {
        setExpandedRow(expandedRow === index ? null : index);
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
                                    <th className="py-3 px-4 text-sm font-semibold">Statut</th>
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
                                            <td className="py-3 px-4">{expedition.status || "En cours"}</td>
                                            <td className="py-3 px-4">
                                                {new Date(expedition.date_depart).toLocaleDateString()}
                                            </td>
                                            <td className="py-3 px-4">
                                                {new Date(expedition.date_arrivee).toLocaleDateString()}
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
                                                        <p><strong>Description : </strong>{expedition.colis_id?.description || "N/A"}</p>
                                                        <p>
                                                            <strong>Dimensions : </strong>
                                                            {expedition.colis_id?.taille || "N/A"}
                                                        </p>
                                                        <p><strong>Poids : </strong>{expedition.colis_id?.poids || "N/A"} kg</p>
                                                        <p><strong>Particularités : </strong>{expedition.colis_id?.particularite || "Aucune"}</p>
                                                        <hr className="my-4" />
                                                        <h3 className="text-md font-bold">Clients</h3>
                                                        <p><strong>Expéditeur : </strong>{expedition.colis_id?.client_id_exp?.completename || "N/A"}</p>
                                                        <p><strong>Email : </strong>{expedition.colis_id?.client_id_exp?.email || "N/A"}</p>
                                                        <p><strong>Destinataire : </strong>{expedition.colis_id?.client_id_dest?.completename || "N/A"}</p>
                                                        <p><strong>Email : </strong>{expedition.colis_id?.client_id_dest?.email || "N/A"}</p>
                                                        <hr className="my-4" />
                                                        <h3 className="text-md font-bold">Coursiers et Étapes</h3>
                                                        <ul>
                                                            {expedition.course_ids.map((course, i) => (
                                                                <li key={i} className="mb-2">
                                                                    <p><strong>Départ : </strong>{course.depart || "N/A"}</p>
                                                                    <p><strong>Arrivée : </strong>{course.arrive || "N/A"}</p>
                                                                    <p><strong>Coursier : </strong>
                                                                        {course.coursier_id?.completename || "N/A"} (
                                                                        {course.coursier_id?.tel || "N/A"})
                                                                    </p>
                                                                    <p><strong>Véhicule : </strong>
                                                                        {course.coursier_id?.vehic_id?.type || "N/A"} -{" "}
                                                                        {course.coursier_id?.vehic_id?.immatriculation || "N/A"}
                                                                    </p>
                                                                    <hr className="my-2 border-gray-600" />
                                                                </li>
                                                            ))}
                                                        </ul>
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

export default Historiques;
