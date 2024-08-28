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
    const navigate = useNavigate();

    // Fonction pour récupérer les coursiers
    const fetchCoursiers = async () => {
        try {
            const response = await coursierService.getAllCoursiers();
            const updatedCoursiers = response.data.map(coursier => ({
                ...coursier,
                status: coursier.status // Assurez-vous que le statut est correct
            }));
            setCoursiers(updatedCoursiers);
        } catch (error) {
            setError('Erreur lors de la récupération des coursiers');
            console.error('Error fetching coursiers:', error);
        }
    };

    // Chargement initial des coursiers
    useEffect(() => {
        fetchCoursiers();
    }, []);

    // Gestion de la sélection d'un coursier
    const handleSelectCoursier = (id) => {
        if (id === selectedCoursier) {
            setSelectedCoursier(null);
            setIsActionsDropdownVisible(false);
        } else {
            setSelectedCoursier(id);
            setIsActionsDropdownVisible(true);
        }
    };

    // Gestion des actions sur un coursier
    const handleAction = async (action) => {
        if (selectedCoursier) {
            try {
                if (action === 'deactivate') {
                    await coursierService.updateCoursierStatus(selectedCoursier, 'Inactif');
                } else if (action === 'activate') {
                    await coursierService.updateCoursierStatus(selectedCoursier, 'Actif');
                } else if (action === 'delete') {
                    await coursierService.deleteCoursierById(selectedCoursier);
                }
                // Recharger les coursiers après chaque action
                fetchCoursiers();
            } catch (error) {
                console.error('Error performing action on coursier:', error);
                setError('Erreur lors de l\'action sur le coursier');
            }
            setSelectedCoursier(null);
            setIsActionsDropdownVisible(false);
        }
    };

    if (error) return <p>{error}</p>;

    // Styles pour le statut
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
        <section className=" bg-gray-50 dark:bg-gray-800 p-3 sm:p-5">
            <Adminheader />
            <Adminsidebar />
        
            <div className="mx-60 max-w-screen-2xl px-5 lg:px-0 mt-10 mr-0">
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
                                            <button
                                                onClick={() => handleAction('delete')}
                                                className="block w-full text-left py-2 px-4 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                            >
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
                                    <th scope="col" className="px-4 py-3">
                                        <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
                                    </th>
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
        </section>
    );
}

export default Coursier;
