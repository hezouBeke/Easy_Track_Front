import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/authService";
// import ChatBot from "./ChatBot";
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await authService.login(email, password);
            const { role } = response;

            // Redirection selon le rôle de l'utilisateur
            if (role === 'Client') {
                navigate('/dashboard/customer');
            } else if (role === 'Coursier') {
                navigate('/dashboard/driver');
            } else if (role === 'Admin') {
                navigate('/dashboard/admin');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed: ' + (error.response?.data?.message || error.message));
        }
    };

    
    return (
        <>
        <section className="h-screen flex">
            {/* Section pour le formulaire */}
            <div className="w-full md:w flex items-center justify-center font-thin  p-6 bg-white">
                <div className="w-full max-w-md bg-gray-800 rounded-lg shadow">
                    <div className="p-6 space-y-4 md:space-y-6">
                        <div className="text-center mb-6">
                            <a href='/home' className="flex justify-center font-thin items-center text-2xl  text-white">
                                <img className="w-10 h-10 mr-2" src="./src/assets/logo2.png" alt="logo"/>
                                EasyTrack
                            </a>
                        </div>
                        <h1 className="text-xl leading-tight tracking-tight font-thin text-white md:text-2xl">
                            Connexion
                        </h1>
                        <form onSubmit={handleLogin} className="space-y-4 md:space-y-6">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-thin text-white">E-mail</label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    id="email"  
                                    value={email}  
                                    onChange={(e) => setEmail(e.target.value)}  
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"  
                                    placeholder="name@company.com"  
                                    required 
                                />
                            </div>
                            <div className="relative">
                                <label htmlFor="password" className="block mb-2 text-sm font-thin text-white">Mot de passe</label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 top-5 flex items-center text-sm leading-5"
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
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="remember"
                                            aria-describedby="remember"
                                            type="checkbox"
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-gray-500">Se rappeler de moi</label>
                                    </div>
                                </div>
                                <Link to="/reset-password" className="text-sm font-medium text-primary-600 hover:underline">Mot de passe oublié?</Link>
                            </div>
                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-thin rounded-lg text-sm px-5 py-2.5 text-center">Se connecter</button>
                            <p className="text-sm font-light text-gray-500">
                                Vous n'avez pas de compte? <Link to="/register" className="font-medium text-primary-600 hover:underline">S'enregistrer</Link>
                            </p>
                        </form>
                    </div>

                    {/* Section de l'image */}
                    <div className="hidden md:block w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('./src/assets/login.jpg')" }}>
                    </div>
                </div>
            </div>
        </section>
        {/* <ChatBot /> */}
        </>
    );
}

export default Login;
