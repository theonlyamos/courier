import React, { useEffect, useState } from "react"
import { navigate, Link } from 'gatsby'
import { isAuthenticated, getUser } from "../services/auth"
import { getDBUser, updateDBUser } from "../services/user"
import Layout from '../components/layout'
import { rounded10 } from '../pages/styles.module.css'
//import Geocode from 'react-geocode'
import * as opencage from 'opencage-api-client'

const Vehicle = () => {
    const [user, setUser] = useState(null)
    const [userInfo, setUserInfo] = useState({})
    const [error, setError] = useState('')
    const [location, setLocation] = useState('')
    const [locationLat, setLocationLat] = useState('')
    const [locationLon, setLocationLon] = useState('')
    const [isFetchingLocation, setIsFetchingLocation] = useState(false)
    const [vehicle, setVehicle] = useState('')

    const getUserInfo = ()=>{
        getDBUser(getUser().toJSON().uid)
        .then((result)=>{
            const driver = result.data()
            setUserInfo(driver)
            if (!Object.keys(driver.subscription).length){
                navigate('/app/pricing')
                return null
            }

            if (driver.vehicle){
                setVehicle(driver.vehicle)
            }
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    useEffect(() => {
        if (!isAuthenticated()){
            navigate('/app/login')
            return null
        } 
        
        setUser(getUser().toJSON())
        getUserInfo()
    }, [])

    return (
    <Layout>
        {error && (
            <div className="container position-absolute bottom-0 mb-3 left-0">
                <div className={`row align-items-center justify-content-center`}>
                    <div className={`col-sm-9 col-md-6 col-lg-3`}>
                        <div className="alert alert-danger alert-dismissible" role="alert">
                            <span>{error}</span>
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </div>
                </div>
            </div>
        )}
        <div className="container mt-5">
            <div className={`row align-items-center justify-content-center`}>
                <div className={`col-sm-9 col-md-6 col-lg-3`}>
                    {!vehicle && (
                        <div className={`w-100 d-flex flex-column justify-content-center align-items-center`} style={{minHeight: '50vh'}}>
                            <i className="fas fa-truck-moving fa-3x text-muted"></i>
                            <Link to="/app/vehicle/new" className={`btn btn-primary ${rounded10} mt-3 text-white font-monospace`}>Add Vehicle/Truck</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </Layout>
)}

export default Vehicle