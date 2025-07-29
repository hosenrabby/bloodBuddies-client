import React, { use } from 'react';
import { Navigate, useLocation } from 'react-router';
import Spinner from '../Components/Spinner';
import { AuthContext } from '../Context/AuthContext';

const PrivateRoute = ({children}) => {
    const {user, loading, setExpLocation} = use(AuthContext)

    const location = useLocation()
    setExpLocation(location.pathname)
    if (loading) {
        return <Spinner></Spinner>
    }
    if (!user) {
        return <Navigate state={location?.pathname} to={'/login'}></Navigate>
    } return children;
};

export default PrivateRoute;