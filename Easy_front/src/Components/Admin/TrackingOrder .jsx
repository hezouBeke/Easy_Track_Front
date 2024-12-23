import React, { useState, useEffect } from "react";
import expeditionService from "../../services/expeditionService";
import deliveryImage from '../../assets/receiving.png';
import receivingImage from '../../assets/delivery.png';
import depImage from '../../assets/dep.png'; 
import Coliseul from '../../assets/onecolis.png'; 
import Coliseul2 from '../../assets/colisLivres.png'; 
import 'flowbite'
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
            status: "Pending", // Default status for each course
          })),
        }));
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Error fetching expeditions", error);
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

  // Group courses by colis_id (package)
  const groupedByColis = filteredCourses.reduce((acc, course) => {
    const colisId = course.colis_id?.indent_colis;
    if (!acc[colisId]) {
      acc[colisId] = [];
    }
    acc[colisId].push(course);
    return acc;
  }, {});

  return (
    <div className="p-2 bg-white rounded-lg shadow-lg w-full max-w-full lg:max-w-[1400px] mt-[-10px] ml-12">
    {/* Selection and Search */}
    <form className="flex items-center space-x-4 p-1">
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
  
      {/* Search */}
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
  
    {/* Separator */}
    <div className="border-t border-gray-300 my-4"></div>
{/* Display package details */}

{Object.keys(groupedByColis).map((colisId, colisIndex) => (
  <div key={colisId} className="ml-16">
    {/* Package Header */}
    <div className="flex justify-center mb-4 space-x-4">
      <span className="text-black font-medium text-md">
        <strong>Numéro du colis :</strong> {colisId}
      </span>
      {/* Expéditeur */}
      {groupedByColis[colisId][0].colis_id?.client_id_exp && (
        <div className="text-black font-medium text-md">
          <strong>Expéditeur :</strong>{" "}
          {groupedByColis[colisId][0].colis_id.client_id_exp.completename || "N/A"}
        </div>
      )}
      {/* Destinataire */}
      {groupedByColis[colisId][0].colis_id?.client_id_dest && (
        <div className="text-black font-medium text-md">
          <strong>Destinataire :</strong>{" "}
          {groupedByColis[colisId][0].colis_id.client_id_dest.completename || "N/A"}
        </div>
      )}
    </div>

    {/* Package Courses */}
    <ol className="relative border-s border-gray-200 dark:border-gray-700">
  {groupedByColis[colisId].map((course, index) => {
    // Vérifier si c'est un colis avec une seule course de type "delivery"
    const isSingleDelivery =
      groupedByColis[colisId].length === 1 && course.type_course === "delivery";

    return (
      <li
        key={index}
        className={`mb-10 ms-6 ${isSingleDelivery ? "flex flex-col items-start" : ""}`}
      >
        {/* Icon */}
        <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full -start-4 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
          <img
            src={
              isSingleDelivery && index === 0
                ? Coliseul // Icône pour le départ d'un colis avec une seule livraison
                : index === 0
                ? depImage // Icône pour le tout premier relais
                : course.type_course === "relay"
                ? receivingImage
                : deliveryImage
            }
            alt={course.type_course}
            className="w-4 h-4"
          />
        </span>

        {/* Title and Badge */}
        <div className="mb-1 relative">
          <h3 className="text-md font-medium text-gray-900 dark:text-white">
            {isSingleDelivery && index === 0
              ? "Lieu de départ" // Texte spécifique pour le départ
              : course.type_course === "relay"
              ? "Relais"
              : "Livraison"}
          </h3>
          {!isSingleDelivery && !(index === 0 && course.type_course === "relay") && (
            <span
              className={`absolute top-[3px] ml-2 bg-${
                course.type_course === "relay" ? "blue" : "green"
              }-100 text-${
                course.type_course === "relay" ? "blue" : "green"
              }-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-${
                course.type_course === "relay" ? "blue" : "green"
              }-900 dark:text-${course.type_course === "relay" ? "blue" : "green"}-300`}
            >
              {course.type_course === "relay" ? "Relay" : "Delivery"}
            </span>
          )}
        </div>

        {/* Details */}
        <time className="block mb-2 text-sm font-medium leading-none text-gray-800 dark:text-gray-800">
          {isSingleDelivery && index === 0
            ? `Lieu de départ : ${course.depart || "N/A"}` // Lieu de départ pour une seule livraison
            : course.type_course === "relay"
            ? `Lieu de départ : ${course.depart || "N/A"} - Lieu d'arrivée : ${
                course.arrive || "N/A"
              }`
            : `Arrivée : ${course.arrive || "N/A"}`}
        </time>
        {course.coursier_id && (
          <>
            <p className="text-sm font-medium text-gray-800 dark:text-gray-800">
              <strong>Coursier :</strong> {course.coursier_id.completename || "N/A"} (
              {course.coursier_id.tel || "N/A"})
            </p>
            {course.coursier_id.vehic_id && (
              <>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-800">
                  <strong>Type de véhicule :</strong> {course.coursier_id.vehic_id.type || "N/A"}
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-800">
                  <strong>Immatriculation :</strong> {course.coursier_id.vehic_id.immatriculation || "N/A"}
                </p>
              </>
            )}
          </>
        )}
        {/* Ajouter le nom du client final pour les courses de type "delivery" */}
        {course.type_course === "delivery" && (
          <p className="text-sm font-medium text-gray-800 dark:text-gray-800">
            <strong>Client final :</strong> {course.client_final_id.completename || "N/A"}
          </p>
        )}
      </li>
    );
  })}

  {/* Ajouter l'icône et les détails du lieu d'arrivée pour une seule livraison */}
  {groupedByColis[colisId].length === 1 &&
    groupedByColis[colisId][0].type_course === "delivery" && (
      <li className="mb-10 ms-6 flex flex-col items-start">
        {/* Icon for Arrival */}
        <span className="absolute flex items-center justify-center w-8 h-8 bg-green-100 rounded-full -start-4 ring-8 ring-white dark:ring-gray-900 dark:bg-green-900">
          <img
            src={Coliseul2} // Icône pour l'arrivée
            alt="Lieu de livraison"
            className="w-4 h-4"
          />
        </span>

        {/* Badge and Title */}
        <div className="mb-1 relative">
          <h3 className="text-md font-medium text-gray-900 dark:text-white">
            Lieu de livraison
          </h3>
          <span
            className="absolute top-[3px] ml-2 bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
          >
            Delivery
          </span>
        </div>

        {/* Details */}
        <time className="block mb-2 text-sm font-medium leading-none text-gray-800 dark:text-gray-800">
          {`Lieu de livraison : ${groupedByColis[colisId][0].arrive || "N/A"}`}
        </time>
      </li>
    )}
</ol>


    {/* Separator Line */}
    {colisIndex < Object.keys(groupedByColis).length - 1 && (
      <hr className="my-5 border-gray-400" />
    )}
  </div>
))}








  </div>
  
  
  );
};

export default TrackingOrder;
