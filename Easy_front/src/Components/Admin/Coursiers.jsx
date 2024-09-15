import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import coursierService from '../../services/coursierService';
import Adminsidebar from './Adminsidebar';
import Adminheader from './Adminheader';

function Coursier() {
    const [coursiers, setCoursiers] = useState([]);
    const [error, setError] = useState('');
    const [selectedCoursier, setSelectedCoursier] = useState(null);
    const [isActionsDropdownVisible, setIsActionsDropdownVisible] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false); // Modal pour la suppression
    const [successMessage, setSuccessMessage] = useState(null); // Message de succès
    const navigate = useNavigate();

    const fetchCoursiers = async () => {
        try {
            const response = await coursierService.getAllCoursiers();
            const updatedCoursiers = response.data.map(coursier => ({
                ...coursier,
                status: coursier.status
            }));
            setCoursiers(updatedCoursiers);
        } catch (error) {
            setError('Erreur lors de la récupération des coursiers');
            console.error('Error fetching coursiers:', error);
        }
    };

    useEffect(() => {
        fetchCoursiers();
    }, []);

    const handleSelectCoursier = (id) => {
        if (id === selectedCoursier) {
            setSelectedCoursier(null);
            setIsActionsDropdownVisible(false);
        } else {
            setSelectedCoursier(id);
            setIsActionsDropdownVisible(true);
        }
    };

    const handleAction = async (action) => {
        if (selectedCoursier) {
            try {
                if (action === 'deactivate') {
                    await coursierService.updateCoursierStatus(selectedCoursier, 'Inactif');
                    setSuccessMessage('Coursier désactivé avec succès');
                } else if (action === 'activate') {
                    await coursierService.updateCoursierStatus(selectedCoursier, 'Actif');
                    setSuccessMessage('Coursier activé avec succès');
                } else if (action === 'delete') {
                    setShowDeleteModal(true); // Affiche le modal avant de supprimer
                }
                fetchCoursiers(); // Actualise la liste après l'action
                setTimeout(() => setSuccessMessage(null), 3000); // Masquer le message après 3 secondes
            } catch (error) {
                console.error('Error performing action on coursier:', error);
                setError('Erreur lors de l\'action sur le coursier');
            }
        }
    };
    // Fonction pour confirmer la suppression du coursier
    const confirmDeleteCoursier = async () => {
        try {
            await coursierService.deleteCoursierById(selectedCoursier);
            setSuccessMessage('Coursier supprimé avec succès');
            fetchCoursiers();
            setShowDeleteModal(false); // Fermer le modal après la suppression
            setTimeout(() => setSuccessMessage(null), 3000); // Masquer le message après 3 secondes
        } catch (error) {
            console.error('Erreur lors de la suppression du coursier', error);
        }
    };

    if (error) return <p>{error}</p>;

    const statusStyles = {
        active: {
            display: 'inline-block',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: '#28a745',
            animation: 'blink 1s infinite'
        },
        inactive: {
            display: 'inline-block',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: '#dc3545'
        }
    };

    return (
        <section className="relative bg-gray-50 dark:bg-gray-800 p-3 sm:p-5 min-h-screen flex flex-col">
            <Adminheader />
            <div className="flex flex-1">
                <Adminsidebar />

                <div className="flex-1 mx-60 max-w-screen-2xl px-5 lg:px-0 mt-10 mr-0">
                    <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                            <div className="w-full md:w-1/2">
                                <form className="flex items-center">
                                    <label htmlFor="simple-search" className="sr-only">Rechercher</label>
                                    <div className="relative w-full">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Rechercher" required />
                                    </div>
                                </form>
                            </div>
                            <div className="relative">
                                <button
                                    id="actionsDropdownButton"
                                    className={`w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 ${!selectedCoursier ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    disabled={!selectedCoursier}
                                    onClick={() => setIsActionsDropdownVisible(!isActionsDropdownVisible)}
                                >
                                    Actions
                                    <svg className="-ml-1 mr-1.5 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path clipRule="evenodd" fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                    </svg>
                                </button>
                                {isActionsDropdownVisible && (
                                    <div id="actionsDropdown" className="absolute right-0 z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                        <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="actionsDropdownButton">
                                            <li>
                                                <button
                                                    onClick={() => handleAction('deactivate')}
                                                    className="block w-full text-left py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                >
                                                    Désactiver
                                                </button>
                                            </li>
                                            <li>
                                                <button
                                                    onClick={() => handleAction('activate')}
                                                    className="block w-full text-left py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                >
                                                    Activer
                                                </button>
                                            </li>
                                            <li>
                                                <button onClick={() => handleAction('delete')} className="block w-full text-left py-2 px-4 hover:bg-red-100 dark:hover:bg-red-600 dark:hover:text-white">
                                                    Supprimer
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-4 py-3"></th> {/* Colonne vide pour aligner */}
                                        <th scope="col" className="px-4 py-3">Nom & Prénom</th>
                                        <th scope="col" className="px-4 py-3">Email</th>
                                        <th scope="col" className="px-4 py-3">Téléphone</th>
                                        <th scope="col" className="px-4 py-3">Sexe</th>
                                        <th scope="col" className="px-4 py-3">Statut</th>
                                        <th scope="col" className="px-4 py-3">
                                            <span className="sr-only">Actions</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {coursiers.map(coursier => (
                                        <tr key={coursier._id} className={`hover:bg-gray-100 dark:hover:bg-gray-600 ${selectedCoursier === coursier._id ? 'bg-blue-100 dark:bg-blue-600' : ''}`}>
                                            <td className="px-4 py-3">
                                                <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" checked={selectedCoursier === coursier._id} onChange={() => handleSelectCoursier(coursier._id)} />
                                            </td>
                                            <td className="px-4 py-3">{coursier.completename}</td>
                                            <td className="px-4 py-3">{coursier.email}</td>
                                            <td className="px-4 py-3">{coursier.tel}</td>
                                            <td className="px-4 py-3">{coursier.sex}</td>
                                            <td className="px-4 py-3">
                                                <span
                                                    style={coursier.status === 'Actif' ? statusStyles.active : statusStyles.inactive}
                                                />
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <button
                                                    className="text-blue-600 dark:text-blue-500 hover:underline"
                                                    onClick={() => navigate(`/coursier/${coursier._id}`)}
                                                >
                                                    Détails
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal de confirmation de suppression */}
            {showDeleteModal && (
                <div id="deleteModal" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg dark:bg-gray-800 p-4 max-w-md">
                        <div className="text-center">
                            <svg className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path>
                            </svg>
                            <p className="text-gray-500 dark:text-gray-300">Etes-vous sûr de vouloir supprimer ce coursier ?</p>
                            <div className="flex justify-center items-center mt-4 space-x-4">
                                <button
                                    className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600"
                                    onClick={() => setShowDeleteModal(false)}
                                >
                                    Non, annuler
                                </button>
                                <button
                                    className="py-2 px-3 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
                                    onClick={confirmDeleteCoursier}
                                >
                                    Oui, je suis sûr
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Message de succès */}
            {successMessage && (
                <div className="fixed top-0 right-0 m-4 p-4 bg-green-100 text-green-800 rounded-lg shadow-lg z-50 transition-all duration-500">
                    <p>{successMessage}</p>
                </div>
            )}
        </section>
    );
}

export default Coursier;
