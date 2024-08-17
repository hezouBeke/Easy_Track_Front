import React, { useState } from "react";
import Createinfo from "./Createinfo";
import CreateColis from "./CreateColis";
import CreateCourses from "./CreateCourses";

function CreateExpedition({ isModalOpen, handleCloseModal }) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const [courseData, setCourseData] = useState({
    depart: "",
    arrive: "",
    date_debut: "",
    date_fin: "",
    coursiers: [],
  });

  const handleChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  const handleAddCoursier = (coursierId) => {
    setCourseData((prevData) => ({
      ...prevData,
      coursiers: [...prevData.coursiers, coursierId],
    }));
  };

  const handleCreateCourse = () => {
    console.log("Course created with data:", courseData);
    handleCloseModal();
  };

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const stepComponents = [
    <Createinfo expeditionData={courseData} handleChange={handleChange} />,
    <CreateColis colisData={courseData} handleChange={handleChange} />,
    <CreateCourses
      courseData={courseData}
      handleChange={handleChange}
      availableCoursiers={[]}
      handleAddCoursier={handleAddCoursier}
      handleCreateCourse={handleCreateCourse}
    />,
  ];

  return (
    <div className={`fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center ${isModalOpen ? "" : "hidden"}`}>
      <div className="bg-white rounded-lg p-8 w-full max-w-lg dark:bg-gray-800 dark:border-gray-700">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Nouvelle expédition</h3>
        </div>
        <div className="mb-4">
          {/* Barre de progression des étapes */}
          <div className="flex justify-between mb-6">
            {Array.from({ length: totalSteps }, (_, index) => (
              <div key={index} className="w-full flex items-center">
                <div className={`rounded-full h-10 w-10 flex items-center justify-center ${index + 1 === currentStep ? "bg-primary-600 text-white" : "bg-gray-300 text-gray-600 dark:bg-gray-700 dark:text-white"}`}>
                  {index + 1}
                </div>
                {index < totalSteps - 1 && <div className="flex-1 border-t-4 border-gray-300 dark:border-gray-700"></div>}
              </div>
            ))}
          </div>
        </div>
        {/* Contenu du formulaire selon l'étape */}
        {stepComponents[currentStep - 1]}
        {/* Boutons de navigation */}
        <div className="flex justify-between mt-4">
          {currentStep > 1 && (
            <button
              onClick={prevStep}
              className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Précédent
            </button>
          )}
          {currentStep < totalSteps ? (
            <button
              onClick={nextStep}
              className="ml-auto text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Suivant
            </button>
          ) : (
            <button
              onClick={handleCreateCourse}
              className="ml-auto text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Terminer
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateExpedition;
