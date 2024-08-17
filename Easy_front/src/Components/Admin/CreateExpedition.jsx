import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Createinfo from "./Createinfo";
import CreateColis from "./CreateColis";
import CreateCourses from "./CreateCourses";

function CreateExpedition() {
  const [currentStep, setCurrentStep] = useState(1);
  const [courseData, setCourseData] = useState({
    depart: "",
    arrive: "",
    date_debut: "",
    date_fin: "",
    coursiers: [],
  });

  const navigate = useNavigate();

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
    navigate('/dashboard/admin'); // Redirige vers le tableau de bord admin après création
  };

  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 relative">
      {/* Flèche de retour et titre */}
      <div className="absolute top-0 left-0 mt-4 ml-4 flex items-center">
        <button onClick={() => navigate(-1)} className="text-gray-300 hover:text-white flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#0255CA"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>
        </button>
        <span className="ml-4 text-xl font-semibold text-black">
          Création d'une expédition
        </span>
      </div>

      <div className="bg-gray-800 shadow-lg rounded-lg p-8 max-w-xl w-full mt-16">
        <div className="mb-6">
          <div className="flex items-center justify-center space-x-12"> {/* Espacement augmenté */}
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`h-10 w-10 flex items-center justify-center rounded-full ${
                    currentStep >= step ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
                  }`}
                >
                  {step}
                </div>
                {step < 3 && (
                  <div className="w-16 h-1 bg-gray-300 mx-2"> {/* Largeur augmentée */}
                    <div
                      className={`h-full ${
                        currentStep > step ? "bg-blue-500" : ""
                      }`}
                    ></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {currentStep === 1 && (
          <Createinfo
            expeditionData={courseData}
            handleChange={handleChange}
          />
        )}
        {currentStep === 2 && (
          <CreateColis
            colisData={courseData}
            handleChange={handleChange}
          />
        )}
        {currentStep === 3 && (
          <CreateCourses
            courseData={courseData}
            handleChange={handleChange}
            availableCoursiers={[]} // Exemple de données, remplacer par des données réelles
            handleAddCoursier={handleAddCoursier}
            handleCreateCourse={handleCreateCourse}
          />
        )}

        <div className="flex justify-between mt-6">
          {currentStep > 1 && (
            <button
              onClick={prevStep}
              className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Précédent
            </button>
          )}
          {currentStep < 3 && (
            <button
              onClick={nextStep}
              className="ml-auto text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Suivant
            </button>
          )}
          {currentStep === 3 && (
            <button
              onClick={handleCreateCourse}
              className="ml-auto text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Créer la course
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateExpedition;
