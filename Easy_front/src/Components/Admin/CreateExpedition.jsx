import React, { useState } from "react";
import Adminsidebar from "./Adminsidebar";
import Adminheader from "./Adminheader";

function CreateExpedition() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCoursier, setSelectedCoursier] = useState(null);
  const [courses, setCourses] = useState([]);

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleCoursierChange = (e) => {
    setSelectedCoursier(e.target.value);
  };

  const handleCreateCourse = () => {
    // Ajouter une nouvelle course au tableau des courses
    setCourses([
      ...courses,
      {
        coursier: selectedCoursier,
        depart: "",
        arrive: "",
        date_debut: "",
        date_fin: "",
        heure_debut: "",
        heure_fin: "",
        type_course: "delivery",
        colis: "",
      },
    ]);
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
    {/* Champ de sélection du coursier avec largeur réduite */}
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
        value={selectedCoursier || ""}
        required
      >
        <option value="">-- Choisir un coursier --</option>
        <option value="coursier1">Coursier 1</option>
        <option value="coursier2">Coursier 2</option>
        <option value="coursier3">Coursier 3</option>
      </select>
    </div>

    {/* Bouton aligné à droite avec un léger ajustement pour l'aligner verticalement */}
    <div className="mt-6">
      <button
        onClick={handleCreateCourse}
        className="px-4 py-2 text-white bg-blue-600 rounded-lg"
      >
        Créer une nouvelle course
      </button>
    </div>
  </div>

  {courses.length > 0 && (
    <div>
      <h3 className="font-medium">Courses du coursier :</h3>
      {courses.map((course, index) => (
        <div key={index} className="bg-gray-100 p-4 rounded-lg mb-4">
          <p><strong>Coursier :</strong> {course.coursier}</p>

          {/* Utilisation de la grille pour disposer les champs côte à côte */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>Départ :</label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 mb-2"
                value={course.depart}
                placeholder="Départ"
              />
            </div>
            <div>
              <label>Arrivée :</label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 mb-2"
                value={course.arrive}
                placeholder="Arrivée"
              />
            </div>
            <div>
              <label>Date de début :</label>
              <input
                type="date"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 mb-2"
                value={course.date_debut}
              />
            </div>
            <div>
              <label>Date de fin :</label>
              <input
                type="date"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 mb-2"
                value={course.date_fin}
              />
            </div>
            <div>
              <label>Heure de début :</label>
              <input
                type="time"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 mb-2"
                value={course.heure_debut}
              />
            </div>
            <div>
              <label>Heure de fin :</label>
              <input
                type="time"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 mb-2"
                value={course.heure_fin}
              />
            </div>
            <div className="col-span-2">
              <label>Colis :</label>
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 mb-2"
                value={course.colis}
              >
                <option value="">-- Sélectionner un colis --</option>
                <option value="colis1">Colis 1</option>
                <option value="colis2">Colis 2</option>
              </select>
            </div>
          </div>
        </div>
      ))}
    </div>
  )}
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
      <div className="pt-12 mx-auto max-w-3xl lg:pt-16">
        <Adminsidebar />
        {/* Stepper */}
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

        {/* Contenu de l'étape */}
        <div className="mt-10">{renderStepContent()}</div>

        {/* Boutons de navigation */}
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

export default CreateExpedition;
