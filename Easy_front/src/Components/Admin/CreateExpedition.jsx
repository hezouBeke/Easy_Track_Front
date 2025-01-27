import React, { useState, useEffect } from "react";
import Adminsidebar from "./Adminsidebar";
import Adminheader from "./Adminheader";
import binImage from '../../assets/delete_3694433.png';
import corseajoutImage from '../../assets/new-tab_12180713.png';
import coursierService from "../../services/coursierService";
import colisService from "../../services/colisService";
import clientService from "../../services/clientService";
import expeditionService from "../../services/expeditionService";
import coursesService from "../../services/coursesService";


function CreateExpedition() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCoursier, setSelectedCoursier] = useState("");
  const [coursiers, setCoursiers] = useState([]);
  const [colis, setColis] = useState([]);
  const [clients, setClients] = useState([]);
  const [courses, setCourses] = useState({});
  const [isAdding, setIsAdding] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [estimatedDuration, setEstimatedDuration] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [expandedCourses, setExpandedCourses] = useState({});

  const toggleExpanded = (coursier) => {
    setExpandedCourses((prev) => ({
      ...prev,
      [coursier]: !prev[coursier], // Inverse l'état de la section du coursier
    }));
  };

  const calculateDuration = (start, end) => {
    if (!start || !end) return "";
  
    const startDate = new Date(start); // Doit être au format YYYY-MM-DD, ex: "2024-12-19"
    const endDate = new Date(end);     // ex: "2024-12-25"
  
    // Vérifie si les dates sont valides et si endDate est avant startDate
    if (isNaN(startDate) || isNaN(endDate) || endDate < startDate) {
      return "Dates invalides";
    }
  
    // Calcul de diffDays
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
    // Retourne la durée estimée
    if (diffDays >= 30) {
      const months = Math.floor(diffDays / 30);
      const days = diffDays % 30;
      return `${months} mois ${days} jours`;
    } else {
      return `${diffDays} jours`;
    }
  };
  

  const handleStartDateChange = (e) => {
    const value = e.target.value;
    setStartDate(value);
    setEstimatedDuration(calculateDuration(value, endDate));
  };

  const handleEndDateChange = (e) => {
    const value = e.target.value;
    setEndDate(value);
    setEstimatedDuration(calculateDuration(startDate, value));
  };


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
    if (currentStep === 1) {
      // Valider ici les dates avant de passer à l'étape 2
      if (!startDate || !endDate) {
        setErrorMessage("Veuillez renseigner les dates avant de continuer.");
        setShowErrorMessage(true);
        setTimeout(() => setShowErrorMessage(false), 1000);
        return;
      }
    }
    if (currentStep === 2) {
      // Valider ici qu'il y a au moins une course avant de passer à l'étape 3
      if (Object.keys(courses).length === 0) {
        setErrorMessage("Veuillez ajouter au moins une course avant de continuer.");
        setShowErrorMessage(true);
        setTimeout(() => setShowErrorMessage(false), 1000);
        return;
      }
    }
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };
  

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleCoursierChange = (e) => {
    setSelectedCoursier(e.target.value);  // `e.target.value` est maintenant un _id et non un nom
  };
  

  const handleDeleteCourse = (coursier, index) => {
    setCourses((prevCourses) => {
      const updatedCourses = { ...prevCourses };
      updatedCourses[coursier].splice(index, 1);
      return updatedCourses;
    });
  };


  const handleCreateCourse = async () => {
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
            relais_coursier_id: "",
            client_final_id: "",
            colis_id: "",
            coursier_id: selectedCoursier,
        };

        updatedCourses[selectedCoursier].push(newCourse);

        // Log des courses créées
        console.log("Courses après création:", updatedCourses);
        return updatedCourses;
    });

    setIsAdding(false);
};


const handleSubmit = async () => {
  try {
    // Vérification de base des champs requis
    if (!startDate || !endDate || Object.keys(courses).length === 0) {
      setErrorMessage("Veuillez compléter toutes les informations avant de soumettre.");
      setShowErrorMessage(true);
      setTimeout(() => setShowErrorMessage(false), 1000);
      return;
    }

    // Validation des courses
    Object.values(courses).flat().forEach((course) => {
      const startDate = new Date(course.date_debut);
      const endDate = new Date(course.date_fin);
  
      if (!course.depart || !course.arrive) {
          throw new Error("Les champs 'Départ' et 'Arrivée' sont obligatoires.");
      }
  
      if (isNaN(startDate) || isNaN(endDate) || startDate > endDate) {
          throw new Error("Les dates de début et de fin doivent être valides et cohérentes.");
      }
  
      if (startDate.toDateString() === endDate.toDateString()) {
          const heureRegex = /^([0-1]\d|2[0-3]):([0-5]\d)$/;
          if (!heureRegex.test(course.heure_debut) || !heureRegex.test(course.heure_fin)) {
              throw new Error("Les heures doivent être au format HH:MM.");
          }
  
          const [hdh, hdm] = course.heure_debut.split(':').map(Number);
          const [hfh, hfm] = course.heure_fin.split(':').map(Number);
          const startMinutes = hdh * 60 + hdm;
          const endMinutes = hfh * 60 + hfm;
  
          if (startMinutes > endMinutes) {
              throw new Error("L'heure de début doit être inférieure ou égale à l'heure de fin pour une course d'une journée.");
          }
      }
  });
  

    console.log("Courses avant la soumission :", courses);

    // Création des courses
    const courseCreationResponses = await Promise.all(
      Object.values(courses)
        .flat()
        .map(async (course) => {
          console.log("Création de la course pour :", course);

          const completeCourseData = {
            ...course,
            coursier_id: course.coursier_id || selectedCoursier,
          };

          const response = await coursesService.createCourse(completeCourseData);
          console.log("Réponse pour la création de la course :", response.data);

          if (response.data && Array.isArray(response.data) && response.data.length > 0) {
            return response.data[0];
          } else {
            throw new Error("Erreur lors de la création de la course.");
          }
        })
    );

    console.log("IDs des courses créées :", courseCreationResponses);

    if (courseCreationResponses.length === 0) {
      throw new Error("Aucune course valide n'a été créée.");
    }

    const expeditionData = {
      course_ids: courseCreationResponses,
      date_debut_previsionnel: startDate,
      date_fin_previsionnel: endDate,
    };

    console.log("Données envoyées pour la création de l'expédition :", expeditionData);

    const response = await expeditionService.createExpedition(expeditionData);

    console.log("Réponse de la création de l'expédition :", response);

    if (response.status === 201) {
      console.log("Expédition créée avec succès :", response.data);

      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 1000);

      // Réinitialisation du formulaire
      setCurrentStep(1);
      setStartDate("");
      setEndDate("");
      setEstimatedDuration("");
      setCourses({});
    } else {
      throw new Error("Erreur lors de la création de l'expédition.");
    }
  } catch (error) {
    console.error("Erreur lors de la soumission de l'expédition :", error);

    setErrorMessage(error.message || "Une erreur inconnue est survenue.");
    setShowErrorMessage(true);
    setTimeout(() => setShowErrorMessage(false), 1000);
  }
};



const handleAddCourseForCoursier = (coursier) => {
  setCourses((prevCourses) => {
    const updatedCourses = { ...prevCourses };

    if (!updatedCourses[coursier]) {
      updatedCourses[coursier] = [];
    }

    updatedCourses[coursier].push({
      depart: "", // Lieu de départ
      arrive: "", // Lieu d'arrivée
      date_debut: "", // Date de début
      date_fin: "", // Date de fin
      heure_debut: "", // Heure de début (optionnelle)
      heure_fin: "", // Heure de fin (optionnelle)
      type_course: "delivery", // Type par défaut (modifiable par l'utilisateur)
      relais_coursier_id: "", // ID du coursier relais (nécessaire si type_course = relay)
      client_final_id: "", // ID du client final (nécessaire si type_course = delivery)
      colis_id: "", // ID du colis associé
      coursier_id: coursier, // ID du coursier sélectionné
    });

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
                    value={startDate}
                    onChange={handleStartDateChange}
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
                    value={endDate}
                    onChange={handleEndDateChange}
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
                    value={estimatedDuration}
                    readOnly
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                    placeholder="ex : 2 mois 3 jours ou 15 jours"
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
    <option key={coursier._id} value={coursier._id}> {/* Utilise _id au lieu du nom */}
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
      <div key={coursier} className="mb-6">
        {/* Titre et bouton de dépliage/repliage */}
        <div
  className="flex items-center justify-between bg-gray-200 px-4 py-2 cursor-pointer rounded-lg"
  onClick={() => toggleExpanded(coursier)}
>
  {/* Remplacer l'ID du coursier par son nom complet */}
  <h3 className="font-medium text-blue-600">
    Liste des courses de {coursiers.find(c => c._id === coursier)?.completename || "Coursier inconnu"} :
  </h3>
  <button className="text-blue-600">
    {expandedCourses[coursier] ? "▲" : "▼"}
  </button>
</div>


        {/* Contenu pliable */}
        {expandedCourses[coursier] && (
          <div className="mt-4">
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
    newCourses[coursier][index].relais_coursier_id = e.target.value; // Met à jour avec l'ID du relais
    setCourses(newCourses);
  }}
>
  <option value="">-- Sélectionner un relais --</option>
  {coursiers.map((item) => (
    <option key={item._id} value={item._id}> {/* Utilise l'ID (_id) du coursier relais */}
      {item.completename} {/* Affiche le nom complet du coursier */}
    </option>
  ))}
</select>


                    </div>
                  )}
                  {course.type_course === "delivery" && (
                    <div className="col-span-1">
                    <label>Client final :</label>
                    <select
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 mb-2"
                      value={course.client_final_id}  // Utilise ici l'ID du client
                      onChange={(e) => {
                        const newCourses = { ...courses };
                        newCourses[coursier][index].client_final_id = e.target.value; // Met à jour l'ID du client dans la course
                        setCourses(newCourses); // Mets à jour l'état des courses
                      }}
                    >
                      <option value="">-- Sélectionner un client --</option>
                      {clients.map((client) => (
                        <option key={client._id} value={client._id}> {/* L'ID du client est la valeur sélectionnée */}
                          {client.completename} {/* Affiche le nom du client mais utilise l'ID comme valeur */}
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
                    
                        // Désactive les heures si les dates diffèrent
                        if (new Date(newCourses[coursier][index].date_debut).toDateString() !== new Date(newCourses[coursier][index].date_fin).toDateString()) {
                          newCourses[coursier][index].heure_debut = "";
                          newCourses[coursier][index].heure_fin = "";
                        }
                    
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
                   
                       // Désactive les heures si les dates diffèrent
                       if (new Date(newCourses[coursier][index].date_debut).toDateString() !== new Date(newCourses[coursier][index].date_fin).toDateString()) {
                         newCourses[coursier][index].heure_debut = "";
                         newCourses[coursier][index].heure_fin = "";
                       }
                   
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
  value={course.colis_id} // Utilisation de colis_id
  onChange={(e) => {
    const newCourses = { ...courses };
    newCourses[coursier][index].colis_id = e.target.value; // Mise à jour du colis_id
    setCourses(newCourses);
  }}
>
  <option value="">-- Sélectionner un colis --</option>
  {colis.map((item) => (
    <option key={item._id} value={item._id}> {/* Assurez-vous d'utiliser l'ID (_id) du colis */}
      {item.indent_colis} {/* Affichage de indent_colis comme étiquette */}
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
        )}
      </div>
    );
  }
  return null;
})}
          </div>
        );
      case 3:
        return (
          <div>
          <h1 className="mb-4 text-xl font-thin text-gray-900">
            Validation et Récapitulatif
          </h1>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4 text-gray-900">
              Informations principales :
            </h2>
            <p><strong>Date de début :</strong> {startDate}</p>
            <p><strong>Date de fin :</strong> {endDate}</p>
            <p><strong>Durée estimée :</strong> {estimatedDuration}</p>
            
            <h2 className="text-lg font-semibold mt-6 mb-4 text-gray-900">
              Liste des coursiers et leurs courses :
            </h2>
            {Object.keys(courses).map((coursier) => (
  <div key={coursier} className="mb-6">
    <h3 className="font-medium text-blue-600">Coursier : {coursiers.find(c => c._id === coursier)?.completename || "Coursier inconnu"}</h3>
    {courses[coursier].map((course, index) => (
      <div key={index} className="ml-4 mt-4 bg-white p-4 rounded-lg shadow">
        <p><strong>Départ :</strong> {course.depart || "Non spécifié"}</p>
        <p><strong>Arrivée :</strong> {course.arrive || "Non spécifié"}</p>
        <p><strong>Type de course :</strong> {course.type_course}</p>
        
        {course.type_course === "relay" && (
          <p><strong>Relais Coursier :</strong> {
            coursiers.find(c => c._id === course.relais_coursier_id)?.completename || "Non spécifié"
          }</p>
        )}

        {course.type_course === "delivery" && (
          <p><strong>Client Final :</strong> {
            clients.find(c => c._id === course.client_final_id)?.completename || "Non spécifié"
          }</p>
        )}

        <p><strong>Colis :</strong> {colis.find(item => item._id === course.colis_id)?.indent_colis || "Non spécifié"}</p>
        <p><strong>Date de début :</strong> {course.date_debut || "Non spécifiée"}</p>
        <p><strong>Date de fin :</strong> {course.date_fin || "Non spécifiée"}</p>
        <p><strong>Heure de début :</strong> {course.heure_debut || "Non spécifiée"}</p>
        <p><strong>Heure de fin :</strong> {course.heure_fin || "Non spécifiée"}</p>
      </div>
    ))}
  </div>
))}

          </div>
          <div className="flex justify-end mt-6">
            <button
              onClick={handleSubmit}
              className="px-4 py-2 text-white bg-green-600 rounded-lg"
            >
              Créer l'expédition
            </button>
          </div>
        </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="bg-white  ">
      <Adminheader />
      {showSuccessMessage && (
  <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-lg z-50">
    <div className="flex items-center">
      <svg
        className="w-6 h-6 mr-2 text-green-600"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0
          011.414 0z"
          clipRule="evenodd"
        ></path>
      </svg>
      <p>Expédition créée avec succès !</p>
    </div>
  </div>
)}


{showErrorMessage && (
  <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow-lg z-50">
    <div className="flex items-center">
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EA3323"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
      <p>{errorMessage}</p>
    </div>
  </div>
)}



      <div className="pt-12 mx-auto max-w-7xl lg:pt-10 ml-80">
        
        <Adminsidebar />
        <ol className="items-center w-full space-y-4 sm:flex sm:space-x-8 sm:space-y-0 rtl:space-x-reverse mt-48">
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
  {currentStep !== 3 && ( // N'affiche pas le bouton "Suivant" si c'est la dernière étape
    <button
      type="button"
      onClick={nextStep}
      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg"
    >
      Suivant
    </button>
  )}
</div>

      </div>
    </section>
  );




}

export default CreateExpedition
