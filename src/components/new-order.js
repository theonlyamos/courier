import React, { useEffect, useState, useContext } from "react"
import { navigate } from 'gatsby'
import { createOrder } from "../services/order"
import { getDrivers } from "../services/user"
import BackButtonNavbar from './/back-button-navbar'
import { btn, btnLg, rounded10 } from '../pages/styles.module.css'
import * as opencage from 'opencage-api-client'
//import { usePlacesWidget } from "react-google-autocomplete";
import Geocode from 'react-geocode'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
//import { Helmet } from 'react-helmet'
import {useJsApiLoader} from '@react-google-maps/api'
import { FirebaseContext } from "../services/firebase-provider"

const NewOrder = () => {
    const { authToken, user } = useContext(FirebaseContext)
    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyBUCHsKcPB42kheop8QdzlUPUSl43LJbVM",
        libraries: ["places"]
    });
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [isSuccess, setIsSuccess] = useState(false)
    const [cargoSize, setCargoSize] = useState('')
    const [location, setLocation] = useState({})
    const [destination, setDestination] = useState('')
    const [driverOptions, setDriverOptions] = useState([])
    const [driver, setDriver] = useState({})
    const [isFetchingLocation, setIsFetchingLocation] = useState(false)

    useEffect(() => {
        if (!authToken){
            navigate('/app/login')
            return null
        }
        //setUser(getUser().toJSON())
        Geocode.setApiKey("AIzaSyBUCHsKcPB42kheop8QdzlUPUSl43LJbVM")
    }, [authToken, user])
    /*
    const { ref, autocompleteRef } = usePlacesWidget({
        apiKey: process.env.GOOGLE_MAPS_API_KEY,
        onPlaceSelected: (place) => {
            console.log(place)
            console.log(place['geometry']);
        }
    });
    */

    const updateDrivers = async(city)=>{
        try {
            const snapshot = await getDrivers(city)
            if (snapshot.empty) {
                console.log('No drivers available');
            }
            const drivers = []
            snapshot.forEach(doc => {
                drivers.push(doc.data())
            })
            setDriverOptions(drivers)
        }
        catch(error){
            console.log(error)
        }
    }

    const getLocation = ()=>{
        setIsFetchingLocation(true)
        if ("geolocation" in navigator) {
            try {
                navigator.geolocation.getCurrentPosition(async function(position) {
                    if (position){
                        const data = await opencage.geocode({q: `${position.coords.latitude}, ${position.coords.longitude}`, key: "5e2fa48c562740639267690f8fb73597"})
                        if (data.results.length > 0){
                            let place = data.results[0]
                            setLocation({
                                ...place.geometry,
                                ...place.components,
                                formatted: place.formatted
                            })
                            setIsFetchingLocation(false)
                            updateDrivers(place.components.city)
                        }
                    }
                },(error)=>{
                    console.log(error)
                    setError(error.message)
                    setIsFetchingLocation(false)
                })
            }
            catch(error){
                console.log(error)
                setError(error)
                setIsFetchingLocation(false)
            }
        } else {
            setError('Geolocation is not available on your device')
            setIsFetchingLocation(false)
        }
        
    }

    const autocompleteSelect = async(e)=>{
        setDestination(e.label)

        const data = await opencage.geocode({q: e.label, key: "5e2fa48c562740639267690f8fb73597"})
        if (data.results.length > 0){
            let place = data.results[0]
            setDestination({
                ...place.geometry,
                ...place.components,
                formatted: place.formatted
            })

        }
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
            setIsLoading(true)
            const result = await createOrder({
                location,
                destination,
                driverID: driver.uid,
                driver,
                cargoSize,
                user,
                userID: user.uid,
                createdAt: new Date().toUTCString(),
                updatedAt: new Date().toUTCString()
            })

            setIsLoading(false)
            setIsSuccess(true)
            setTimeout(()=>{
                navigate(`/app/orders/${result.id}`)
            }, 3000)
        }
        catch(error){
            console.log(error)
            setIsLoading(false)
            setError(error.message)
        }
    }

    const selectDriver = (value)=>{
        setDriver(value)
    }

    const selectCargoSize = (value)=>{
        setCargoSize(value)
    }

    return (
    <>
        <div className="modal fade" id="cargoSizeModal" tabIndex="-1" aria-labelledby="cargoSizeModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header bg-secondary">
                        <h5 className="modal-title text-uppercase text-muted">Select Cargo Size</h5>
                    </div>
                    <div className="modal-body">
                        <div className={`card ${rounded10} bg-dark cursor-pointer`} data-bs-dismiss="modal" onClick={()=>{selectCargoSize('Pickup')}}>
                            <div className="row align-items-center ms-0">
                                <div className={`col-4 text-center ${rounded10} p-3 bg-white`}>
                                    <i className="fas fa-truck-pickup fa-3x"></i>
                                </div>
                                <div className="col-8 text-center">
                                    <h3 className="text-center text-white fw-bold">Pickup</h3>
                                </div>
                            </div>
                        </div>
                        <div className={`card ${rounded10} bg-dark mt-3 cursor-pointer`} data-bs-dismiss="modal" onClick={()=>{selectCargoSize('Truck')}}>
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
        <div className="modal fade" id="driversModal" tabIndex="-1" aria-labelledby="driversModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header bg-secondary">
                        <h5 className="modal-title">Select Driver</h5>
                    </div>
                    <div className="modal-body">
                        <ul className="list-group list-group-flush">
                            {driverOptions.map((opt, i)=>(
                                <div key={i} className={`card ${rounded10} bg-dark mt-3 cursor-pointer`} data-bs-dismiss="modal" onClick={()=>{selectDriver(opt)}}>
                                    <div className="row ms-0">
                                        <div className={`col-4 text-center ${rounded10} p-3 bg-white`}>
                                            {opt.photoURL ? (
                                                <img 
                                                    src={opt.photoURL}
                                                    className="w-100 img-fluid"
                                                    style={{objectFit: 'cover', objectPosition: 'top'}}
                                                    />
                                            ) : (
                                                <img 
                                                    src={opt.vehicle.images[0]}
                                                    className="w-100 img-fluid"
                                                    style={{objectFit: 'cover', objectPosition: 'top'}}
                                                    />
                                            )}
                                        </div>
                                        <div className="col-8 text-center d-flex flex-column justify-content-center">
                                            <h4 className="text-center text-white">{opt.displayName}</h4>
                                            <h4 className="text-center text-warning">
                                                <i className="fas fa-phone-alt fa-fw"></i>{opt.phoneNumber.slice(0,5)}......</h4>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        
        <div className="container">
            <BackButtonNavbar pageTitle="New Order"/>
            <div className={`w-100 mt-5 text-center`}>
                <i className={`fas fa-truck-loading fa-2x`}></i>
                <div className={`h5 my-3`}></div>
            </div>
        <form method='POST' className="mb-4" onSubmit={handleSubmit}>
            <div className={`row align-items-center justify-content-center`}>
                <div className={`col-md-6 col-lg-5`}>
                        { (error.length > 1) && (
                            <div className="alert alert-danger alert-dismissible fade show p-2">
                                { error }
                                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>
                        )}
                        {isSuccess && (
                                <div className="alert alert-success alert-dismissible fade show">
                                    Order created successfully
                                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>
                            )}
                        <div className="form-group mt-3">
                            <label className="text-secondary">Select Cargo Size</label>
                            <div className={`input-group border rounded`}>
                                <input
                                type='text'
                                value={ cargoSize }
                                className={`form-control border-0 bg-white`}
                                required
                                readOnly
                                data-bs-toggle="modal"
                                data-bs-target="#cargoSizeModal"/>
                                <span className={`input-group-text border-0 bg-white text-secondary`}>
                                <i className={`fas fa-truck`}></i>
                                </span>
                            </div>
                        </div>
                        
                        <div className="form-group my-3">
                            <label className="text-secondary">Click on button to detect location</label>
                            <div className={`input-group border rounded`}>
                                <input
                                type='text'
                                id="location"
                                onChange={ e => {
                                    setLocation(e.target.value)
                                }}
                                value={ location.county }
                                className={`form-control border-0`}
                                required/>
                                <button type="button" className={`input-group-text border-0 btn btn-primary text-white`} onClick={getLocation}>
                                    {isFetchingLocation ? (<i className="fas fa-spin fa-spinner"></i>) : (<i className="fas fa-map-marker-alt"></i>)}
                                </button>
                            </div>
                        </div>
                        <div className="form-group my-3">
                            <label className="text-secondary">Enter destination address</label>
                            {isLoaded && (
                                <GooglePlacesAutocomplete
                                placeholder="Enter Destination Address"
                                apiKey={`AIzaSyBUCHsKcPB42kheop8QdzlUPUSl43LJbVM`}
                                selectProps={{
                                    destination,
                                    onChange: autocompleteSelect,
                                }}
                                
                                />
                            )}
                        </div>
                        {/*
                        <div className={`input-group mt-3 border rounded`}>
                            <input
                            type='text'
                            ref={ref}
                            onChange={ e => {
                                setDestination(e.target.value)
                            }}
                            value={ destination }
                            className={`form-control border-0`}
                            placeholder='Enter Destination Address'
                            required/>
                            <span className={`input-group-text bg-white`}>
                            <i className={`fas fa-map-marker-alt`}></i>
                            </span>
                        </div>
                        */
                        }
                        <div className="form-group mt-3">
                            <label className="text-secondary">Select Driver</label>
                            <div className={`input-group border rounded`}>
                                <input
                                type='text'
                                id="driver"
                                value={ driver.displayName }
                                className={`form-control border-0 bg-white`}
                                required
                                readOnly
                                data-bs-toggle="modal"
                                data-bs-target="#driversModal"/>
                                <span className={`input-group-text border-0 bg-white text-secondary`}>
                                <i className="fas fa-user-check"></i>
                                </span>
                            </div>
                        </div>

                        <div className={`form-group mt-3`}>
                            
                            {isLoading ? (
                                <button type="submit" className={`${btn} btn-dark ${btnLg} w-100 text-uppercase`} disabled>
                                    <i className="fas fa-spin fa-spinner fa-fw"></i> Submitting...
                                </button>
                            ) : (
                                <button className={`${btn} btn-dark ${btnLg} w-100 text-uppercase`}>Submit</button>
                            )}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </>
)}

export default NewOrder
