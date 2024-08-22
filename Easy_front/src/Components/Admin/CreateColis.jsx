import React, { useState, useEffect } from "react";
import clientService from "../../services/clientService";
function CreateColis({ colisData, handleChange, handleAddColis, goToNextStep }) {
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    // Charger la liste des clients lors du montage du composant
    const fetchClients = async () => {
      try {
        const response = await clientService.getAllClients();
        setClients(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des clients", error);
      }
    };

    fetchClients();
  }, []);

  const handleSubmitColis = async (e) => {
    e.preventDefault();
    try {
      await handleAddColis();
      setIsSuccessModalVisible(true);
    } catch (error) {
      console.error("Erreur lors de l'ajout du colis", error);
    }
  };

  const handleNextStep = () => {
    setIsSuccessModalVisible(false);
    goToNextStep(); // Passer à la section suivante
  };

  return (
    <div>
      <form onSubmit={handleSubmitColis} className="grid gap-4 mb-4 sm:grid-cols-2">
        {/* Sélection du client */}
        <div className="sm:col-span-2">
          <label
            htmlFor="client_id"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Sélectionner un client
          </label>
          <select
            name="client_id"
            id="client_id"
            value={colisData.client_id}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            required
          >
            <option value="">Sélectionnez le client</option>
            {clients.map((client) => (
              <option key={client._id} value={client._id}>
                {client.name}
              </option>
            ))}
          </select>
        </div>

        {/* Autres champs du formulaire */}
        <div>
          <label
            htmlFor="desc_depart"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Lieu de départ
          </label>
          <input
            type="text"
            name="desc_depart"
            id="desc_depart"
            value={colisData.desc_depart}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Ville"
            required
          />
        </div>
        <div>
          <label
            htmlFor="desc_destination"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Lieu d'arrivée
          </label>
          <input
            type="text"
            name="desc_destination"
            id="desc_destination"
            value={colisData.desc_destination}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Ville"
            required
          />
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description du colis
          </label>
          <textarea
            id="description"
            name="description"
            value={colisData.description}
            onChange={handleChange}
            rows="3"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Entrez la description du colis"
            required
          ></textarea>
        </div>
        <div>
          <label
            htmlFor="taille"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Taille du colis
          </label>
          <input
            type="number"
            name="taille"
            id="taille"
            value={colisData.taille}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Taille du colis"
            required
          />
        </div>
        <div>
          <label
            htmlFor="poids"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Poids du colis
          </label>
          <input
            type="number"
            name="poids"
            id="poids"
            value={colisData.poids}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Poids du colis en kg"
            required
          />
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="particularite"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Particularités du colis
          </label>
          <select
            name="particularite"
            id="particularite"
            value={colisData.particularite}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            required
          >
            <option value="">Sélectionnez une particularité</option>
            <option value="Fragile">Fragile</option>
            <option value="Dangereux">Dangereux</option>
            <option value="Congelé">Congelé</option>
          </select>
        </div>

        <div className="sm:col-span-2 flex justify-end">
          <button
            type="submit"
            className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Ajouter le colis
          </button>
        </div>
      </form>

      {/* Modal de succès au centre */}
      {isSuccessModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 shadow-lg text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Colis enregistré avec succès
            </h3>
            <button
              onClick={handleNextStep}
              className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Suivant
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateColis;
