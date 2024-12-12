import Adminsidebar from './Adminsidebar';
import Adminheader from './Adminheader';

const CreateColis = () => {
    return (
        <section className="bg-white dark:bg-gray-900">
            <Adminheader />
            <div className="py-16 px-4 mx-auto max-w-2xl lg:py-24">
                <Adminsidebar />
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Créer un nouveau colis</h2>
                <form action="#">
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div className="sm:col-span-2">
                            <label htmlFor="client_id_exp" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Client expéditeur</label>
                            <input type="text" name="client_id_exp" id="client_id_exp" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Nom client expéditeur" required />
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="client_id_dest" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Client destinataire</label>
                            <input type="text" name="client_id_dest" id="client_id_dest" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Nom client destinataire" required />
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="desc_depart" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description du point de départ</label>
                            <input type="text" name="desc_depart" id="desc_depart" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Description du point de départ" required />
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="desc_destination" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description de la destination</label>
                            <input type="text" name="desc_destination" id="desc_destination" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Description de la destination" required />
                        </div>
                        <div className="w-full">
                            <label htmlFor="taille" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Taille</label>
                            <input type="text" name="taille" id="taille" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Taille du colis" required />
                        </div>
                        <div className="w-full">
                            <label htmlFor="poids" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Poids (kg)</label>
                            <input type="number" name="poids" id="poids" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Poids en kg" required min="0.01" />
                        </div>
                        <div className="w-full">
                            <label htmlFor="particularite" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Particularité</label>
                            <select id="particularite" name="particularite" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                <option value="">Sélectionner</option>
                                <option value="Fragile">Fragile</option>
                                <option value="Dangereux">Dangereux</option>
                                <option value="Congelé">Congelé</option>
                            </select>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description du colis</label>
                            <textarea id="description" name="description" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Description du colis" required></textarea>
                        </div>
                      
                    </div>
                    <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                        Ajouter le colis
                    </button>
                </form>
            </div>
        </section>
    );
};

export default CreateColis;
