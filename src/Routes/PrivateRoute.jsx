import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthContextProvider';




const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    // console.log(loading);
    if (loading) {
        return (
            <div className='flex justify-center items-center'>
                Loading...
            </div>
        )
    }
    if (user) {
        return children
    }
    // console.log('2', loading);
    return <Navigate to={'/login'} state={location.pathname}></Navigate>
};

export default PrivateRoute;