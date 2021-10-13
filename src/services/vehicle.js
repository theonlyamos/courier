import firebase from 'gatsby-plugin-firebase'

export const createVehicle= async (vehicle) => {
    return await firebase.firestore().collection('vehicles').add(vehicle)
}

export const getVehicle = async(vehicleId) => {
    try {
        return await firebase.firestore().collection('vehicles').doc(vehicleId).get()
    }
    catch(error){
        console.log(error)
    }
}

export const updateUpdate = async(uid, user) => {
    return await firebase.firestore().collection('vehicles').doc(uid).update(user)
}

export const removeVehicle = async(uid) => {
    return await firebase.firestore().collection('vehicles').doc(uid).delete()
}

export const getVehicles = async(uid) => {
    return await firebase.firestore().collection('vehicles').where('userID', '==', uid).get()
}