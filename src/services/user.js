import firebase from 'gatsby-plugin-firebase'

export const createDBUser = async (user) => {
    return await firebase.firestore().collection('users').doc(user.uid).set(user)
}

export const getDBUser = async(uid) => {
    try {
        return await firebase.firestore().collection('users').doc(uid).get()
    }
    catch(error){
        console.log(error)
    }
}

export const updateDBUser = async(uid, user) => {
    return await firebase.firestore().collection('users').doc(uid).update(user)
}

export const removeDBUser = async(uid) => {
    return await firebase.firestore().collection('users').doc(uid).delete()
}

export const getDrivers = async(city) => {
   // return await firebase.firestore().collection('users').where('utype', '==', 'driver').where('city', '==', city).where('vehicle', '!=', null).get()
     return await firebase.firestore().collection('users').where('utype', '==', 'driver').where('vehicle', '!=', null).get()

}
