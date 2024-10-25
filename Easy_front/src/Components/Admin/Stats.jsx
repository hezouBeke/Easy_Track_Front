
import Adminheader from "./Adminheader";
import Adminsidebar from "./Adminsidebar";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import coursierService from "../../services/coursierService";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';

import React, { useState, useEffect } from "react";
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
  { name: "May", TeamA: 18, TeamB: 47},                                                                                                                                                                                                                                                                    
  { name: "Jun", TeamA: 23, TeamB: 38 },
  { name: "Jul", TeamA: 34, TeamB: 48 },
  { name: "Aug", TeamA: 56, TeamB: 68 },
  { name: "Sep", TeamA: 45, TeamB: 32 },
];

// Couleurs pour le PieChart
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

function Stats() {
  const [coursiers, setCoursiers] = useState([]);
 
  useEffect(() => {
    const fetchCoursiers = async () => {
      try {
        const response = await coursierService.getAllCoursiers();
        setCoursiers(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des coursiers", error);
      }
    };
    fetchCoursiers();
  }, []);

  const handleCoursierSelection = (index, e) => {
    const selectedCoursierId = e.target.value;
   
  };
  

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
    
          
      <div className="grid grid-cols-2 gap-4 max-w-5xl mx-64 mt-10"> 
  {/* Bloc gauche - Détails du véhicule */}
  <div className="bg-white p-6 shadow-md rounded-lg">
    <div className="flex justify-between items-start">
      <img
        src="/src/assets/car.jpg"
        alt="Vehicle"
        className="w-36 h-auto object-cover rounded-md mr-4"
      />
      <div className="flex flex-col justify-center space-y-1 font-thin text-right">
        <div>
          <p className="text-gray-600">Body Style:</p>
          <p className="text-black">Cargo Van</p>
        </div>
      </div>
    </div>

    <div className="flex justify-between mt-2 space-x-10">
      <div className="mr-2">
        <p className="text-gray-600">Vehicle Number:</p>
        <p className="text-black">SYL - 06048CV</p>
      </div>
      <div className="mr-2">
        <p className="text-gray-600">Load Volume:</p>
        <p className="text-black">326,548 in³</p>
      </div>
      <div>
        <p className="text-gray-600">Consumer Rating:</p>
        <p className="text-yellow-400">
          ★★★★☆ <span className="text-gray-500">(34 reviews)</span>
        </p>
      </div>
    </div>
  </div>

  {/* Bloc droite - Informations et contact du conducteur */}
  <div className="bg-white p-4 shadow-md rounded-lg flex flex-col items-center space-y-3" style={{ maxWidth: '280px', paddingBottom: '25px', marginBottom: '1px', height: 'auto' }}>
    <img
      src="/src/assets/man.jpg"
      alt="Driver"
      className="w-20 h-20 rounded-full mb-2 object-cover"
    />
    <h4 className="text-base font-semibold text-black">Cameron Williamson</h4>
    
    <div className="flex items-center space-x-1 text-xs text-gray-500">
      <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
      <span>Online</span>
    </div>
    <div className="w-full border-t border-gray-300 my-1"></div>
    <div className="flex items-center justify-between w-full px-4">
      <p className="text-gray-500 text-xs font-semibold">ID NUMBER:</p>
      <p className="text-black text-sm font-bold">VSX-4459SP</p>
    </div>
    <div className="flex space-x-3 mt-2 mb-0">
      <button className="flex items-center justify-center space-x-2 bg-white border border-gray-300 text-black py-1 px-3 rounded-lg hover:bg-gray-100 transition text-xs">
        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000000">
          <path d="M760-480q0-117-81.5-198.5T480-760v-80q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480h-80Zm-160 0q0-50-35-85t-85-35v-80q83 0 141.5 58.5T680-480h-80Zm198 360q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z"/>
        </svg>
        <span>Call</span>
      </button>
      <button className="flex items-center justify-center space-x-2 bg-blue-500 text-white py-1 px-4 rounded-lg hover:bg-blue-600 transition text-xs">
        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#FFFFFF">
          <path d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z"/>
        </svg>
        <span>Message</span>
      </button>
    </div>
  </div>  

  {/* Bloc de sélection des coursiers */}
  <div className="bg-white p-6 shadow-md rounded-lg">
    <label
      htmlFor="coursier-select"
      className="block mb-2 text-sm font-medium text-gray-900"
    >
      Sélectionner un coursier
    </label>
    <select
      id="coursier-select"
      name="coursier"
      value={selectedCoursier}
      onChange={handleCoursierSelection}
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
  <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
{/* Bloc avec les onglets pour Prochaine Destination, Historique de Livraison, et Messages */}
<div className="bg-gray-50 p-8 shadow-lg rounded-xl col-span-1 lg:col-span-2 mt-4">
  <h2 className="text-2xl font-bold text-gray-800 mb-6">Informations du Coursier</h2>

  {/* Onglets avec Chakra UI */}
  <Tabs isFitted variant="solid-rounded" colorScheme="blue">
    <TabList>
      <Tab fontWeight="bold" _selected={{ color: 'white', bg: 'blue.500' }}>Prochaine Destination</Tab>
      <Tab fontWeight="bold" _selected={{ color: 'white', bg: 'blue.500' }}>Historique de Livraison</Tab>
      <Tab fontWeight="bold" _selected={{ color: 'white', bg: 'blue.500' }}>Messages du Coursier</Tab>
    </TabList>

    <TabPanels>
      {/* Onglet Prochaine Destination */}
      <TabPanel>
        <div className="mt-6">
          <div className="text-left mb-6">
            <p className="text-gray-700 font-semibold text-xl">Destination :</p>
            <p className="text-gray-600 text-lg">123 Rue de la Paix, Paris</p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="bg-blue-100 p-6 rounded-xl shadow-md text-center">
              <p className="text-blue-600">Distance Restante</p>
              <p className="text-gray-900 font-bold text-3xl">0.542 km</p>
            </div>
            <div className="bg-blue-100 p-6 rounded-xl shadow-md text-center">
              <p className="text-blue-600">Temps Estimé</p>
              <p className="text-gray-900 font-bold text-3xl">3 Min</p>
            </div>
          </div>
        </div>
      </TabPanel>

      {/* Onglet Historique de Livraison */}
      <TabPanel>
        <div className="mt-4">
          <ul className="list-disc list-inside space-y-2">
            <li className="text-gray-700 text-lg">Colis #123 - Livré le 20/09/2024</li>
            <li className="text-gray-700 text-lg">Colis #456 - Livré le 18/09/2024</li>
            <li className="text-gray-700 text-lg">Colis #789 - En cours de livraison</li>
          </ul>
        </div>
      </TabPanel>

      {/* Onglet Messages du Coursier */}
      <TabPanel>
        <div className="mt-4">
          <ul className="list-disc list-inside space-y-2">
            <li className="text-gray-700 text-lg">Message : Prêt pour la livraison !</li>
            <li className="text-gray-700 text-lg">Message : Retard à cause de la circulation.</li>
          </ul>
        </div>
      </TabPanel>
    </TabPanels>
  </Tabs>
</div>


</div>

</div>

    </section>
  );
}

export default Stats;