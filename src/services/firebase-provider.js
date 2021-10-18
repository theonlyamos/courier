import React, {useState, useEffect, createContext} from 'react'
import * as PropTypes from 'prop-types'
import firebase from 'gatsby-plugin-firebase'

export const FirebaseContext = createContext({
    firebase,
    authToken: null,
    user: null,
    setUser: ()=>{},
    setAuthToken: ()=>{}
})

FirebaseContext.PropTypes = {
    firebase: typeof firebase,
    user: PropTypes.object,
    setUser: PropTypes.func,
    authToken: PropTypes.string | null,
    setAuthToken: PropTypes.func
}

export const FirebaseProvider = ({children})=>{

    // If we have a window and the authToken already exists in localstorage then initialize the authToken value otherwise null.
    const [authToken, setAuthToken] = useState(
        (typeof window !== 'undefined' && window.localStorage.getItem('authToken')) | null
    )

    const [user, setUser] = useState(
        (typeof window !== 'undefined' && window.localStorage.hasOwnProperty('user')) ? JSON.parse((typeof window !== 'undefined' && window.localStorage.getItem('user'))) : null
    )

    // A method for setting the authToken in state and local storage.
    const onSetAuthToken = (token) => {
        setAuthToken(token)
        localStorage.setItem('authToken', token)
    }

    const onSetUser = (user) =>{
        setUser(user)
        localStorage.setItem('user', user ? JSON.stringify(user) : user)
    }

    // If we have the window object and there is no authToken then try to get the authToken from local storage.
    useEffect(() => {
        if (!authToken) {
            const token = localStorage.getItem('authToken')

            if (token) {
                onSetAuthToken(token)
                //console.log(firebase.auth().currentUser)
                //onSetUser(firebase.auth().currentUser)
            }
        }
        if (!user) {
            const userStore = localStorage.getItem('user')

            if (userStore) {
                onSetUser(JSON.parse(userStore))
            }
        }
    }, [authToken, user])

    return (
        <FirebaseContext.Provider
            value={{
            authToken,
            firebase,
            user,
            setUser: onSetUser,
            setAuthToken: onSetAuthToken
            }}>
            {children}
        </FirebaseContext.Provider>
    )

}
