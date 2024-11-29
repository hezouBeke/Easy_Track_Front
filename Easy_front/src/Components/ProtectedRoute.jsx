const ProtectedRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem('user'));

    // Vérifie le contenu du user dans le localStorage
    console.log("User from localStorage:", user);

    if (!user || !user.token) {
        return <Navigate to="/login" />;
    }

    // Redirige vers le bon tableau de bord en fonction du rôle
    if (user.role === 'Admin') {
        return <Navigate to="/dashboard/admin" />;
    }

    if (user.role === 'Coursier') {
        return <Navigate to="/dashboard/driver" />;
    }

    if (user.role === 'Client') {
        return <Navigate to="/dashboard/customer" />;
    }

    return children;
};
