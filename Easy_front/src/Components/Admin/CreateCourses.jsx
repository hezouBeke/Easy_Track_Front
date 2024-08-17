import React, { useState } from "react";

function CreateCourses({ courseData, handleChange, availableCoursiers, handleAddCoursier, handleCreateCourse }) {
  const [selectedCoursier, setSelectedCoursier] = useState("");

  const handleCoursierSelection = (e) => {
    setSelectedCoursier(e.target.value);
  };

  const addCoursierToCourse = () => {
    if (selectedCoursier) {
      handleAddCoursier(selectedCoursier);
      setSelectedCoursier(""); // Reset selection after adding
    }
  };

  return (
    <div className="grid gap-4 mb-4 sm:grid-cols-2">
      <div>
        <label
          htmlFor="depart"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Départ de la course
        </label>
        <input
          type="text"
          name="depart"
          id="depart"
          value={courseData.depart}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          placeholder="Lieu de départ de la course"
          required=""
        />
      </div>

      <div>
        <label
          htmlFor="arrive"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Arrivée de la course
        </label>
        <input
          type="text"
          name="arrive"
          id="arrive"
          value={courseData.arrive}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          placeholder="Lieu d'arrivée de la course"
          required=""
        />
      </div>

      <div>
        <label
          htmlFor="date_debut"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Date de début
        </label>
        <input
          type="date"
          name="date_debut"
          id="date_debut"
          value={courseData.date_debut}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          required=""
        />
      </div>

      <div>
        <label
          htmlFor="date_fin"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Date de fin
        </label>
        <input
          type="date"
          name="date_fin"
          id="date_fin"
          value={courseData.date_fin}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          required=""
        />
      </div>

      <div>
        <label
          htmlFor="coursier"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Ajouter un coursier
        </label>
        <select
          id="coursier"
          name="coursier"
          value={selectedCoursier}
          onChange={handleCoursierSelection}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        >
          <option value="">Sélectionnez un coursier</option>
          {availableCoursiers.map((coursier) => (
            <option key={coursier.id} value={coursier.id}>
              {coursier.name}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={addCoursierToCourse}
          className="mt-2 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Ajouter Coursier
        </button>
      </div>

      <div className="sm:col-span-2">
        <label
          htmlFor="addedCoursiers"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Coursiers ajoutés
        </label>
        <ul>
          {courseData.coursiers.map((coursierId, index) => (
            <li key={index} className="text-sm text-gray-600 dark:text-gray-300">
              {availableCoursiers.find((c) => c.id === coursierId)?.name || coursierId}
            </li>
          ))}
        </ul>
      </div>

      <div className="sm:col-span-2 flex justify-end">
        <button
          type="button"
          onClick={handleCreateCourse}
          className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Créer la course
        </button>
      </div>
    </div>
  );
}

export default CreateCourses;
