// import React from "react";
// import { Route, Navigate } from "react-router-dom";


// const SemiProtectedRoute = ({ path, element: Element, isAuth, user }) => {
//   return (
//     <Route
//       path={path}
//       element={isAuth ? (
//         !user.activated ? (
//           <Element />
//         ) : (
//           <Navigate to="/rooms" replace />
//         )
//       ) : (
//         <Element />
//       )}
//     />
//   );
// };

// export default SemiProtectedRoute;




import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const SemiProtectedRoute = ({ isAuth, user }) => {
    if (isAuth) {
        if (user && user.activated) {
            return <Navigate to="/rooms" replace />;
        } else {
            return <Outlet />;
        }
    } else {
        return <Outlet />;
    }
};

export default SemiProtectedRoute;

