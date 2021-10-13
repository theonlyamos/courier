import React, {
    useContext,
    useState,
    useEffect
} from "react";
import firebase from 'gatsby-plugin-fireabase'
import {
    Signin,
    Signup
} from '../services/auth'

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

const AuthProvider = ({
    children
}) => {
    const [currentUser, setCurrentUser] = useState();

    function signup(email, password) {
        return Signup(email, password);
    }

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            setCurrentUser(user);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        signup,
    };
    return <AuthContext.Provider value = {value} > {children} </AuthContext.Provider>;
};

export default AuthProvider;