import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import clientService from "../../services/clientService";
import coursierService from "../../services/coursierService"; // Import du service des coursiers
import expeditionService from "../../services/expeditionService"; // Import du service des expéditions
import { useNavigate } from "react-router-dom";

function CreateExpedition() {
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

  const [coursesData, setCoursesData] = useState([
    { depart: "", arrive: "", date_debut: "", date_fin: "", coursiers: [] },
  ]);

  const [clients, setClients] = useState([]);
  const [coursiers, setCoursiers] = useState([]);
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
      updatedCourses[index].coursiers = [selectedCoursierId]; // Remplace le coursier sélectionné
      setCoursesData(updatedCourses);
    }
  };

  const addCourse = () => {
    setCoursesData([
      ...coursesData,
      { depart: "", arrive: "", date_debut: "", date_fin: "", coursiers: [] },
    ]);
  };

  const removeCourse = (index) => {
    const updatedCourses = coursesData.filter((_, i) => i !== index);
    setCoursesData(updatedCourses);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const expeditionData = {
      colis_id: colisData.client_id_exp,
      course_ids: coursesData.map((course) => ({
        depart: course.depart,
        arrive: course.arrive,
        date_debut: course.date_debut,
        date_fin: course.date_fin,
        coursiers: course.coursiers,
      })),
      date_depart: coursesData[0].date_debut,
      date_arrivee: coursesData[coursesData.length - 1].date_fin,
    };
    try {
      await expeditionService.createExpedition(expeditionData);
      navigate("/dashboard/admin");
    } catch (error) {
      console.error("Erreur lors de la création de l'expédition", error);
    }
  };

  return (
    <section className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl w-full max-h-[95vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-blue-600">
              Informations sur le colis
            </h3>
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
          </div>

          <hr className="my-8 border-gray-300" />

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-blue-600">
            Création de courses
            </h3>
            {coursesData.map((course, index) => (
              <div
                key={index}
                className="mb-6 p-4 border border-gray-200 rounded-lg"
              >
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
          </div>

          <div className="flex justify-between mt-6">
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
        </form>
      </div>
    </section>
  );
}

export default CreateExpedition;
