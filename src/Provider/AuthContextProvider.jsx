import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "./firebase.config";
import PropTypes from 'prop-types';

export const AuthContext = createContext(null)

const AuthContextProvider = ({ children }) => {

    const [reload, setReload] = useState(false)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)


    // login
    const login = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    // signUp
    const signUp = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const updateUserProfile = (currentUser, name, url) => {
        return updateProfile(currentUser, { displayName: name, photoURL: url })
    }
    const popUpLogin = (provider) => {
        return signInWithPopup(auth, provider)
    }
    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setLoading(false)
                setUser(currentUser)
            } else {
                setLoading(false)
                setUser(null)
            }
        })
    }, [reload, user])
    const authInfo = { user, setReload, setUser, popUpLogin, loading, setLoading, signUp, updateUserProfile, login };
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};
AuthContextProvider.prototypes = {
    children: PropTypes.node.isRequired
}
export default AuthContextProvider;