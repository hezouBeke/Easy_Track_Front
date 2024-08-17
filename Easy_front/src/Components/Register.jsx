import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/authService";

function Register() {
    const [isCourier, setIsCourier] = useState(false);
    const [formData, setFormData] = useState({
        role: 'Client',
        completename: '',
        tel: '',
        sex: '',
        email: '',
        password: '',
        confirmPassword: '',
        vehiculeType: '',
        vehiculeBrand: '',
        vehiculePlate: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);  // Nouveau state pour le modal

    const navigate = useNavigate();

    const handleRoleSelection = (role) => {
        setIsCourier(role === 'Coursier');
        setFormData({ ...formData, role });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Validation pour le numéro de téléphone
        if (name === "tel") {
            let sanitizedValue = value.replace(/\D/g, '');
            if (sanitizedValue.length > 8) {
                sanitizedValue = sanitizedValue.slice(0, 8);
            }
            setFormData({ ...formData, [name]: sanitizedValue });
        } else {
            setFormData({ ...formData, [name]: value });
        }
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
            setIsSuccessModalOpen(true);  // Ouvre le modal en cas de succès
            setTimeout(() => {
                setIsSuccessModalOpen(false);
                navigate('/login');  // Redirige après la fermeture du modal
            }, 3000);  // Le modal disparaît après 3 secondes
        } catch (error) {
            console.error('Error creating account:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <section className="bg-white" style={{ 
            backgroundImage: "url('src/assets/topography.svg')", 
            backgroundSize: 'cover', 
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: '100vh'
        }}>
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
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="completename" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom complet</label>
                                    <input type="text" name="completename" id="completename" onChange={handleChange} value={formData.completename} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="nom & prénom" required=""/>
                                </div>
                                <div>
                                    <label htmlFor="tel" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Téléphone</label>
                                    <input 
                                        type="tel" 
                                        name="tel" 
                                        id="tel" 
                                        onChange={handleChange} 
                                        value={formData.tel} 
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="70 70 70 70" 
                                        required
                                    />
                                </div>
                                <div className="col-span-1">
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">E-mail</label>
                                    <input type="email" name="email" id="email" onChange={handleChange} value={formData.email} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                                </div>
                                <div className="col-span-1">
                                    <div className="flex items-center space-x-4">
                                        <label className="block mb-20 text-sm font-medium text-gray-900 dark:text-white">Sexe : </label>
                                        <label className="flex items-center">
                                            <input type="radio" name="sex" value="M" onChange={handleChange} className="form-radio text-primary-600 focus:ring-primary-600 dark:focus:ring-blue-500" required/>
                                            <span className="ml-2 text-sm text-gray-900 dark:text-white">M</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input type="radio" name="sex" value="F" onChange={handleChange} className="form-radio text-primary-600 focus:ring-primary-600 dark:focus:ring-blue-500" required/>
                                            <span className="ml-2 text-sm text-gray-900 dark:text-white">F</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="col-span-1 relative">
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mot de passe</label>
                                    <input 
                                        type={showPassword ? "text" : "password"} 
                                        name="password" 
                                        id="password" 
                                        onChange={handleChange} 
                                        value={formData.password} 
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="••••••••••" 
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 top-8 flex items-center text-sm leading-5"
                                    >
                                        {showPassword ? (
                                            <svg className="h-5 w-5 text-gray-500" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zM2.458 12C3.732 7.943 7.486 5 12 5c4.514 0 8.268 2.943 9.542 7-1.274 4.057-5.028 7-9.542 7-4.514 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        ) : (
                                            <svg className="h-5 w-5 text-gray-500" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zM2.458 12C3.732 7.943 7.486 5 12 5c4.514 0 8.268 2.943 9.542 7-1.274 4.057-5.028 7-9.542 7-4.514 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                               
                                <div className="col-span-1 relative">
                                    <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirmer le mot de passe</label>
                                    <input 
                                        type={showConfirmPassword ? "text" : "password"} 
                                        name="confirmPassword" 
                                        id="confirmPassword" 
                                        onChange={handleChange} 
                                        value={formData.confirmPassword} 
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="••••••••••" 
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 top-8 flex items-center text-sm leading-5"
                                    >
                                        {showConfirmPassword ? (
                                            <svg className="h-5 w-5 text-gray-500" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zM2.458 12C3.732 7.943 7.486 5 12 5c4.514 0 8.268 2.943 9.542 7-1.274 4.057-5.028 7-9.542 7-4.514 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        ) : (
                                            <svg className="h-5 w-5 text-gray-500" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zM2.458 12C3.732 7.943 7.486 5 12 5c4.514 0 8.268 2.943 9.542 7-1.274 4.057-5.028 7-9.542 7-4.514 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {isCourier && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <select name="vehiculeType" id="vehiculeType" onChange={handleChange} value={formData.vehiculeType} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                                            <option value="">Type de véhicule</option>
                                            <option value="tricycle">Tricycle</option>
                                            <option value="moto">Moto</option>
                                            <option value="voiture">Voiture</option>
                                        </select>
                                    </div>
                                    <div>
                                        <input type="text" name="vehiculeBrand" id="vehiculeBrand" onChange={handleChange} value={formData.vehiculeBrand} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Marque" required=""/>
                                    </div>
                                    <div className="col-span-2">
                                        <label htmlFor="vehiculePlate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Plaque d'immatriculation</label>
                                        <input type="text" name="vehiculePlate" id="vehiculePlate" onChange={handleChange}  value={formData.vehiculePlate} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="AA 0000" required=""/>
                                    </div>
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

            {/* Modal de succès */}
            {isSuccessModalOpen && (
                <div id="successModal" className="fixed top-4 right-4 flex items-center justify-center z-50">
                    <div className="relative p-4 w-full max-w-sm h-full md:h-auto">
                        <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                            <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 p-2 flex items-center justify-center mx-auto mb-3.5">
                                <svg aria-hidden="true" className="w-8 h-8 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span className="sr-only">Success</span>
                            </div>
                            <p className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Compte créé avec succès!</p>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default Register;
