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
    
    /*
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
    */


    useEffect(() => {
        /*
        if (!isAuthenticated()){
            navigate('/app/login')
            return null
        } 
        
        setUser(getUser().toJSON())
        getUserInfo()
        */
    }, [])

    return (
    <Layout>
        <div className="container mt-5" style={{minHeight: '85vh'}}>
            <div className={`row align-items-center justify-content-center`}>
                <div className={`col-lg-6`}>
                    {!vehicle && (
                        <div className={`d-flex justify-content-center align-items-center border border-primary ${rounded10}`} style={{maxWidth: 'fit-content'}}>
                            <i className="fas fa-truck-moving fa-2x ps-3"></i>
                            <Link to="/app/vehicle/new" className={`btn btn-primary ${rounded10} text-white font-monospace ms-3`}>Add Vehicle/Truck</Link>
                        </div>
                    )}
                    <div className="row py-4 border-bottom">
                        <div className="col-6">
                            <div className={`card ${rounded10} border-2`}>
                                <div className="card-body d-flex flex-column align-items-center justify-center">
                                    <div className="h3 fw-bold">3</div>
                                    <div className="h6 text-secondary">Total Orders</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <header className="lead text-center text-secondary fw-bold mt-5">Recent Orders</header>
                    <div className="table-responsive mt-4">
                        <table className="table table-hover table-striped table-dark">
                            <thead>
                                <tr>
                                    <th className="small">#</th>
                                    <th className="small">Price</th>
                                    <th className="small">Location</th>
                                    <th className="small">Destination</th>
                                    <th className="small">Date</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
)}

export default Driver