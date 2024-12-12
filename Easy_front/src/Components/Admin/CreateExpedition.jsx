import React, { useState } from "react";
import Adminsidebar from "./Adminsidebar";
import Adminheader from "./Adminheader";

function CreateExpedition() {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
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
        return <div>Contenu pour la deuxième étape</div>;
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
