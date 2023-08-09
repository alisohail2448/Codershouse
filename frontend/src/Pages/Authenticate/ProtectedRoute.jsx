import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ isAuth, user }) => {
    return isAuth ? (
        user.activated ? <Outlet /> : <Navigate to="/activate" replace />
    ) : (
        <Navigate to="/" replace />
    );
};

export default ProtectedRoute;

// import React from "react";
// import { Navigate, Outlet } from "react-router-dom";

// const ProtectedRoute = ({ isAuth, user }) => {
//   if (!isAuth) {
//     return <Navigate to="/" replace />;
//   }

//   if (user === undefined || (user !== undefined && !user.activated)) {
//     return <Navigate to="/activate" replace />;
//   }

//   return <Outlet />;
// };

// export default ProtectedRoute;


// So listen i want to elaborate what im doing whenever i start my i have created steps first i put mobile number then i got otp and then after otp verification i went to put our name page after that then i got the field for choose image after that one process i got my user is activated if in future user just trying to logged in but it's not activated it should be redirect to activate page and now im doing logout functionality using the user is null then it;s showing error in protected route error user is undefined