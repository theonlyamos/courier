import React, { useEffect, useState, useRef } from "react"
import { navigate, Link } from 'gatsby'
import { isAuthenticated, getUser, updateUser } from "../services/auth"
import { getDBUser, updateDBUser } from "../services/user"
import { uploadFile } from '../services/storage'
import NavBar from '../components/nav-bar'
import { rounded10 } from '../pages/styles.module.css'

const Account = ({location}) => {
    const [user, setUser] = useState({})
    const [userInfo, setUserInfo] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [profilePicture, setProfilePicture] = useState('')
    const [photoURL, setPhotoURL] = useState('')
    const [pictureFormat, setPictureFormat] = useState('')
    const [displayName, setDisplayName] = useState('') 
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const fileInputRef = useRef()

    const getUserInfo = async()=>{
        try {
            const result = await getDBUser(getUser().toJSON().uid)
            if (result.exists){
                const account = result.data()
                setPhotoURL(account.photoURL)
                setDisplayName(account.displayName)
                setPhoneNumber(account.phoneNumber)
                setEmail(account.email)
                setUserInfo(account)
            }
            
        }
        catch(error) {
            console.log(error)
        }
    }


    useEffect(() => {

        if (!isAuthenticated()){
            navigate('/app/login')
            return null
        } 

        if (profilePicture){
            updateProfilePicture()
        }

        setUser(getUser())
        getUserInfo()
    }, [user, profilePicture])
    

    const selectImage = (e)=>{
        e.preventDefault()
        fileInputRef.current.click()
    }

    const handleFiles = (e)=>{
        const files = e.target.files;

        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            if (!file.type.startsWith('image/')) {
                continue
            }
            setPictureFormat(file.type)
            const reader = new FileReader();
            
            reader.onload = (function() {
                return function(e) {
                    setProfilePicture(e.target.result);
                }
            })();
            reader.readAsDataURL(file);
        }
    }

    const updateProfilePicture = async()=>{
        try {
            setIsLoading(true)
            const file = profilePicture
            const format = pictureFormat
            const ext = format.split('/')[1]
            const base64 = file.split(',')[1]
            const path = `/users/${new Date().getTime()}_${user.uid}.${ext}`
            const upload = await uploadFile(path, base64, format)
            const link = await upload.ref.getDownloadURL()
            setPhotoURL(link)
            await updateUser({photoURL: link})
            await updateDBUser(getUser().toJSON().uid, {
                photoURL: link,
                updatedAt: new Date().toUTCString()
            })
            setIsUploading(false)
        }
        catch(error){
            console.log(error)
            setIsUploading(false)
        }
    }

    const updateUserInfo = async()=>{
        try {
            setIsLoading(true)
            await updateDBUser(user.uid, {
                displayName,
                email,
                phoneNumber,
                updatedAt: new Date().toUTCString()
            })
            setIsLoading(false)
            setIsSuccess(true)
        }
        catch(error){
            console.log(error)
            setIsLoading(false)
        }
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        await updateUserInfo()
    }

    return (
    <>
        <NavBar pageTitle='Account'></NavBar>
        <div className="container mt-5" style={{minHeight: '85vh'}}>
            <div className={`row align-items-center justify-content-center`}>
                <div className={`col-lg-6`}>
                    <div className="row justify-content-center py-4 border-bottom">
                        <div className="col-6 col-sm-4 col-md-3">
                            <div 
                                className={`card ${rounded10} position-relative shadow d-flex align-items-center justify-content-center cursor-pointer`} 
                                style={{minWidth: '100px', minHeight: '100px', cursor: 'pointer'}}
                                onClick={selectImage}>
                                {profilePicture ? (
                                    <img 
                                        src={profilePicture}
                                        style={{width: '100%', 
                                        height: '100%', 
                                        objectFit: 'cover', 
                                        objectPosition: 'top'}}
                                    />
                                )
                                :
                                photoURL ? (
                                    <img 
                                        src={photoURL}
                                        style={{width: '100%', 
                                        height: '100%', 
                                        objectFit: 'cover', 
                                        objectPosition: 'top'}}
                                    />
                                )
                                : (
                                    <i className="fas fa-user fa-3x"></i>
                                )
                                }
                                <i 
                                    className="fas fa-edit position-absolute text-primary"
                                    style={{bottom: '10px', right: '10px', cursor: 'pointer'}}></i>
                                {isUploading && (
                                    <i 
                                        className="fas fa-spin fa-spinner fa-2x position-absolute text-danger text-center"
                                        style={{right: 'calc(50%-20px)', transform: 'translateX(50%)'}}></i>
                                )}
                            </div>
                            <input 
                                ref={fileInputRef}
                                type="file" 
                                className="d-none"
                                accept="image/*"
                                onChange={handleFiles}
                            />
                        </div> 
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="row mt-3">
                            {isSuccess && (
                                <div className="alert alert-success alert-dismissible fade show">
                                    User info updated successfully
                                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>
                            )}
                            <div className="form-group col-12 mt-2">
                                <label htmlFor="displayName" className="text-secondary">Full Name</label>
                                <input 
                                    id="displayName" 
                                    className="form-control"
                                    onChange={ e => {
                                        setDisplayName(e.target.value)
                                    }}
                                    value={displayName}
                                    required/>
                            </div>
                            <div className="form-group col-12 mt-2">
                                <label htmlFor="email" className="text-secondary">Email Address</label>
                                <input 
                                    id="email" 
                                    className="form-control"
                                    onChange={ e => {
                                        setEmail(e.target.value)
                                    }}
                                    value={email}
                                    required/>
                            </div>
                            <div className="form-group col-12 mt-2">
                                <label htmlFor="phoneNumber" className="text-secondary">Phone Number</label>
                                <input 
                                    id="phoneNumber" 
                                    className="form-control"
                                    onChange={ e => {
                                        setPhoneNumber(e.target.value)
                                    }}
                                    value={phoneNumber}/>
                            </div>
                            <div className="form-group mt-3 text-center">
                                {isLoading ? (
                                    <button type="submit" className="btn btn-primary btn-lg w-100 text-uppercase" disabled>
                                        <i className="fas fa-spin fa-spinner fa-fw"></i> Updating...
                                    </button>
                                ) : (
                                    <button type="submit" className="btn btn-primary btn-lg w-100 text-uppercase">
                                        Update Info
                                    </button>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
)}

export default Account