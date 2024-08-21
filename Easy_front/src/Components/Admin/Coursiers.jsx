// components/Coursiers.js
import React, { useEffect, useState } from 'react';
import authService from '../../services/authService'; // Assure-toi que le chemin est correct

function Coursiers() {
    const [coursiers, setCoursiers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCoursiers = async () => {
            try {
                const response = await authService.getUsersByRole('Coursier');
                setCoursiers(response.data);
            } catch (error) {
                setError('Erreur lors de la récupération des coursiers');
                console.error('Error fetching couriers:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCoursiers();
    }, []);

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>{error}</p>;

    return (
        <section className="bg-gray-50 dark:bg-gray-100 p-3 sm:p-5">
            <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                        {/* Formulaire de recherche */}
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-4 py-3">Nom & Prénom</th>
                                    <th scope="col" className="px-4 py-3">Email</th>
                                    <th scope="col" className="px-4 py-3">Téléphone</th>
                                    <th scope="col" className="px-4 py-3">Véhicule</th>
                                    <th scope="col" className="px-4 py-3">Type</th>
                                    <th scope="col" className="px-4 py-3">Immatriculation</th>
                                    <th scope="col" className="px-4 py-3">
                                        <span className="sr-only">Actions</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {coursiers.map(coursier => (
                                    <tr key={coursier._id}>
                                        <td className="px-4 py-3">{coursier.completename}</td>
                                        <td className="px-4 py-3">{coursier.email}</td>
                                        <td className="px-4 py-3">{coursier.tel}</td>
                                        <td className="px-4 py-3">{coursier.vehicule ? coursier.vehicule.marque : 'N/A'}</td>
                                        <td className="px-4 py-3">{coursier.vehicule ? coursier.vehicule.type : 'N/A'}</td>
                                        <td className="px-4 py-3">{coursier.vehicule ? coursier.vehicule.immatriculation : 'N/A'}</td>
                                        <td className="px-4 py-3">
                                            {/* Actions */}
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

export default Coursiers;
