import firebase from 'gatsby-plugin-firebase'

export const createOrder= async (order) => {
    return await firebase.firestore().collection('orders').add(order)
}

export const getOrder = async(orderId) => {
    try {
        return await firebase.firestore().collection('orders').doc(orderId).get()
    }
    catch(error){
        console.log(error)
    }
}

export const updateUpdate = async(uid, user) => {
    return await firebase.firestore().collection('orders').doc(uid).update(user)
}

export const removeOrder = async(uid) => {
    return await firebase.firestore().collection('orders').doc(uid).delete()
}

export const getOrders = async(uid) => {
    return await firebase.firestore().collection('orders').where('userID', '==', uid).get()
}