import Adminheader from "./Adminheader";
import Adminsidebar from "./Adminsidebar";
import LineChart from "./LineChart";

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

  {/* Section pour les contrôles et le graphique */}
  <div className="mt-10 ml-64">
        {/* Conteneur pour les contrôles au-dessus du graphique */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-700">Est. Revenue ($)</h3>
          <div className="flex space-x-2">
            <select className="p-2 border rounded-md text-gray-700">
              <option>View By: All</option>
              {/* Ajouter d'autres options ici si nécessaire */}
            </select>
            <button className="p-2 border rounded-md text-gray-700 flex items-center space-x-2">
              <span>Filters</span>
              <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000000">
                <path d="M456-144v-240h72v84h288v72H528v84h-72Zm-312-84v-72h240v72H144Zm144-132v-84H144v-72h144v-84h72v240h-72Zm144-84v-72h384v72H432Zm144-132v-240h72v84h168v72H648v84h-72Zm-432-84v-72h384v72H144Z"/>
              </svg>
            </button>
            <button className="p-2 bg-blue-500 text-white rounded-md flex items-center space-x-2">
              <span>Download</span>
              <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#FFFFFF"><path d="M480-336 288-528l51-51 105 105v-342h72v342l105-105 51 51-192 192ZM263.72-192Q234-192 213-213.15T192-264v-72h72v72h432v-72h72v72q0 29.7-21.16 50.85Q725.68-192 695.96-192H263.72Z"/></svg>
            </button>
          </div>
        </div>
        {/* Graphique */}
        <LineChart />
      </div>
    </section>
  );
}

export default Stats;
