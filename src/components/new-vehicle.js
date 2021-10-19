import React, { useEffect, useState, useRef, useContext } from "react"
import { navigate } from 'gatsby'
import { updateDBUser } from "../services/user"
import { createVehicle, getVehicle } from "../services/vehicle"
import { uploadFile } from '../services/storage'
import BackButtonNavbar from './back-button-navbar'
import { btn, btnLg, rounded10 } from '../pages/styles.module.css'
import { FirebaseContext } from "../services/firebase-provider"

const NewVehicle = () => {
    const { authToken, user } = useContext(FirebaseContext)
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [vehicleType, setVehicleType] = useState('truck')
    const [makeModel, setMakeModel] = useState('Toyota 2010')
    const [plateNumber, setPlateNumber] = useState('453566')
    const [colors, setColors] = useState('green white black')
    const [features, setFeatures] = useState('broken glass')
    const [pictures, setPictures] = useState([])
    const [imageTypes, setImageTypes] = useState([])
    const [imageLinks, setImageLinks] = useState([])
    const fileInputRef = useRef()

    useEffect(() => {
        if (!authToken){
            navigate('/app/login')
            return null
        }

        if ((imageLinks.length && pictures.length) && (imageLinks.length === pictures.length)){
            createNewVehicle()
        }
    }, [authToken, user, imageLinks, pictures])

    const selectImages = (e)=>{
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
            
            setImageTypes([...imageTypes, file.type])
            const reader = new FileReader();
            
            reader.onload = (function() {
                return function(e) {
                    setPictures([...pictures,e.target.result]);
                }
            })();
            reader.readAsDataURL(file);
        }

    }

    const uploadImages = async () =>{
        try {
            const links = []
            pictures.forEach(async(pic, i)=>{
                setIsLoading(true)
                const file = pictures[i]
                const format = imageTypes[i]
                const ext = format.split('/')[1]
                const base64 = file.split(',')[1]
                const path = `/vehicles/${new Date().getTime()}_${user.uid}.${ext}`
                const upload = await uploadFile(path, base64, format)
                const fileLink = await upload.ref.getDownloadURL()
                links.push(fileLink)
                if (links.length == pictures.length){
                    setImageLinks(links)
                    setIsLoading(false)
                } 
            })
        }
        catch(error){
            console.log(error)
            setIsLoading(false)
        } 
    }

    const createNewVehicle = async()=>{
        console.log(imageLinks)
        setIsLoading(true)
        const newVehicle = {
            userId: user.uid,
            vehicleType,
            makeModel,
            plateNumber,
            colors,
            features,
            images: imageLinks,
            createdAt: new Date().toUTCString(),
            updatedAt: new Date().toUTCString()
        }

        const result = await createVehicle(newVehicle)
        const vid = await getVehicle(result.id)
        const vehicle = vid.data()

        await updateDBUser(user.uid, {
            vehicleId: result.id,
            vehicle: {...vehicle},
            updatedAt: new Date().toUTCString()
        })
        navigate('/app/vehicle')

        setIsLoading(false)
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
            await uploadImages()
        }
        catch(error){
            console.log(error)
            setIsLoading(false)
        } 
    }

    return (
    <>
        <div className="modal fade" id="vehicleSizeModal" tabIndex="-1" aria-labelledby="vehicleSizeModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title text-uppercase text-muted">Select Vehicle/Truck Size</h5>
                    </div>
                    <div className="modal-body">
                        <div className={`card ${rounded10} bg-dark cursor-pointer`} data-bs-dismiss="modal" onClick={()=>{setVehicleType('pickup')}}>
                            <div className="row align-items-center ms-0">
                                <div className={`col-4 text-center ${rounded10} p-3 bg-white`}>
                                    <i className="fas fa-truck-pickup fa-3x"></i>
                                </div>
                                <div className="col-8 text-center">
                                    <h3 className="text-center text-white fw-bold">Pickup</h3>
                                </div>
                            </div>
                        </div>
                        <div className={`card ${rounded10} bg-dark mt-3 cursor-pointer`} data-bs-dismiss="modal" onClick={()=>{setVehicleType('truck')}}>
                            <div className="row align-items-center ms-0">
                                <div className={`col-4 text-center ${rounded10} p-3 bg-white`}>
                                    <i className="fas fa-truck fa-3x"></i>
                                </div>
                                <div className="col-8 text-center">
                                    <h3 className="text-center text-white fw-bold">Truck</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="container">
            <BackButtonNavbar pageTitle="New Vehicle"/>
            <div className={`w-100 mt-3 text-center`}>
                <i className={`fas fa-truck fa-2x`}></i>
                <div className={`h5 mb-1 `}></div>
            </div>
        <form method='POST' className="mb-4" onSubmit={handleSubmit}>
            <div className={`row align-items-center justify-content-center`}>
                <div className={`col-md-6 col-lg-5`}>
                    { (error.length > 1) && (
                        <div className="alert alert-danger p-2">
                            { error }
                        </div>
                    )}
                        
                        <div className="form-group mt-3">
                            <label className="text-secondary">Vehicle/Truck Type</label>
                            <div className={`input-group border rounded`}>
                                <input
                                type='text'
                                value={ vehicleType }
                                className="form-control border-0 bg-white text-capitalize"
                                required
                                readOnly
                                data-bs-toggle="modal"
                                data-bs-target="#vehicleSizeModal"/>
                                <span className={`input-group-text border-0 bg-white text-secondary`}>
                                    <i className={`fas fa-truck`}></i>
                                </span>
                            </div>
                        </div>
                        <div className={`input-group border rounded mt-3`}>
                            <input
                            type='text'
                            placeholder="Make/Model"
                            onChange={ e => {
                                    setMakeModel(e.target.value)
                            }}
                            value={ makeModel }
                            className="form-control border-0 bg-white text-capitalize"
                            required/>
                            <span className={`input-group-text border-0 bg-white text-secondary`}>
                                <i className="fas fa-toolbox"></i>
                            </span>
                        </div>
                        <div className={`input-group border rounded mt-3`}>
                            <input
                            type='text'
                            placeholder="Plate Number"
                            onChange={ e => {
                                    setPlateNumber(e.target.value)
                            }}
                            value={ plateNumber }
                            className="form-control border-0 bg-white text-capitalize"
                            required/>
                            <span className={`input-group-text border-0 bg-white text-secondary`}>
                                <i className="fas fa-credit-card"></i>
                            </span>
                        </div>
                        <div className={`input-group border rounded mt-3`}>
                            <input
                            type='text'
                            placeholder="Colors"
                            onChange={ e => {
                                    setColors(e.target.value)
                            }}
                            value={ colors }
                            className="form-control border-0 bg-white text-capitalize"
                            required/>
                            <span className={`input-group-text border-0 bg-white text-secondary`}>
                                <i className="fas fa-palette"></i>
                            </span>
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="features" className="text-secondary">Other identifiable features</label>
                            <textarea 
                                id="features" 
                                rows="2" 
                                className="form-control"
                                onChange={ e => {
                                    setFeatures(e.target.value)
                                }}
                                value={features}
                                required
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <div className="row align-items-center">
                                {pictures && pictures.map((pic,i)=>(
                                    <div className="col-4 mt-3" key={i}>
                                        <div 
                                            className="card shadow" 
                                            style={{width: '100px', 
                                                    height: '90px'
                                            }}>
                                            <img 
                                                src={pic}
                                                style={{width: '100%', 
                                                height: '100%', 
                                                objectFit: 'cover', 
                                                objectPosition: 'top'}}
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                ))}
                                <div className="col-4">
                                    <button 
                                        type="file" 
                                        className="btn btn-light" 
                                        onClick={selectImages}>
                                        <i className="fas fa-file-image fa-3x"></i>
                                    </button>
                                    <input 
                                        ref={fileInputRef}
                                        type="file" 
                                        className="d-none"
                                        multiple 
                                        accept="image/*"
                                        onChange={handleFiles}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={`form-group mt-3`}>
                            {isLoading && (
                                <button className={`${btn} btn-dark ${btnLg} w-100 text-uppercase`}>
                                    <i className="fas fa-spin fa-spinner"></i>
                                </button>
                            )}
                            {!isLoading && (
                                <button className={`${btn} btn-dark ${btnLg} w-100 text-uppercase`}>Add Vehicle</button>
                            )}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </>
)}

export default NewVehicle
