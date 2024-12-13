
import React, { useState, useEffect } from "react";
import expeditionService from "../../services/expeditionService";

const TrackingOrder = () => {
  const [orders, setOrders] = useState([]);
  const [selectedExpedition, setSelectedExpedition] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchExpeditions = async () => {
      try {
        const response = await expeditionService.getAllExpeditions();
        const fetchedOrders = response.data.map((order) => ({
          ...order,
          status: "Delivered", // Définit le statut par défaut à "Delivered"
        }));
        setOrders(fetchedOrders); // Assure-toi que le format des données est correct
      } catch (error) {
        console.error("Erreur lors de la récupération des expéditions", error);
      }
    };
    fetchExpeditions();
  }, []);

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

  // Filtrer les commandes selon l'expédition sélectionnée et la recherche
  const filteredOrders = orders.filter((order) => {
    const matchesExpedition =
      selectedExpedition === "" || order.expedition_code === selectedExpedition;
    const matchesSearch =
      searchQuery === "" ||
      order.colis_id?.indent_colis
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());
    return matchesExpedition && matchesSearch;
  });

  return (
    <div className="p-2 bg-white rounded-lg shadow-lg w-full max-w-full lg:max-w-[1440px] mt-[-1px] ml-4">
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
  <div className="relative w-64 ml-auto">
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



      {/* Tableau des commandes */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-200 sticky top-0 shadow-md">
            <tr>
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">
                Order ID
              </th>
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">
                Départ
              </th>
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">
                Destination
              </th>
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">
                Date de début
              </th>
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">
                Date de fin
              </th>
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">
                Expéditeur
              </th>
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">
                Destinataire
              </th>
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">
                Coursier actuel
              </th>
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, index) => (
              <tr key={index} className="border-b">
                <td className="py-2 px-4 text-sm text-gray-700">
                  {order.expedition_code}
                </td>
                <td className="py-2 px-4 text-sm text-gray-700">
                  {order.colis_id?.desc_depart || "N/A"}
                </td>
                <td className="py-2 px-4 text-sm text-gray-700">
                  {order.colis_id?.desc_destination || "N/A"}
                </td>
                <td className="py-2 px-4 text-sm text-gray-700">
                  {new Date(order.date_depart).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 text-sm text-gray-700">
                  {new Date(order.date_arrivee).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 text-sm text-gray-700">
                  {order.colis_id?.client_id_exp?.completename || "N/A"}
                </td>
                <td className="py-2 px-4 text-sm text-gray-700">
                  {order.colis_id?.client_id_dest?.completename || "N/A"}
                </td>
                <td className="py-2 px-4 text-sm text-gray-700">
                  {order.course_ids?.[0]?.coursier_id?.completename || "N/A"}
                </td>
                <td className="py-2 px-4 text-sm">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrackingOrder;
