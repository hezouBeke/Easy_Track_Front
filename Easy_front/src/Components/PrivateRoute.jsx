import React from 'react';
import { Navigate } from 'react-router-dom';
import authService from '../services/authService';

const PrivateRoute = ({ element: Component, allowedRoles, ...rest }) => {
    const user = authService.getCurrentUser();

    if (!user) {
        // Redirige vers la page de connexion si l'utilisateur n'est pas connecté
        return <Navigate to="/login" />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        // Redirige vers une page d'erreur si l'utilisateur n'a pas les droits
        return <Navigate to="/unauthorized" />;
    }

    // Autorise l'accès si l'utilisateur est connecté et son rôle est autorisé
    return <Component {...rest} />;
};

export default PrivateRoute;
