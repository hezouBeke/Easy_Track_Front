import Adminheader from "./Adminheader";
import Adminsidebar from "./Adminsidebar";

function Stats() {
  return(
    <section className="relative bg-gray-50 dark:bg-gray-100 p-3 sm:p-5">
      <Adminheader />
      <Adminsidebar />
      <div className="grid grid-cols-5 sm:grid-cols-5 lg:grid-cols-5 gap-10 mt-20  ml-64">
        {/* Carte pour les Colis Traités */}
        <div className="p-4 bg-white shadow-md rounded-lg transition-shadow duration-300 hover:shadow-lg hover:shadow-blue-500/50">
          <h3 className="text-sm text-gray-500">Colis Traités</h3>
          <p className="text-2xl font-bold text-gray-900">362</p>
          <p className="text-green-500">+12</p>
        </div>

        {/* Carte pour les Membres Inscrits */}
        <div className="p-4 bg-white shadow-md rounded-lg transition-shadow duration-300 hover:shadow-lg hover:shadow-blue-500/50">
          <h3 className="text-sm text-gray-500">Membres Inscrits</h3>
          <p className="text-2xl font-bold text-gray-900">1056</p>
          <p className="text-green-500">+65</p>
        </div>

        {/* Carte pour les Problèmes Résolus */}
        <div className="p-4 bg-white shadow-md rounded-lg transition-shadow duration-300 hover:shadow-lg hover:shadow-blue-500/50">
          <h3 className="text-sm text-gray-500">Problèmes Résolus</h3>
          <p className="text-2xl font-bold text-gray-900">89</p>
          <p className="text-green-500">+65</p>
        </div>

        {/* Carte pour les Dépenses Hebdomadaires */}
        <div className="p-4 bg-white shadow-md rounded-lg transition-shadow duration-300 hover:shadow-lg hover:shadow-blue-500/50">
          <h3 className="text-sm text-gray-500">Dépenses cette semaine</h3>
          <p className="text-2xl font-bold text-gray-900">9,496 USD</p>
        </div>
        <div className="p-4 bg-white shadow-md rounded-lg transition-shadow duration-300 hover:shadow-lg hover:shadow-blue-500/50">
          <h3 className="text-sm text-gray-500">Dépenses cette semaine</h3>
          <p className="text-2xl font-bold text-gray-900">9,496 USD</p>
        </div>
      </div>
    </section>
  );
}

export default Stats;
