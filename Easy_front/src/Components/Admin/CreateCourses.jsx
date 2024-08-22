import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";  // Import de l'icône de poubelle

function CreateCourses({ coursesData, setCoursesData, availableCoursiers }) {
  const [selectedCoursier, setSelectedCoursier] = useState("");

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedCourses = [...coursesData];
    updatedCourses[index][name] = value;
    setCoursesData(updatedCourses);
  };

  const handleCoursierSelection = (index, e) => {
    const selectedCoursierId = e.target.value;
    if (selectedCoursierId) {
      const updatedCourses = [...coursesData];
      updatedCourses[index].coursiers.push(selectedCoursierId);
      setCoursesData(updatedCourses);
    }
  };

  const addCourse = () => {
    setCoursesData([...coursesData, { depart: "", arrive: "", date_debut: "", date_fin: "", coursiers: [] }]);
  };

  const removeCourse = (index) => {
    const updatedCourses = coursesData.filter((_, i) => i !== index);
    setCoursesData(updatedCourses);
  };

  return (
    <div>
      {coursesData.map((course, index) => (
        <div key={index} className="mb-6 p-4 border border-gray-700 rounded-lg">
          <div className="grid gap-4 mb-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor={`depart-${index}`}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Départ de la course
              </label>
              <input
                type="text"
                name="depart"
                id={`depart-${index}`}
                value={course.depart}
                onChange={(e) => handleChange(index, e)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Lieu de départ de la course"
                required
              />
            </div>

            <div>
              <label
                htmlFor={`arrive-${index}`}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Arrivée de la course
              </label>
              <input
                type="text"
                name="arrive"
                id={`arrive-${index}`}
                value={course.arrive}
                onChange={(e) => handleChange(index, e)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Lieu d'arrivée de la course"
                required
              />
            </div>

            <div>
              <label
                htmlFor={`date_debut-${index}`}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Date de début
              </label>
              <input
                type="date"
                name="date_debut"
                id={`date_debut-${index}`}
                value={course.date_debut}
                onChange={(e) => handleChange(index, e)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor={`date_fin-${index}`}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Date de fin
              </label>
              <input
                type="date"
                name="date_fin"
                id={`date_fin-${index}`}
                value={course.date_fin}
                onChange={(e) => handleChange(index, e)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                required
              />
            </div>

            <div className="sm:col-span-2 flex justify-between items-center">
              <div className="flex space-x-4 w-full">
                <div className="w-full">
                  <label
                    htmlFor={`coursier-${index}`}
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Sélectionner un coursier
                  </label>
                  <select
                    id={`coursier-${index}`}
                    name="coursier"
                    value={selectedCoursier}
                    onChange={(e) => handleCoursierSelection(index, e)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option value="">Sélectionnez un coursier</option>
                    {availableCoursiers.map((coursier) => (
                      <option key={coursier.id} value={coursier.id}>
                        {coursier.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="button"
                  onClick={addCourse}
                  className="mt-6 text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  Ajouter une nouvelle course
                </button>
              </div>
            </div>

            <div className="sm:col-span-2 mt-4">
              <ul>
                {course.coursiers.map((coursierId, idx) => (
                  <li key={idx} className="text-sm text-gray-600 dark:text-gray-300">
                    {availableCoursiers.find((c) => c.id === coursierId)?.name || coursierId}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {coursesData.length > 1 && (
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => removeCourse(index)}
                className="text-white bg-transparent hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                <FaTrash size={20} color="red" />
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default CreateCourses;
