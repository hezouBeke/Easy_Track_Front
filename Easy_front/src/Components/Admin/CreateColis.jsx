import React from "react";

function CreateColis({ colisData, handleChange, handleAddColis }) {
  const handleSubmitColis = (e) => {
    e.preventDefault();
    handleAddColis();
  };

  return (
    <div>
      <form onSubmit={handleSubmitColis} className="grid gap-4 mb-4 sm:grid-cols-2">
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
            type="text"
            name="taille"
            id="taille"
            value={colisData.taille}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Taille du colis (ex: Medium, Large)"
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
          <input
            type="text"
            name="particularite"
            id="particularite"
            value={colisData.particularite}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Entrez les particularités du colis"
          />
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
    </div>
  );
}

export default CreateColis;
