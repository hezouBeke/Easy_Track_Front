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
      {Object.keys(groupedByColis).map((colisId) => (
        <div key={colisId}>
          <div className="flex justify-center mb-4 space-x-4">
            <span className="text-black font-thin text-md">
              <strong>Numéro du colis : </strong>
              {colisId}
            </span>

            {/* Display sender */}
            {groupedByColis[colisId][0].colis_id?.client_id_exp && (
              <div className="text-black font-thin text-md">
                <strong>Expéditeur :</strong>{" "}
                {groupedByColis[colisId][0].colis_id.client_id_exp.completename ||
                  "N/A"}
              </div>
            )}

            {/* Display recipient */}
            {groupedByColis[colisId][0].colis_id?.client_id_dest && (
              <div className="text-black font-thin text-md">
                <strong>Destinataire :</strong>{" "}
                {groupedByColis[colisId][0].colis_id.client_id_dest.completename ||
                  "N/A"}
              </div>
            )}
          </div>

          {/* Display each course for the package */}
          <div className="overflow-x-auto mt-1 ml-8">
            <ol className="items-center flex space-x-2">
              {groupedByColis[colisId].map((course, index) => (
                <li key={index} className="relative mb-6 sm:mb-5">
                  <div className="flex items-center">
                    {/* Circle adjusted */}
                    <div className="z-10 flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full ring-0 ring-transparent dark:bg-blue-950 sm:ring-8 dark:ring-transparent shrink-0">
                      <img
                        src={course.type_course === "relay" ? receivingImage : deliveryImage}
                        alt={course.type_course === "relay" ? "Relay" : "Delivery"}
                        className="w-6 h-6 object-cover"
                      />
                    </div>
                    {/* Progress bar between circles */}
                    {index < groupedByColis[colisId].length - 1 && (
                      <div className="w-full bg-gray-200 h-2.5 mx-2 rounded-full">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{
                            width: `${(index + 1) / groupedByColis[colisId].length * 100}%`,
                          }}
                        ></div>
                      </div>
                    )}
                  </div>
                  <div className="mt-3 sm:pe-8">
                    {/* Type of course (Relay/Delivery) */}
                    <div className="mb-2">
                      <span
                        className={`bg-${
                          course.type_course === "relay" ? "blue" : "green"
                        }-100 text-${
                          course.type_course === "relay" ? "blue" : "green"
                        }-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-${
                          course.type_course === "relay" ? "blue" : "green"
                        }-900 dark:text-${
                          course.type_course === "relay" ? "blue" : "green"
                        }-300`}
                      >
                        {course.type_course === "relay" ? "Relay" : "Delivery"}
                      </span>
                    </div>

                    {/* Additional details */}
                    <h3 className="text-sm font-thin text-black">
                      Coursier : {course.coursier_id?.completename || "N/A"}
                    </h3>

                    {course.relais_id && (
                      <h3 className="text-sm font-thin text-black">
                        Relais : {course.relais_id?.completename || "N/A"}
                      </h3>
                    )}

                    {course.client_final_id && (
                      <h3 className="text-sm font-thin text-black">
                        Client final : {course.client_final_id?.completename || "N/A"}
                      </h3>
                    )}

                    <p className="text-sm font-thin text-black">
                      Départ: {course.depart || "N/A"} - Arrivée: {course.arrive || "N/A"}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrackingOrder;
