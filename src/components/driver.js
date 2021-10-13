import React, { useEffect, useState } from "react"
import { navigate, Link } from 'gatsby'
import { isAuthenticated, getUser } from "../services/auth"
import { getDBUser, updateDBUser } from "../services/user"
import Layout from '../components/layout'
import { rounded10 } from '../pages/styles.module.css'

const Driver = ({location}) => {
    const [user, setUser] = useState(null)
    const [userInfo, setUserInfo] = useState({})
    const [isFetchingVehicle, setIsFetchingVehicle] = useState(false)
    const [vehicle, setVehicle] = useState('')

    const getUserInfo = ()=>{
        getDBUser(getUser().toJSON().uid)
        .then((result)=>{
            const driver = result.data()
            setUserInfo(driver)

            if (driver.utype !== 'driver'){
                navigate('/app/login')
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
        <div className="container mt-5" style={{minHeight: '85vh'}}>
            {!vehicle && (
                <div className={`d-flex justify-content-center align-items-center border border-primary ${rounded10}`} style={{maxWidth: 'fit-content'}}>
                    <i className="fas fa-truck-moving fa-2x ps-3"></i>
                    <Link to="/app/vehicle/new" className={`btn btn-primary ${rounded10} text-white font-monospace ms-3`}>Add Vehicle/Truck</Link>
                </div>
            )}
            <div className="row py-4 border-bottom">
            </div>
        </div>
    </Layout>
)}

export default Driver