import firebase from 'gatsby-plugin-firebase'

export const isBrowser = () => typeof window !== "undefined"

export const signup = async (email, password) => {
    return await firebase.auth().createUserWithEmailAndPassword(email, password)
}

export const signin = async (email, password) => {
    return await firebase.auth().signInWithEmailAndPassword(email, password)
}

export const getUser = () => (
    firebase.auth().currentUser
)

export const updateUser = async (user)=>{
    return await firebase.auth().currentUser.updateProfile(user)
}

export const logout = async() => {
    if (firebase.auth().currentUser){
        console.log('Logging out...')
        return await firebase.auth().signOut()
    }
    return
}

export const isAuthenticated = () => {
    const user = firebase.auth().currentUser

    return !!user
}