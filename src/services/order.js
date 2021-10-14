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

export const updateOrder = async(uid, user) => {
    return await firebase.firestore().collection('orders').doc(uid).update(user)
}

export const removeOrder = async(uid) => {
    return await firebase.firestore().collection('orders').doc(uid).delete()
}

export const getOrdersCount = async(uid) => {
    return await (await firebase.firestore().collection('orders').where('userID', '==', uid).get()).size
}

export const getOrders = async(uid, limit=0) => {
    if (limit){
        return await firebase.firestore().collection('orders').where('userID', '==', uid).limit(limit).get()
    }
    else {
        return await firebase.firestore().collection('orders').where('userID', '==', uid).get()
    }
}

export const getDriverOrdersCount = async(uid) => {
    return await (await firebase.firestore().collection('orders').where('driverID', '==', uid).get()).size
}

export const getDriverOrders = async(uid, limit=0) => {
    if (limit){
        return await firebase.firestore().collection('orders').where('driverID', '==', uid).limit(limit).get()
    }
    else {
        return await firebase.firestore().collection('orders').where('driverID', '==', uid).get()
    }
}