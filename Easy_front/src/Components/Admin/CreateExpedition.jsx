import React, { useState, useEffect } from "react";
import Adminsidebar from "./Adminsidebar";
import Adminheader from "./Adminheader";
import binImage from '../../assets/delete_3694433.png';
import corseajoutImage from '../../assets/new-tab_12180713.png';
import coursierService from "../../services/coursierService";
import colisService from "../../services/colisService";
import clientService from "../../services/clientService";

function CreateExpedition() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCoursier, setSelectedCoursier] = useState("");
  const [coursiers, setCoursiers] = useState([]);
  const [colis, setColis] = useState([]);
  const [clients, setClients] = useState([]);
  const [courses, setCourses] = useState({});
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    // Charger les coursiers au chargement du composant
    coursierService.getAllCoursiers()
      .then((response) => {
        setCoursiers(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des coursiers :", error);
      });
      

    // Charger les colis au chargement du composant
    colisService.getAllColis()
      .then((response) => {
        setColis(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des colis :", error);
      });

      clientService.getAllClients()
      .then((response) => setClients(response.data))
      .catch((error) => console.error("Erreur lors de la récupération des clients :", error));
  }, []);

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleCoursierChange = (e) => {
    setSelectedCoursier(e.target.value);
  };

  const handleAddCourseForCoursier = (coursier) => {
    setCourses((prevCourses) => {
      const updatedCourses = { ...prevCourses };

      if (!updatedCourses[coursier]) {
        updatedCourses[coursier] = [];
      }

      updatedCourses[coursier].push({
        depart: "",
        arrive: "",
        date_debut: "",
        date_fin: "",
        heure_debut: "",
        heure_fin: "",
        type_course: "delivery",
        relais_coursier_id: "",
        client_final_id: "",
        colis: "",
      });

      return updatedCourses;
    });
  };

  const handleCreateCourse = () => {
    if (!selectedCoursier || isAdding) return;

    setIsAdding(true);

    setCourses((prevCourses) => {
      const updatedCourses = { ...prevCourses };

      if (!updatedCourses[selectedCoursier]) {
        updatedCourses[selectedCoursier] = [];
      }

      const newCourse = {
        depart: "",
        arrive: "",
        date_debut: "",
        date_fin: "",
        heure_debut: "",
        heure_fin: "",
        type_course: "delivery",
        colis: "",
      };

      const isDuplicate = updatedCourses[selectedCoursier].some((course) =>
        Object.entries(newCourse).every(
          ([key, value]) => course[key] === value
        )
      );

      if (!isDuplicate) {
        updatedCourses[selectedCoursier].push(newCourse);
      }

      return updatedCourses;
    });

    setIsAdding(false);
  };

  const handleDeleteCourse = (coursier, index) => {
    setCourses((prevCourses) => {
      const updatedCourses = { ...prevCourses };
      updatedCourses[coursier].splice(index, 1);
      return updatedCourses;
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h1 className="mb-4 text-xl font-thin text-gray-900">
              Création d'une nouvelle expédition
            </h1>
            <form action="#">
              <div className="grid gap-9 sm:grid-cols-2 sm:gap-6">
                <div className="w-full">
                  <label
                    htmlFor="start-date"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Date de début prévue
                  </label>
                  <input
                    type="date"
                    name="start-date"
                    id="start-date"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                    required
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="end-date"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Date de fin prévue
                  </label>
                  <input
                    type="date"
                    name="end-date"
                    id="end-date"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="estimated-duration"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Durée estimée
                  </label>
                  <input
                    type="text"
                    name="estimated-duration"
                    id="estimated-duration"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                    placeholder="ex : 2 mois 3 jours ou 15 jours"
                    required
                  />
                </div>
              </div>
            </form>
          </div>
        );
      case 2:
        return (
          <div>
            <div className="mb-4 flex items-center">
              <div className="flex-1 mr-4">
                <label
                  htmlFor="coursier"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Sélectionner un coursier
                </label>
                <select
                  id="coursier"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  onChange={handleCoursierChange}
                  value={selectedCoursier}
                  required
                >
                  <option value="">-- Choisir un coursier --</option>
                  {coursiers.map((coursier) => (
                    <option key={coursier.id} value={coursier.id}>
                      {coursier.completename}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleCreateCourse}
                  disabled={isAdding}
                  className={`px-4 py-2 text-white bg-blue-600 rounded-lg ${isAdding ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Créer une nouvelle course
                </button>
              </div>
            </div>

            {Object.keys(courses).map((coursier) => {
              if (courses[coursier].length > 0) {
                return (
                  <div key={coursier}>
                    <h3 className="font-medium text-red-600 ">Liste des courses  {coursier} :</h3>
                    {courses[coursier].map((course, index) => (
                      <div key={index} className="bg-gray-100 p-4 rounded-lg mb-4">
                        <div className="grid grid-cols-4 gap-6">
                        <div className="col-span-1">
                          <label>Type de course :</label>
                          <select
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                            value={course.type_course}
                            onChange={(e) => {
                              const newCourses = { ...courses };
                              newCourses[coursier][index].type_course = e.target.value;
                              setCourses(newCourses);
                            }}
                          >
                            <option value="delivery">Livraison</option>
                            <option value="relay">Relais</option>
                          </select>
                        </div>
                        {course.type_course === "relay" && (
                          <div className="col-span-1">
                            <label>Coursier relais :</label>
                            <select
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                              value={course.relais_coursier_id}
                              onChange={(e) => {
                                const newCourses = { ...courses };
                                newCourses[coursier][index].relais_coursier_id =
                                  e.target.value;
                                setCourses(newCourses);
                              }}
                            >
                              <option value="">-- Sélectionner un relais --</option>
                              {coursiers.map((item) => (
                                <option key={item.id} value={item.id}>
                                  {item.completename}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}
                        {course.type_course === "delivery" && (
                          <div className="col-span-1">
                            <label>Client final :</label>
                            <select
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                              value={course.client_final_id}
                              onChange={(e) => {
                                const newCourses = { ...courses };
                                newCourses[coursier][index].client_final_id =
                                  e.target.value;
                                setCourses(newCourses);
                              }}
                            >
                              <option value="">-- Sélectionner un client --</option>
                              {clients.map((client) => (
                                <option key={client.id} value={client.id}>
                                  {client.completename}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}
                      </div>
                        <div className="grid grid-cols-4 gap-6">
                          <div className="col-span-1">
                            <label>Départ :</label>
                            <input
                              type="text"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 mb-2"
                              value={course.depart}
                              placeholder="Départ"
                              onChange={(e) => {
                                const newCourses = { ...courses };
                                newCourses[coursier][index].depart = e.target.value;
                                setCourses(newCourses);
                              }}
                            />
                          </div>
                          <div className="col-span-1">
                            <label>Arrivée :</label>
                            <input
                              type="text"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 mb-2"
                              value={course.arrive}
                              placeholder="Arrivée"
                              onChange={(e) => {
                                const newCourses = { ...courses };
                                newCourses[coursier][index].arrive = e.target.value;
                                setCourses(newCourses);
                              }}
                            />
                          </div>
                          <div className="col-span-1">
                            <label>Date de début :</label>
                            <input
                              type="date"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 mb-2"
                              value={course.date_debut}
                              onChange={(e) => {
                                const newCourses = { ...courses };
                                newCourses[coursier][index].date_debut = e.target.value;
                                setCourses(newCourses);
                              }}
                            />
                          </div>
                          <div className="col-span-1">
                            <label>Date de fin :</label>
                            <input
                              type="date"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 mb-2"
                              value={course.date_fin}
                              onChange={(e) => {
                                const newCourses = { ...courses };
                                newCourses[coursier][index].date_fin = e.target.value;
                                setCourses(newCourses);
                              }}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-4 gap-6 mt-4">
                          <div className="col-span-1">
                            <label>Heure de début :</label>
                            <input
                              type="time"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 mb-2"
                              value={course.heure_debut}
                              onChange={(e) => {
                                const newCourses = { ...courses };
                                newCourses[coursier][index].heure_debut = e.target.value;
                                setCourses(newCourses);
                              }}
                            />
                          </div>
                          <div className="col-span-1">
                            <label>Heure de fin :</label>
                            <input
                              type="time"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 mb-2"
                              value={course.heure_fin}
                              onChange={(e) => {
                                const newCourses = { ...courses };
                                newCourses[coursier][index].heure_fin = e.target.value;
                                setCourses(newCourses);
                              }}
                            />
                          </div>
                          <div className="col-span-2">
                            <label>Colis :</label>
                            <select
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 mb-2"
                              value={course.colis}
                              onChange={(e) => {
                                const newCourses = { ...courses };
                                newCourses[coursier][index].colis = e.target.value;
                                setCourses(newCourses);
                              }}
                            >
                              <option value="">-- Sélectionner un colis --</option>
                              {colis.map((item) => (
                                <option key={item.id} value={item.id}>
                                  {item.indent_colis}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="flex justify-center space-x-4 mt-6">
                          <img
                            src={binImage}
                            alt="Poubelle"
                            onClick={() => handleDeleteCourse(coursier, index)}
                            className="cursor-pointer w-8 h-8"
                          />
                           <img
                            src={corseajoutImage}
                            alt="Ajouter une course"
                            onClick={() => handleAddCourseForCoursier(coursier)}
                            className="cursor-pointer w-8 h-8"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                );
              }
              return null;
            })}
          </div>
        );
      case 3:
        return <div>Contenu pour la troisième étape</div>;
      default:
        return null;
    }
  };

  return (
    <section className="bg-white">
      <Adminheader />
      <div className="pt-12 mx-auto max-w-7xl lg:pt-10 ml-80">
        <Adminsidebar />
        <ol className="items-center w-full space-y-4 sm:flex sm:space-x-8 sm:space-y-0 rtl:space-x-reverse mt-24">
          <li
            className={`flex items-center space-x-2.5 rtl:space-x-reverse ${
              currentStep === 1 ? "text-blue-600" : "text-gray-500"
            }`}
          >
            <span
              className={`flex items-center justify-center w-8 h-8 border rounded-full shrink-0 ${
                currentStep === 1
                  ? "border-blue-600"
                  : "border-gray-500 dark:border-gray-400"
              }`}
            >
              1
            </span>
            <span>
              <h3 className="font-medium leading-tight">Informations</h3>
              <p className="text-sm">Details expédition</p>
            </span>
          </li>
          <li
            className={`flex items-center space-x-2.5 rtl:space-x-reverse ${
              currentStep === 2 ? "text-blue-600" : "text-gray-500"
            }`}
          >
            <span
              className={`flex items-center justify-center w-8 h-8 border rounded-full shrink-0 ${
                currentStep === 2
                  ? "border-blue-600"
                  : "border-gray-500 dark:border-gray-400"
              }`}
            >
              2
            </span>
            <span>
              <h3 className="font-medium leading-tight">Détails</h3>
              <p className="text-sm">Création de courses</p>
            </span>
          </li>
          <li
            className={`flex items-center space-x-2.5 rtl:space-x-reverse ${
              currentStep === 3 ? "text-blue-600" : "text-gray-500"
            }`}
          >
            <span
              className={`flex items-center justify-center w-8 h-8 border rounded-full shrink-0 ${
                currentStep === 3
                  ? "border-blue-600"
                  : "border-gray-500 dark:border-gray-400"
              }`}
            >
              3
            </span>
            <span>
              <h3 className="font-medium leading-tight">Validation</h3>
              <p className="text-sm">Recapitulatif et validation</p>
            </span>
          </li>
        </ol>

        <div className="mt-10">{renderStepContent()}</div>

        <div className="mt-6 flex justify-between">
          <button
            type="button"
            onClick={prevStep}
            className="px-4 py-2 text-sm font-medium text-gray-900 bg-gray-200 rounded-lg"
            disabled={currentStep === 1}
          >
            Précédent
          </button>
          <button
            type="button"
            onClick={nextStep}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg"
            disabled={currentStep === 3}
          >
            Suivant
          </button>
        </div>
      </div>
    </section>
  );
}

export default CreateExpedition
