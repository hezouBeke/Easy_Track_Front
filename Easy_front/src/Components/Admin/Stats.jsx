import Adminheader from "./Adminheader";
import Adminsidebar from "./Adminsidebar";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Données pour le PieChart
const pieData = [
  { name: "America", value: 400 },
  { name: "Asia", value: 300 },
  { name: "Europe", value: 300 },
  { name: "Africa", value: 200 },
];

// Données pour le BarChart
const barData = [
  { name: "Jan", TeamA: 40, TeamB: 24 },
  { name: "Feb", TeamA: 30, TeamB: 13 },
  { name: "Mar", TeamA: 20, TeamB: 98 },
  { name: "Apr", TeamA: 27, TeamB: 39 },
  { name: "May", TeamA: 18, TeamB: 48 },
  { name: "Jun", TeamA: 23, TeamB: 38 },
  { name: "Jul", TeamA: 34, TeamB: 43 },
  { name: "Aug", TeamA: 56, TeamB: 68 },
  { name: "Sep", TeamA: 45, TeamB: 32 },
];

// Couleurs pour le PieChart
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

function Stats() {
  return (
    <section className="relative bg-gray-50 dark:bg-gray-100 p-3 sm:p-5">
      <Adminheader />
      <Adminsidebar />

      {/* Section pour les cartes */}
      <div className="grid grid-cols-5 sm:grid-cols-5 lg:grid-cols-5 gap-10 mt-20 ml-64">
               {/* Cartes */}
               <div className="relative p-6 bg-white shadow-md rounded-lg transition-shadow duration-300 hover:shadow-lg hover:shadow-blue-500/50 w-full h-full">
          <div className="absolute top-2 right-2">
            <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#000000">
              <path d="M446.67-163.67V-461l-260-150.33V-314l260 150.33Zm66.66 0 260-150.33v-298l-260 151v297.33ZM446.67-87 153.33-256q-15.66-9-24.5-24.33-8.83-15.34-8.83-33.34v-332.66q0-18 8.83-33.34 8.84-15.33 24.5-24.33l293.34-169q15.66-9 33.33-9 17.67 0 33.33 9l293.34 169q15.66 9 24.5 24.33 8.83 15.34 8.83 33.34v332.66q0 18-8.83 33.34-8.84 15.33-24.5 24.33L513.33-87q-15.66 9-33.33 9-17.67 0-33.33-9Zm196-526 93.66-54L480-815.33 386-761l256.67 148ZM480-518l95.33-55.67-257-148.33L223-667l257 149Z"/>
            </svg>
          </div>
          <h3 className="text-xl text-gray-500 font-thin">Colis Traités</h3>
          <p className="text-2xl font-bold text-blue-500">362</p>
          <p className="text-green-500">+12</p>
        </div>
         {/* Carte pour les Colis Livrés */}
         <div className="relative p-6 bg-white shadow-md rounded-lg transition-shadow duration-300 hover:shadow-lg hover:shadow-blue-500/50 w-full h-full">
          <div className="absolute top-2 right-2">
          <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#000000"><path d="M285.33-241.33 60.67-466l47.66-47.33L285.67-336 333-288.67l-47.67 47.34Zm188.67 0L249.33-466l47.34-47.67L474-336.33 852.67-715 900-667.33l-426 426ZM474-430l-47.67-47.33 237.34-237.34 47.66 47.34L474-430Z"/></svg>
          </div>
          <h3 className="text-xl text-gray-500 font-thin">Colis Livrés</h3>
          <p className="text-2xl font-bold text-blue-500">362</p>
          <p className="text-green-500">+12</p>
        </div>

 {/* Carte pour les Colis en Transit */}
        <div className="relative p-6 bg-white shadow-md rounded-lg transition-shadow duration-300 hover:shadow-lg hover:shadow-blue-500/50 w-full h-full">
          <div className="absolute top-2 right-2">
          <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#000000"><path d="M312-146.67h336v-124.66q0-70-49-118.67t-119-48.67q-70 0-119 48.67t-49 118.67v124.66ZM160-80v-66.67h85.33v-124.66q0-67.67 36.17-124.17t97.17-84.5q-61-28.67-97.17-85.17t-36.17-124.16v-124H160V-880h640v66.67h-85.33v124q0 67.66-36.17 124.16T581.33-480q61 28 97.17 84.5t36.17 124.17v124.66H800V-80H160Z"/></svg>
          </div>
          <h3 className="text-xl text-gray-500 font-thin">Colis en Transit</h3>
          <p className="text-2xl font-bold text-blue-500">362</p>
          <p className="text-green-500">+12</p>
        </div>

        {/* Carte pour les Comptes Inactifs */}
        <div className="relative p-6 bg-white shadow-md rounded-lg transition-shadow duration-300 hover:shadow-lg hover:shadow-blue-500/50 w-full h-full">
          <div className="absolute top-2 right-2">
          <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#000000"><path d="M799.88-526.67q-14.21 0-23.71-9.61-9.5-9.62-9.5-23.84 0-14.21 9.61-23.71 9.62-9.5 23.84-9.5 14.21 0 23.71 9.61 9.5 9.62 9.5 23.84 0 14.21-9.61 23.71-9.62 9.5-23.84 9.5Zm-33.21-120v-186.66h66.66v186.66h-66.66ZM360-480.67q-66 0-109.67-43.66Q206.67-568 206.67-634t43.66-109.67Q294-787.33 360-787.33t109.67 43.66Q513.33-700 513.33-634t-43.66 109.67Q426-480.67 360-480.67ZM40-160v-100q0-34.67 17.5-63.17T106.67-366q70.66-32.33 130.89-46.5 60.22-14.17 122.33-14.17T482-412.5q60 14.17 130.67 46.5 31.66 15 49.5 43.17Q680-294.67 680-260v100H40Zm66.67-66.67h506.66V-260q0-14.33-7.83-27t-20.83-19q-65.34-31-116.34-42.5T360-360q-57.33 0-108.67 11.5Q200-337 134.67-306q-13 6.33-20.5 19t-7.5 27v33.33ZM360-547.33q37 0 61.83-24.84Q446.67-597 446.67-634t-24.84-61.83Q397-720.67 360-720.67t-61.83 24.84Q273.33-671 273.33-634t24.84 61.83Q323-547.33 360-547.33Zm0-86.67Zm0 407.33Z"/></svg>
          </div>
          <h3 className="text-xl text-gray-500 font-thin">Comptes Inactifs</h3>
          <p className="text-2xl font-bold text-blue-500">362</p>
          <p className="text-red-500">+12</p>
        </div>

        {/* Carte pour les Utilisateurs Inscrits */}
        <div className="relative p-6 bg-white shadow-md rounded-lg transition-shadow duration-300 hover:shadow-lg hover:shadow-blue-500/50 w-full h-full">
          <div className="absolute top-2 right-2">
          <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#000000"><path d="M80-160v-100q0-33.67 17-62.33Q114-351 146.67-366q65-30 126.33-45.33 61.33-15.34 127-15.34 29.33 0 60.5 3.34Q491.67-420 523.33-412l-56 56q-17-2-33.5-3T400-360q-62.33 0-112.83 12.67-50.5 12.66-112.5 41.33-14.34 7-21.17 20-6.83 13-6.83 26v33.33h296L509.33-160H80Zm544 16L484-284l46.67-46.67L624-237.33l209.33-209.34L880-400 624-144ZM400-481.33q-66 0-109.67-43.67-43.66-43.67-43.66-109.67t43.66-109.66Q334-788 400-788t109.67 43.67q43.66 43.66 43.66 109.66T509.67-525Q466-481.33 400-481.33Zm42.67 254.66ZM400-548q37 0 61.83-24.83 24.84-24.84 24.84-61.84t-24.84-61.83Q437-721.33 400-721.33t-61.83 24.83q-24.84 24.83-24.84 61.83t24.84 61.84Q363-548 400-548Zm0-86.67Z"/></svg>
          </div>
          <h3 className="text-xl text-gray-500 font-thin">Utilisateurs Inscrits</h3>
          <p className="text-2xl font-bold text-blue-500">362</p>
          <p className="text-green-500">+12</p>
        </div>
      </div>

      {/* Section pour les charts */}
      <div className="grid grid-cols-2 gap-10 mt-10 ml-64">
        {/* PieChart */}
        <div className="p-6 bg-white shadow-md rounded-lg">
          <h3 className="text-xl text-gray-500 font-thin">Current Visits</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* BarChart */}
        <div className="p-6 bg-white shadow-md rounded-lg">
          <h3 className="text-xl text-gray-500 font-thin">Website Visits</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="TeamA" fill="#8884d8" />
              <Bar dataKey="TeamB" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-10 mt-10 ml-64">
  <div className="p-6 bg-white shadow-md rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl duration-300">
    <h3 className="text-2xl text-gray-700 font-semibold mb-4">Carte des Colis en Transit</h3>
    <div className="h-60 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg border border-blue-300 flex items-center justify-center">
      <p className="text-center text-gray-500">Carte à intégrer ici</p>
    </div>
  </div>

  <div className="p-6 bg-white shadow-md rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl duration-300">
    <h3 className="text-2xl text-gray-700 font-semibold mb-4">Colis Récents</h3>
    <table className="table-auto w-full text-left mt-5 border-collapse">
      <thead>
        <tr className="bg-gray-100">
          <th className="px-4 py-2 border border-gray-200 font-medium text-gray-700">ID Colis</th>
          <th className="px-4 py-2 border border-gray-200 font-medium text-gray-700">Statut</th>
          <th className="px-4 py-2 border border-gray-200 font-medium text-gray-700">Date d'Expédition</th>
          <th className="px-4 py-2 border border-gray-200 font-medium text-gray-700">Destination</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border px-4 py-2">#12345</td>
          <td className="border px-4 py-2 text-green-500">Livré</td>
          <td className="border px-4 py-2">2024-09-19</td>
          <td className="border px-4 py-2">Paris, France</td>
        </tr>
        <tr className="bg-gray-50">
          <td className="border px-4 py-2">#67890</td>
          <td className="border px-4 py-2 text-yellow-500">En Transit</td>
          <td className="border px-4 py-2">2024-09-18</td>
          <td className="border px-4 py-2">Lyon, France</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
          
    {/* Section pour les détails du véhicule et du coursier */}
    <div className="bg-white p-6 shadow-md rounded-lg flex justify-between items-start space-x-8 mt-10 max-w-4xl mx-auto">
 {/* Section gauche - Détails du véhicule */}
 <div className="flex-1">
    <h3 className="text-lg font-semibold text-gray-700 mb-2">
      Cargo Address: <span className="text-black">XR-987856897</span>
    </h3>
    <div className="flex space-x-4">
      <img
        src="/src/assets/car.jpg"
        alt="Vehicle"
        className="w-48 h-auto object-cover rounded-md" // Augmentez la largeur ici
      />
      <div className="space-y-2">
        <div>
          <p className="text-gray-600 font-semibold">Cargo Model:</p>
          <p className="text-black">Nissan NV Cargo</p>
        </div>
        <div>
          <p className="text-gray-600 font-semibold">Body Style:</p>
          <p className="text-black">Cargo Van</p>
        </div>
        <div>
          <p className="text-gray-600 font-semibold">Vehicle Number:</p>
          <p className="text-black">SYL - 06048CV</p>
        </div>
        <div>
          <p className="text-gray-600 font-semibold">Load Volume:</p>
          <p className="text-black">326,548 in³</p>
        </div>
        <div>
          <p className="text-gray-600 font-semibold">Consumer Rating:</p>
          <p className="text-yellow-400">
            ★★★★☆ <span className="text-gray-500">(34 reviews)</span>
          </p>
        </div>
      </div>
    </div>
  </div>

        {/* Section droite - Détails du conducteur */}
        <div className="w-56 text-center">
          <img
            src="./src/assets/car.jpg" // Remplacer par le chemin correct
            alt="Driver"
            className="w-20 h-20 rounded-lg mx-auto mb-4"
          />
          <h4 className="text-lg font-semibold text-black">Cameron Williamson</h4>
          <p className="text-green-500 text-sm">Online</p>
          <p className="text-gray-500 text-sm">ID Number: VSX-4459SP</p>
          <div className="mt-4 space-x-4">
            <button className="bg-blue-500 text-white py-1 px-6 rounded-lg">Call</button>
            <button className="bg-gray-100 text-blue-500 py-1 px-6 rounded-lg">Message</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Stats;
