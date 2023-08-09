import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ isAuth }) => {
    return isAuth ? <Navigate to="/rooms" /> : <Outlet />;
}

export default PrivateRoute;