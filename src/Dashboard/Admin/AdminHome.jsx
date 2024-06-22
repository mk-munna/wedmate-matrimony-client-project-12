import React, { useContext } from 'react';
import { FaBook, FaDollarSign, FaUsers } from 'react-icons/fa';
import { AuthContext } from '../../Provider/AuthContextProvider';

const AdminHome = () => {
    const {user} = useContext(AuthContext)
    return (
        <div className='pt-16 pl-12'>
            <h2 className="text-3xl dark:text-heading2">
                <span>Hi, Welcome </span>
                {
                    user?.displayName ? user.displayName + " !" : 'Back !'
                }
            </h2>
        </div>
    );
};

export default AdminHome;