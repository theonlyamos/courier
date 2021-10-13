import firebase from 'gatsby-plugin-firebase'

export const uploadFile = async(path, file, format)=>{
    return await firebase.storage().ref(path).putString(file, 'base64', {contentType: `${format}`})
}