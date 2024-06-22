import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "./firebase.config";
import { useQuery } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import useAxiosPublic from "../Hooks/useAxiosPublic";

// Create AuthContext
export const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
    const [reload, setReload] = useState(false);
    const [user, setUser] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [bioDataInfo, setBioDataInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    // Function to login
    const login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const signUp = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const updateUserProfile = (currentUser, name, url) => {
        return updateProfile(currentUser, { displayName: name, photoURL: url });
    };

    const popUpLogin = (provider) => {
        return signInWithPopup(auth, provider);
    };
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    const axiosPublic = useAxiosPublic();
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            if (currentUser) {
                const userInfo = { email: currentUser.email };
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                            console.log('Token received:', res.data.token); // Debug log
                            localStorage.setItem('access-token', res.data.token);
                            setLoading(false);
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching token:', error); // Debug log
                    });
            }
            else {
                localStorage.removeItem('access-token');
                setLoading(false);
            }
        });
        return () => {
            return unsubscribe();
        }
    }, [axiosPublic]);

    // Define authInfo object
    const authInfo = {
        userInfo,
        setUserInfo,
        bioDataInfo,
        setBioDataInfo,
        user,
        setReload,
        setUser,
        popUpLogin,
        loading,
        setLoading,
        signUp,
        updateUserProfile,
        login,
        logOut
    };
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

// Define PropTypes
AuthContextProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default AuthContextProvider;
