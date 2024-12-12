import Adminsidebar from './Adminsidebar';
import Adminheader from './Adminheader';
import { useState, useEffect } from 'react';
import { createColis } from '../../services/colisService';
import clientService from '../../services/clientService';
import { useNavigate } from 'react-router-dom';

const CreateColis = () => {
    const [formData, setFormData] = useState({
        client_id_exp: '',
        client_id_dest: '',
        desc_depart: '',
        desc_destination: '',
        taille: '',
        poids: '',
        particularite: '',
        description: ''
    });
    const [clients, setClients] = useState([]);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await clientService.getAllClients();
                setClients(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des clients:', error);
            }
        };
        fetchClients();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.client_id_exp === formData.client_id_dest) {
            alert("L'expéditeur et le destinataire ne peuvent pas être le même client.");
            return;
        }
        try {
            await createColis(formData);
            setShowSuccessModal(true);
            setFormData({
                client_id_exp: '',
                client_id_dest: '',
                desc_depart: '',
                desc_destination: '',
                taille: '',
                poids: '',
                particularite: '',
                description: ''
            });
        } catch (error) {
            console.error('Erreur lors de la création du colis:', error);
            alert('Une erreur est survenue. Veuillez réessayer.');
        }
    };

    const handleModalContinue = () => {
        setShowSuccessModal(false);
        navigate('/dashboard/admin/colis');
    };

    return (
        <section className="bg-white dark:bg-gray-900">
            <Adminheader />
            <div className="py-16 px-4 mx-auto max-w-2xl lg:py-24">
                <Adminsidebar />
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Créer un nouveau colis</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div className="sm:col-span-2">
                            <label htmlFor="client_id_exp" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Client expéditeur</label>
                            <select id="client_id_exp" name="client_id_exp" value={formData.client_id_exp} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                <option value="">Sélectionner un client</option>
                                {clients.map(client => (
                                    <option key={client._id} value={client._id}>{client.completename}</option>
                                ))}
                            </select>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="client_id_dest" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Client destinataire</label>
                            <select id="client_id_dest" name="client_id_dest" value={formData.client_id_dest} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                <option value="">Sélectionner un client</option>
                                {clients.map(client => (
                                    <option key={client._id} value={client._id}>{client.completename}</option>
                                ))}
                            </select>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="desc_depart" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description du point de départ</label>
                            <input type="text" name="desc_depart" id="desc_depart" value={formData.desc_depart} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Description du point de départ" required />
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="desc_destination" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description de la destination</label>
                            <input type="text" name="desc_destination" id="desc_destination" value={formData.desc_destination} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Description de la destination" required />
                        </div>
                        <div className="w-full">
                            <label htmlFor="taille" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Taille</label>
                            <input type="text" name="taille" id="taille" value={formData.taille} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Taille du colis" required />
                        </div>
                        <div className="w-full">
                            <label htmlFor="poids" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Poids (kg)</label>
                            <input type="number" name="poids" id="poids" value={formData.poids} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Poids en kg" required min="1" />
                        </div>
                        <div className="w-full">
                            <label htmlFor="particularite" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Particularité</label>
                            <select id="particularite" name="particularite" value={formData.particularite} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                <option value="">Sélectionner</option>
                                <option value="Fragile">Fragile</option>
                                <option value="Dangereux">Dangereux</option>
                                <option value="Congelé">Congelé</option>
                            </select>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description du colis</label>
                            <textarea id="description" name="description" rows="4" value={formData.description} onChange={handleChange} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Description du colis" required></textarea>
                        </div>
                    </div>
                    <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                        Ajouter le colis
                    </button>
                </form>
                {showSuccessModal && (
                    <div id="successModal" className="fixed top-0 right-0 left-0 z-50 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50">
                        <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
                                <button
                                    type="button"
                                    className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    onClick={handleModalContinue}
                                >
                                    <svg
                                        aria-hidden="true"
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                                <div className="p-6 text-center">
                                    <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 p-2 flex items-center justify-center mx-auto mb-3.5">
                                        <svg
                                            aria-hidden="true"
                                            className="w-8 h-8 text-green-500 dark:text-green-400"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                        <span className="sr-only">Success</span>
                                    </div>
                                    <p className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                                        Colis créé avec succès !
                                    </p>
                                    <button
                                        type="button"
                                        className="py-2 px-3 text-sm font-medium text-center text-white rounded-lg bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:focus:ring-primary-900"
                                        onClick={handleModalContinue}
                                    >
                                        Continuer
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default CreateColis;
