import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user || !user.token) {
        return <Navigate to="/login" />;  // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
    }

    return children;  // Si l'utilisateur est authentifié, rendre la route demandée
};

export default ProtectedRoute;
