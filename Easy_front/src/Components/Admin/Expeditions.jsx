import React, { useState, useEffect } from "react";
import expeditionService from "../../services/expeditionService";
import Adminsidebar from "./Adminsidebar";
import Adminheader from "./Adminheader";
import PdfDownload from "./PdfDownload"; // Import du composant PdfDownload

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
    setExpandedCoursiers({}); // Réinitialiser les dépliants
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
            <div className="flex justify-between items-center bg-gray-100 p-4 border-b-[1px] border-gray-300 font-thin">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="48px"
                  viewBox="0 -960 960 960"
                  width="48px"
                  fill="#000000"
                >
                  <path d="M120-160v-640l664 280h-59q-24 0-45.5 1t-37.5 4L180-710v168l242 62-242 60v167l282-118q-8 17-13.5 39.5T441-295L120-160Zm570 80q-78 0-134-55.5T500-269q0-79 56-135t134-56q78 0 134 56t56 135q0 78-56 133.5T690-80Zm70-86 29-31-82-82v-120h-41v139l94 94ZM180-371v-339 457-118Z" />
                </svg>
              </div>
              <div className="flex items-center space-x-2">
                <button className="bg-gray-700 p-2 rounded-lg flex items-center space-x-2">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#FFFFFF"
                    >
                      <path d="M120-240v-80h240v80H120Zm0-200v-80h480v80H120Zm0-200v-80h720v80H120Z" />
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
                    <th scope="col" className="px-6 py-3 text-left">Expédition</th>
                    <th scope="col" className="px-6 py-3 text-left">Départ</th>
                    <th scope="col" className="px-6 py-3 text-left">Arrivée</th>
                    <th scope="col" className="px-6 py-3 text-left">Durée Estimée</th>
                    <th scope="col" className="px-6 py-3 text-left">Détails</th>
                    <th scope="col" className="px-6 py-3 text-left">Télécharger PDF</th>
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
                      <td className="px-6 py-4">
                        <PdfDownload expedition={expedition} />
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
            <h2 className="text-xl font-bold mb-4 text-red-800">Détails de l'Expédition</h2>
            <div className="space-y-2">
              <p className="text-gray-700 "><strong>ID Expédition:</strong> {selectedExpedition.expedition_code}</p>
              <p className="text-gray-700"><strong>Durée prévue expédition :</strong> {selectedExpedition.duree_estimee}</p>
              <p className="text-gray-700"><strong>Départ Prévisionnel :</strong> {new Date(selectedExpedition.date_debut_previsionnel).toLocaleDateString()}</p>
              <p className="text-gray-700"><strong>Arrivée Prévisionnel :</strong> {new Date(selectedExpedition.date_fin_previsionnel).toLocaleDateString()}</p>
            </div>

            <h3 className="text-lg font-bold mt-6 text-red-800">Coursiers et  Courses assigneés :</h3>
            <div className="space-y-4">
              {groupByCoursiers(selectedExpedition.course_ids).map(({ coursier, courses }) => (
                <div key={coursier?._id || "unknown"} className="border border-gray-300 rounded-lg">
                  <div
                    className="bg-gray-100 p-4 flex justify-between items-center cursor-pointer hover:bg-blue-400 transition-colors"
                    onClick={() => toggleCoursier(coursier?._id)}
                  >
                    <h4 className="text-gray-900 font-bold">
                      {coursier?.completename || "Coursier inconnu"}
                    </h4>
                    <button
                      className="text-lg font-bold text-gray-600 hover:text-gray-800"
                      aria-label="Toggle courses"
                    >
                      {expandedCoursiers[coursier?._id] ? "−" : "+"}
                    </button>
                  </div>
                  {expandedCoursiers[coursier?._id] && (
                    <div className="p-4 bg-gray-50">
                      {courses.map((course, index) => (
                        <div key={course._id} className="mb-4 border-b last:border-b-0 pb-2 last:pb-0">
                          <h5 className="font-bold text-red-800 mb-2">
                            Course {index + 1}
                          </h5>
                          <p className="text-gray-700"><strong>Départ :</strong> {course.depart}</p>
                          <p className="text-gray-700"><strong>Arrivée :</strong> {course.arrive}</p>
                          <p className="text-gray-700"><strong>Type de Course :</strong> {course.type_course}</p>
                          
                          {/* Affichage du client relais ou du coursier relais en fonction du type de course */}
                          {course.type_course === "relay" ? (
                              <p className="text-gray-700"><strong>Coursier relais :</strong> {course.relais_coursier_id?.completename || "N/A"}</p>
                          ) : (
                              <p className="text-gray-700"><strong>Client final :</strong> {course.client_final_id?.completename || "N/A"}</p>
                          )}

                          <h6 className="font-bold mt-2 text-gray-800">Colis :</h6>
                          <p className="text-gray-700"><strong>Numéro :</strong> {course.colis_id?.indent_colis || "N/A"}</p>
                          <p className="text-gray-700"><strong>Taille :</strong> {course.colis_id?.taille || "N/A"}</p>
                          <p className="text-gray-700"><strong>Description :</strong> {course.colis_id?.description || "N/A"}</p>
                          <p className="text-gray-700"><strong>Particularité :</strong> {course.colis_id?.particularite || "N/A"}</p>
                          <p className="text-gray-700"><strong>Poids :</strong> {course.colis_id?.poids || "N/A"} kg</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={closeModal}
              className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
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
