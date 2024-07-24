import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/authService";

function Register() {
    const [isCourier, setIsCourier] = useState(false);
    const [formData, setFormData] = useState({
        role: 'Client',
        name: '',
        firstName: '',
        tel: '', // Ajoutez le champ téléphone ici
        sex: '',
        email: '',
        password: '',
        confirmPassword: '',
        vehiculeType: '',
        vehiculeBrand: '',
        vehiculePlate: ''
    });

    const navigate = useNavigate();

    const handleRoleSelection = (role) => {
        setIsCourier(role === 'Coursier');
        setFormData({ ...formData, role });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Les mots de passe ne correspondent pas");
            return;
        }
        try {
            const response = await authService.signup(formData);
            console.log('Account created:', response.data);
            alert("compte creé avec succès")
            navigate('/login');
        } catch (error) {
            console.error('Error creating account:', error.response.data);
        }
    };

    return (
        <section className="bg-white">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-black">
                    <img className="w-8 h-8 mr-2" src="./src/assets/logo2.png" alt="logo"/>
                    EasyTrack 
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Créer un compte
                        </h1>
                        <div className="flex space-x-4">
                            <button type="button" onClick={() => handleRoleSelection('Client')} className="w-1/2 text-sm font-medium text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                Client
                            </button>
                            <button type="button" onClick={() => handleRoleSelection('Coursier')} className="w-1/2 text-sm font-medium text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                Coursier
                            </button>
                        </div>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom</label>
                                <input type="text" name="name" id="name" onChange={handleChange} value={formData.name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Votre nom" required=""/>
                            </div>
                            <div>
                                <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Prénom</label>
                                <input type="text" name="firstName" id="firstName" onChange={handleChange} value={formData.firstName} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Votre prénom" required=""/>
                            </div>
                            <div>
                                <label htmlFor="tel" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Téléphone</label>
                                <input type="tel" name="tel" id="tel" onChange={handleChange} value={formData.tel} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Votre numéro de téléphone" required=""/>
                            </div>
                            <div className="flex items-center space-x-4">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sexe</label>
                                <label className="flex items-center">
                                    <input type="radio" name="sex" value="M" onChange={handleChange} className="form-radio text-primary-600 focus:ring-primary-600 dark:focus:ring-blue-500" required/>
                                    <span className="ml-2 text-sm text-gray-900 dark:text-white">Homme</span>
                                </label>
                                <label className="flex items-center">
                                    <input type="radio" name="sex" value="F" onChange={handleChange} className="form-radio text-primary-600 focus:ring-primary-600 dark:focus:ring-blue-500" required/>
                                    <span className="ml-2 text-sm text-gray-900 dark:text-white">Femme</span>
                                </label>
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">E-mail</label>
                                <input type="email" name="email" id="email" onChange={handleChange} value={formData.email} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mot de passe</label>
                                <input type="password" name="password" id="password" onChange={handleChange} value={formData.password} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="••••••••" required=""/>
                            </div>
                            <div>
                                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirmer le mot de passe</label>
                                <input type="password" name="confirmPassword" id="confirmPassword" onChange={handleChange} value={formData.confirmPassword} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="••••••••" required=""/>
                            </div>
                            {isCourier && (
                                <div>
                                    <label htmlFor="vehiculeType" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type de véhicule</label>
                                    <select name="vehiculeType" id="vehiculeType" onChange={handleChange} value={formData.vehiculeType} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                                        <option value="">Sélectionnez le type de véhicule</option>
                                        <option value="tricycle">Tricycle</option>
                                        <option value="moto">Moto</option>
                                        <option value="voiture">Voiture</option>
                                    </select>
                                </div>
                            )}
                            {isCourier && (
                                <div>
                                    <label htmlFor="vehiculeBrand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Marque du véhicule</label>
                                    <input type="text" name="vehiculeBrand" id="vehiculeBrand" onChange={handleChange} value={formData.vehiculeBrand} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Marque du véhicule" required=""/>
                                </div>
                            )}
                            {isCourier && (
                                <div>
                                    <label htmlFor="vehiculePlate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Plaque d'immatriculation</label>
                                    <input type="text" name="vehiculePlate" id="vehiculePlate" onChange={handleChange} value={formData.vehiculePlate} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Plaque d'immatriculation" required=""/>
                                </div>
                            )}
                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Créer un compte</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Vous avez déjà un compte? <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-white">Se connecter</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Register;
