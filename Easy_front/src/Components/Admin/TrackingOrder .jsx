import React, { useState, useEffect } from "react";
import expeditionService from "../../services/expeditionService";
import deliveryImage from '../../assets/receiving.png';
import receivingImage from '../../assets/delivery.png';
const TrackingOrder = () => {
  const [orders, setOrders] = useState([]);
  const [selectedExpedition, setSelectedExpedition] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    const fetchExpeditions = async () => {
      try {
        const response = await expeditionService.getAllExpeditions();
        const fetchedOrders = response.data.map((order) => ({
          ...order,
          course_ids: order.course_ids.map((course) => ({
            ...course,
            status: "Pending", // Statut par défaut pour chaque course
          })),
        }));
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Erreur lors de la récupération des expéditions", error);
      }
    };
    fetchExpeditions();
  }, []);

  useEffect(() => {
    if (selectedExpedition) {
      const expedition = orders.find(
        (order) => order.expedition_code === selectedExpedition
      );
      if (expedition) {
        const filtered = expedition.course_ids.filter((course) =>
          course.colis_id?.indent_colis
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase())
        );
        setFilteredCourses(filtered);
      }
    } else {
      setFilteredCourses([]);
    }
  }, [selectedExpedition, searchQuery, orders]);

  const getStatusClass = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Shipping":
        return "bg-blue-100 text-blue-700";
      default:
        return "";
    }
  };

  return (
    <div className="p-2 bg-white rounded-lg shadow-lg w-full max-w-full lg:max-w-[1440px] mt-[-20px] ml-6">
    {/* Champ de sélection et de recherche */}
    <form className="flex items-center space-x-4 p-4">
      {/* Sélecteur d'expédition */}
      <div className="relative">
        <label htmlFor="expedition-select" className="sr-only">
          Sélectionner une expédition
        </label>
        <select
          id="expedition-select"
          className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
          value={selectedExpedition}
          onChange={(e) => setSelectedExpedition(e.target.value)}
        >
          <option value="">Toutes les expéditions</option>
          {orders.map((order) => (
            <option key={order.expedition_code} value={order.expedition_code}>
              {order.expedition_code}
            </option>
          ))}
        </select>
      </div>
  
      {/* Champ de recherche */}
      <div className="relative w-60 ml-auto">
        <input
          type="search"
          id="search-colis"
          className="p-2 text-sm bg-gray-50 border rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full"
          placeholder="Rechercher un colis..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          type="submit"
          className="absolute inset-y-0 right-0 p-2 bg-blue-700 text-white rounded-e-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
        >
          <svg
            className="w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </button>
      </div>
    </form>
  
    {/* Ligne séparatrice */}
    <div className="border-t border-gray-300 my-4"></div>
  
    {/* Affichage du numéro du colis centré au-dessus de l'itinéraire */}
    {filteredCourses.length > 0 && (
      <div className="text-center mb-4">
        <span className="text-black font-thin text-md">
          Numéro du colis : {filteredCourses[0].colis_id?.indent_colis || "N/A"}
        </span>
      </div>
    )}
  
    {/* Affichage des étapes avec la barre de progression */}
    <div className="overflow-x-auto mt-1">
    <ol className="items-center flex space-x-6">
  {filteredCourses.map((course, index) => (
    <li key={index} className="relative mb-6 sm:mb-0">
      <div className="flex items-center">
        {/* Cercle ajusté */}
        <div className="z-10 flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full ring-0 ring-transparent dark:bg-blue-900 sm:ring-8 dark:ring-transparent shrink-0">
          {/* Utilisation des variables d'image importées */}
          <img
            src={course.type_course === "relay" ? receivingImage : deliveryImage}
            alt={course.type_course === "relay" ? "Relay" : "Delivery"}
            className="w-6 h-6 object-cover"
          />
        </div>
        {/* Barre de progression entre les cercles */}
        {index < filteredCourses.length - 1 && (
          <div className="w-full bg-gray-200 h-2.5 mx-2 rounded-full">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${(index + 1) / filteredCourses.length * 100}%` }}
            ></div>
          </div>
        )}
      </div>
      <div className="mt-3 sm:pe-8">
        {/* Type de course (Relay/Delivery) */}
        <div className="mb-2">
          <span
            className={`bg-${course.type_course === "relay" ? "blue" : "green"}-100 text-${course.type_course === "relay" ? "blue" : "green"}-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-${course.type_course === "relay" ? "blue" : "green"}-900 dark:text-${course.type_course === "relay" ? "blue" : "green"}-300`}
          >
            {course.type_course === "relay" ? "Relay" : "Delivery"}
          </span>
        </div>

        {/* Détails supplémentaires */}
        <h3 className="text-xs font-thin text-black">
          Coursier : {course.coursier_id?.completename || "N/A"}
        </h3>

        {course.relais_id && (
          <h3 className="text-xs font-thin text-black">
            Relais : {course.relais_id?.completename || "N/A"}
          </h3>
        )}

        {course.client_final_id && (
          <h3 className="text-xs font-thin text-black">
            Client final : {course.client_final_id?.completename || "N/A"}
          </h3>
        )}

        <p className="text-xs font-thin text-black">
          Départ: {course.depart || "N/A"} - Arrivée: {course.arrive || "N/A"}
        </p>
      </div>
    </li>
  ))}
</ol>
    </div>
  </div>
  
  

  
  );
};

export default TrackingOrder;
