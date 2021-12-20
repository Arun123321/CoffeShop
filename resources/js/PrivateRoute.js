import React from 'react';
import { Route, Navigate  } from 'react-router-dom';
const PrivateRoute = ({component: Component, ...rest}) => {
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /login page
        <Route {...rest} render={props => (
            sessionStorage.isAuth==='true' ?
                <Component {...props} />
                : <Navigate  to="/CoShop/public/login" />
        )} />
    );
};

export default PrivateRoute;