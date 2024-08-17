import React from "react";

function Createinfo({ expeditionData, handleChange }) {
  return (
    <div className="grid gap-4 mb-4 sm:grid-cols-2">
      <div>
        <label
          htmlFor="depart"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Départ
        </label>
        <input
          type="text"
          name="depart"
          id="depart"
          value={expeditionData.depart}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          placeholder="Lieu de départ"
          required=""
        />
      </div>
      <div>
        <label
          htmlFor="destination"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Destination
        </label>
        <input
          type="text"
          name="destination"
          id="destination"
          value={expeditionData.destination}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          placeholder="Destination"
          required=""
        />
      </div>
    </div>
  );
}

export default Createinfo;
