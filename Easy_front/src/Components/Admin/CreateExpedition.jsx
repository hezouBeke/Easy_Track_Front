import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import clientService from "../../services/clientService";
import coursierService from "../../services/coursierService";
import colisService from "../../services/colisService";
import coursesService from "../../services/coursesService";
import expeditionService from "../../services/expeditionService";
import { useNavigate } from "react-router-dom";
import Adminsidebar from './Adminsidebar';
import Adminheader from './Adminheader';
function CreateExpedition() {
  const [step, setStep] = useState(1);
  const [colisData, setColisData] = useState({
    client_id_exp: "",
    client_id_dest: "",
    desc_depart: "",
    desc_destination: "",
    description: "",
    taille: "",
    poids: "",
    particularite: "",
  });
  const [expeditionData, setExpeditionData] = useState({
    date_depart: "",
    date_arrivee: "",
  });

  const [coursesData, setCoursesData] = useState([
    { depart: "", arrive: "", date_debut: "", date_fin: "", heure_debut: "", heure_fin: "", coursiers: [] },
  ]);

  const [clients, setClients] = useState([]);
  const [coursiers, setCoursiers] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await clientService.getAllClients();
        setClients(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des clients", error);
      }
    };

    const fetchCoursiers = async () => {
      try {
        const response = await coursierService.getAllCoursiers();
        setCoursiers(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des coursiers", error);
      }
    };

    fetchClients();
    fetchCoursiers();
  }, []);

  const handleColisChange = (e) => {
    const { name, value } = e.target;
    setColisData({ ...colisData, [name]: value });
  };

  const handleExpeditionChange = (e) => {
    const { name, value } = e.target;
    setExpeditionData({ ...expeditionData, [name]: value });
  };

  const handleCourseChange = (index, e) => {
    const { name, value } = e.target;
    const updatedCourses = [...coursesData];
    updatedCourses[index][name] = value;
    setCoursesData(updatedCourses);
  };

  const handleCoursierSelection = (index, e) => {
    const selectedCoursierId = e.target.value;
    if (selectedCoursierId) {
      const updatedCourses = [...coursesData];
      updatedCourses[index].coursiers = [selectedCoursierId];
      setCoursesData(updatedCourses);
    }
  };

  const addCourse = () => {
    setCoursesData([
      ...coursesData,
      { depart: "", arrive: "", date_debut: "", date_fin: "", heure_debut: "", heure_fin: "", coursiers: [] },
    ]);
  };

  const removeCourse = (index) => {
    const updatedCourses = coursesData.filter((_, i) => i !== index);
    setCoursesData(updatedCourses);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // 1. Créer le colis
      const colisResponse = await colisService.createColis(colisData);
      const colisId = colisResponse._id;
  
      if (!colisId) {
        throw new Error("Erreur : l'ID du colis n'a pas été récupéré.");
      }
  
      // 2. Créer les courses
      const courseDataToSubmit = coursesData.map((course) => {
        if (!course.coursiers[0]) {
          throw new Error("Erreur : le coursier n'a pas été sélectionné pour la course.");
        }
  
        if (
          expeditionData.date_depart === expeditionData.date_arrivee &&
          (!course.heure_debut || !course.heure_fin)
        ) {
          throw new Error(
            "Erreur : les heures de début et de fin doivent être renseignées pour une expédition d'un jour."
          );
        }
  
        return {
          depart: course.depart,
          arrive: course.arrive,
          date_debut: course.date_debut,
          date_fin: course.date_fin,
          heure_debut: course.heure_debut,
          heure_fin: course.heure_fin,
          coursier_id: course.coursiers[0],
          colis_id: colisId,
        };
      });
  
      const courseResponse = await coursesService.createCourse(courseDataToSubmit);
  
      if (!courseResponse?.data || !Array.isArray(courseResponse.data)) {
        throw new Error("Erreur : la réponse des courses est invalide.");
      }
  
      const courseIds = courseResponse.data.map((course) => {
        if (!course._id) {
          throw new Error("Erreur : un ID de course est manquant.");
        }
        return course._id;
      });
  
      if (!courseIds.length) {
        throw new Error("Erreur : les IDs des courses créées n'ont pas été récupérés.");
      }
  
      // 3. Créer l'expédition
      const expeditionDataToSubmit = {
        colis_id: colisId,
        course_ids: courseIds,
        date_depart: expeditionData.date_depart,
        date_arrivee: expeditionData.date_arrivee,
        courses: coursesData.map((course) => ({
          heure_debut: course.heure_debut,
          heure_fin: course.heure_fin,
        })),
      };
  
      await expeditionService.createExpedition(expeditionDataToSubmit);
  
      // Afficher la modale de succès
      setShowSuccessModal(true);
    } catch (error) {
      console.error(
        "Erreur lors de la création de l'expédition ou des courses:",
        error.response ? error.response.data : error.message
      );
      alert(
        "Erreur lors de la création de l'expédition ou des courses : " +
          (error.response ? error.response.data : error.message)
      );
    }
  };
  
  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return "Renseigner les informations sur le colis";
      case 2:
        return "Renseigner les informations sur la course";
      default:
        return "";
    }
  };

  return (
    <section className="h-screen flex items-center justify-center bg-gray-100 py-40">
    <Adminheader />
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl w-full max-h-[70vh] overflow-y-auto">
      <Adminsidebar />
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold">{getStepTitle()}</h2>
        </div>

        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`w-8 h-8 flex items-center justify-center rounded-full ${step >= 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500'}`}>1</div>
            <div className={`w-20 h-1 ${step >= 2 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
            <div className={`w-8 h-8 flex items-center justify-center rounded-full ${step >= 2 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500'}`}>2</div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div>
              {/* Section pour les informations du Colis */}
              <div className="grid gap-4 mb-4 sm:grid-cols-2 md:grid-cols-4">
                <div className="sm:col-span-1">
                  <select
                    name="client_id_exp"
                    id="client_id_exp"
                    value={colisData.client_id_exp}
                    onChange={handleColisChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                  >
                    <option value="">Sélectionnez l'expéditeur</option>
                    {clients.map((client) => (
                      <option key={client._id} value={client._id}>
                        {client.completename}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-1">
                  <select
                    name="client_id_dest"
                    id="client_id_dest"
                    value={colisData.client_id_dest}
                    onChange={handleColisChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                  >
                    <option value="">Sélectionnez le destinataire</option>
                    {clients.map((client) => (
                      <option key={client._id} value={client._id}>
                        {client.completename}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-1">
                  <input
                    type="text"
                    name="desc_depart"
                    id="desc_depart"
                    value={colisData.desc_depart}
                    onChange={handleColisChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Lieu de départ"
                    required
                  />
                </div>
                <div className="sm:col-span-1">
                  <input
                    type="text"
                    name="desc_destination"
                    id="desc_destination"
                    value={colisData.desc_destination}
                    onChange={handleColisChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Lieu d'arrivée"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Description du colis
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={colisData.description}
                  onChange={handleColisChange}
                  rows="3"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Entrez la description du colis"
                  required
                ></textarea>
              </div>

              <div className="grid gap-4 mb-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="taille"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Taille du colis
                  </label>
                  <input
                    type="text"
                    name="taille"
                    id="taille"
                    value={colisData.taille}
                    onChange={handleColisChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Dimensions (LxWxH)"
                    required
                  />
                </div>

                <div>
  <label
    htmlFor="poids"
    className="block mb-2 text-sm font-medium text-gray-900"
  >
    Poids du colis
  </label>
  <input
    type="number"
    name="poids"
    id="poids"
    value={colisData.poids}
    onChange={handleColisChange}
    onInput={(e) => e.target.value = Math.max(0, e.target.value)}
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
    placeholder="Poids du colis en kg"
    required
  />
</div>

              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="particularite"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Particularités du colis
                </label>
                <select
                  name="particularite"
                  id="particularite"
                  value={colisData.particularite}
                  onChange={handleColisChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                >
                  <option value="">Sélectionnez une particularité</option>
                  <option value="Fragile">Fragile</option>
                  <option value="Dangereux">Dangereux</option>
                  <option value="Congelé">Congelé</option>
                </select>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  type="button"
                  onClick={nextStep}
                  className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Suivant
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
               {/* Section pour les informations de l'Expédition */}
               <div className="grid gap-4 mb-4 sm:grid-cols-2">
                {/* Champs de saisie pour l'expédition */}
                 
                <div>
                  <label
                    htmlFor="date_depart"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Date de départ de l'expédition
                  </label>
                  <input
                    type="date"
                    name="date_depart"
                    id="date_depart"
                    value={expeditionData.date_depart}
                    onChange={handleExpeditionChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="date_arrivee"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Date d'arrivée de l'expédition
                  </label>
                  <input
                    type="date"
                    name="date_arrivee"
                    id="date_arrivee"
                    value={expeditionData.date_arrivee}
                    onChange={handleExpeditionChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                  />
                </div>
              </div>
              {/* Section pour les informations des Courses */}
              {coursesData.map((course, index) => (
                <div key={index} className="mb-6 p-4 border border-gray-200 rounded-lg">
                  <div className="grid gap-4 mb-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor={`depart-${index}`}
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Départ de la course
                      </label>
                      <input
                        type="text"
                        name="depart"
                        id={`depart-${index}`}
                        value={course.depart}
                        onChange={(e) => handleCourseChange(index, e)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="Lieu de départ"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor={`arrive-${index}`}
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Arrivée de la course
                      </label>
                      <input
                        type="text"
                        name="arrive"
                        id={`arrive-${index}`}
                        value={course.arrive}
                        onChange={(e) => handleCourseChange(index, e)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="Lieu d'arrivée"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor={`date_debut-${index}`}
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Date de début
                      </label>
                      <input
                        type="date"
                        name="date_debut"
                        id={`date_debut-${index}`}
                        value={course.date_debut}
                        onChange={(e) => handleCourseChange(index, e)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor={`date_fin-${index}`}
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Date de fin
                      </label>
                      <input
                        type="date"
                        name="date_fin"
                        id={`date_fin-${index}`}
                        value={course.date_fin}
                        onChange={(e) => handleCourseChange(index, e)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        required
                      />
                    </div>
                     {/* Champs d'Heure de début et de fin */}
          {expeditionData.date_depart === expeditionData.date_arrivee && (
            <>
              <div>
                <label htmlFor={`heure_debut-${index}`} className="block mb-2 text-sm font-medium text-gray-900">
                  Heure de début
                </label>
                <input
                  type="time"
                  name="heure_debut"
                  id={`heure_debut-${index}`}
                  value={course.heure_debut}
                  onChange={(e) => handleCourseChange(index, e)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                />
              </div>

              <div>
                <label htmlFor={`heure_fin-${index}`} className="block mb-2 text-sm font-medium text-gray-900">
                  Heure de fin
                </label>
                <input
                  type="time"
                  name="heure_fin"
                  id={`heure_fin-${index}`}
                  value={course.heure_fin}
                  onChange={(e) => handleCourseChange(index, e)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                />
              </div>
            </>
          )}
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="w-full">
                      <label
                        htmlFor={`coursier-${index}`}
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Sélectionner un coursier
                      </label>
                      <select
                        id={`coursier-${index}`}
                        name="coursier"
                        value={course.coursiers[0] || ""}
                        onChange={(e) => handleCoursierSelection(index, e)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      >
                        <option value="">Sélectionnez un coursier</option>
                        {coursiers.map((coursier) => (
                          <option key={coursier._id} value={coursier._id}>
                            {coursier.completename}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {coursesData.length > 1 && (
                    <div className="flex justify-center mt-4">
                      <button
                        type="button"
                        onClick={() => removeCourse(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTrash size={20} />
                      </button>
                    </div>
                  )}

                </div>
              ))}

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={prevStep}
                  className="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Précédent
                </button>
                <button
                  type="button"
                  onClick={addCourse}
                  className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Ajouter une nouvelle course
                </button>
                <button
                  type="submit"
                  className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Créer l'expédition
                </button>
              </div>
            </div>
          )}
        </form>
        {showSuccessModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 w-1/3 shadow-lg hover:shadow-xl transition-shadow transform duration-300 font-thin">
      <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">Expédition créée avec succès</h2>
      <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 p-2 flex items-center justify-center mx-auto mb-3.5">
        <svg aria-hidden="true" className="w-8 h-8 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
        </svg>
      </div>
      <p className="mb-4 text-lg font-semibold text-gray-900 dark:text-white text-center">Votre expédition a été créée avec succès.</p>
      <div className="w-full flex justify-center">
        <button
          onClick={() => {
            setShowSuccessModal(false);
            navigate("/dashboard/admin/expeditions");
          }}
          className="py-2 px-4 text-sm font-medium text-center text-white rounded-lg bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:focus:ring-primary-900"
        >
          Continuer
        </button>
      </div>
    </div>
  </div>
)}
      </div>
    </section>
  );
}

export default CreateExpedition;
