import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clientService from '../../services/clientService';
import Adminsidebar from './Adminsidebar';
import Adminheader from './Adminheader';

function Customer() {
    const [customers, setCustomers] = useState([]);
    const [error, setError] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [isActionsDropdownVisible, setIsActionsDropdownVisible] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false); // Modal pour la suppression
    const [successMessage, setSuccessMessage] = useState(null); // Message de succès
    const navigate = useNavigate();

    const fetchCustomers = async () => {
        try {
            const response = await clientService.getAllClients();
            const updatedCustomers = response.data.map(customer => ({
                ...customer,
                status: customer.status
            }));
            setCustomers(updatedCustomers);
        } catch (error) {
            setError('Erreur lors de la récupération des clients');
            console.error('Error fetching customers:', error);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const handleSelectCustomer = (id) => {
        if (id === selectedCustomer) {
            setSelectedCustomer(null);
            setIsActionsDropdownVisible(false);
        } else {
            setSelectedCustomer(id);
            setIsActionsDropdownVisible(true);
        }
    };
    const handleAction = async (action) => {
        if (selectedCustomer) {
            try {
                if (action === 'deactivate') {
                    await clientService.updateClientStatus(selectedCustomer, 'Inactif');
                    setSuccessMessage('Client désactivé avec succès');
                } else if (action === 'activate') {
                    await clientService.updateClientStatus(selectedCustomer, 'Actif');
                    setSuccessMessage('Client activé avec succès');
                } else if (action === 'delete') {
                    setShowDeleteModal(true); // Affiche le modal avant de supprimer
                }
                fetchCustomers(); // Actualise la liste après l'action
                setTimeout(() => setSuccessMessage(null), 3000); // Masquer le message après 3 secondes
            } catch (error) {
                console.error('Erreur lors de l\'action sur le client', error);
                setError('Erreur lors de l\'action sur le client');
            }
        }
    }; 
    
    

    // Fonction pour confirmer la suppression du client
    const confirmDeleteCustomer = async () => {
        try {
            await clientService.deleteClientById(selectedCustomer);
            setSuccessMessage('Client supprimé avec succès');
            fetchCustomers();
            setShowDeleteModal(false); // Fermer le modal après la suppression
            setTimeout(() => setSuccessMessage(null), 3000); // Masquer le message après 3 secondes
        } catch (error) {
            console.error('Erreur lors de la suppression du client', error);
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
                                        <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search" required />
                                    </div>
                                </form>
                            </div>
                            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                                <div className="relative">
                                <button
                id="actionsDropdownButton"
                className={`w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 ${!selectedCustomer ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={!selectedCustomer}
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
                                                        className="block w-full text-left py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                        Désactiver
                                                    </button>
                                                </li>
                                                <li>
                                                    <button onClick={() => handleAction('activate')} className="block w-full text-left py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
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
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-4 py-3"></th> {/* Colonne vide pour aligner */}
                                        <th scope="col" className="px-4 py-3">Nom & Prénom</th>
                                        <th scope="col" className="px-4 py-3">Email</th>
                                        <th scope="col" className="px-4 py-3">Téléphone</th>
                                        <th scope="col" className="px-4 py-3">Statut</th>
                                        <th scope="col" className="px-4 py-3">
                                            <span className="sr-only">Actions</span>
                                        </th>
                                    </tr>
                                </thead>
                                
                                <tbody>
                                    {customers.map(customer => (
                                        <tr key={customer._id} className={`hover:bg-gray-100 dark:hover:bg-gray-600 ${selectedCustomer === customer._id ? 'bg-blue-100 dark:bg-blue-600' : ''}`}>
                                            <td className="px-4 py-3">
                                                <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" checked={selectedCustomer === customer._id} onChange={() => handleSelectCustomer(customer._id)} />
                                            </td>
                                            <td className="px-4 py-3">{customer.completename}</td>
                                            <td className="px-4 py-3">{customer.email}</td>
                                            <td className="px-4 py-3">{customer.tel}</td>
                                            <td className="px-4 py-3">
                                                <span
                                                    style={customer.status === 'Actif' ? statusStyles.active : statusStyles.inactive}
                                                />
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <button
                                                    className="text-blue-600 dark:text-blue-500 hover:underline"
                                                    onClick={() => navigate(`/customer/${customer._id}`)}
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

            {showDeleteModal && (
  <div id="deleteModal" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/* Modal Content */}
      <div className="bg-white rounded-lg shadow-lg dark:bg-gray-800 p-4 max-w-md">
          <div className="text-center">
              <svg className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" aria-hidden="true">
                  {/* SVG path */}
              </svg>
              <p className="text-gray-500 dark:text-gray-300">Etes-vous sûr de vouloir supprimer cet utilisateur ?</p>
              <div className="flex justify-center items-center mt-4 space-x-4">
                  <button 
                      className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600"
                      onClick={() => setShowDeleteModal(false)}>
                      Non, annuler
                  </button>
                  <button 
                      className="py-2 px-3 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
                      onClick={confirmDeleteCustomer}>
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

export default Customer;
