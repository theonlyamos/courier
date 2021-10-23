import React, { useEffect, useState, useContext } from "react"
import { navigate, Link } from 'gatsby'
import { isAuthenticated, getUser } from "../services/auth"
import { getDBUser, updateDBUser } from "../services/user"
import { getDriverOrders, getDriverOrdersCount } from "../services/order"
import NavBar from '../components/nav-bar'
import { rounded10 } from '../pages/styles.module.css'
import * as opencage from 'opencage-api-client'
import { placements } from "@popperjs/core"
import { FirebaseContext } from "../services/firebase-provider"

const Driver = ({location}) => {
    const { authToken, user, setUser } = useContext(FirebaseContext)
    //const [isFetchingVehicle, setIsFetchingVehicle] = useState(false)
    const [vehicle, setVehicle] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [orders, setOrders] = useState([])
    const [ordersCount, setOrdersCount] = useState(0)


    useEffect(() => {
        if (!authToken){
            navigate('/app/login')
            return null
        } 

		if(!orders)
        	getRecentOrders()
        getLocation()
        setInterval(getLocation, 300000)

    }, [authToken, getRecentOrders])

    const getRecentOrders = async()=>{
        try {
            setIsLoading(true)
            const snapshot = await getDriverOrders(user.uid, 10)
            if (!snapshot.empty){
                let allOrders = []
                snapshot.forEach(doc => {
                    allOrders.push({id: doc.id, ...doc.data()})
                })
                setOrders(allOrders)
                setIsLoading(false)
            }
            const count = await getDriverOrdersCount(user.uid)
            setOrdersCount(count)
            setIsLoading(false)
            
        }
        catch(error){
            console.log(error)
            setIsLoading(false)
        }
    }

    const getLocation = ()=>{
        if ("geolocation" in navigator) {
            try {
                navigator.geolocation.getCurrentPosition(async function(position) {
                    if (position){
                        const data = await opencage.geocode({q: `${position.coords.latitude}, ${position.coords.longitude}`, key: "5e2fa48c562740639267690f8fb73597"})
                        if (data.results.length > 0){
                            let place = data.results[0]
                            try{
                                const update ={
                                    location: {
                                        ...place.geometry,
                                        ...place.components,
                                        formatted: place.formatted
                                    },
                                    city: place.components.city,
                                    updatedAt: new Date().toUTCString()
                                }
                                //alert(JSON.stringify(update))
                                await updateDBUser(user.uid,update) 
                                let result = await getDBUser(user.uid)
                                if (result.exists){
                                	setUser(result.data())
                                }
                            }
                            catch(error){
                                console.log(error)
                            }
                        }
                    }
                },(error)=>{
                    console.log(error)
                })
            }
            catch(error){
                console.log(error)
            }
        } else {
            setError('Geolocation is not available on your device')
        }
        
    }

    return (
    <>
        <NavBar pageTitle='Home'></NavBar>
        <div className="container mt-2" style={{minHeight: '85vh'}}>
            <div className={`row align-items-center justify-content-center`}>
                <div className={`col-lg-6`}>
                    {user && !user.photoURL && (
                        <div className="alert alert-warning">
                            <span>Upload profile picture to complete setup.</span>
                            <Link to="/app/account" className="alert-link ms-2">Account Settings</Link>
                        </div>
                    )}
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
                                    <div className="h3 fw-bold">{ordersCount}</div>
                                    <div className="h6 text-secondary">Total Orders</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <header className="lead text-center text-secondary fw-bold mt-2">Recent Orders</header>
                    <div className="table-responsive mt-4">
                        <table className="table table-hover table-striped table-dark">
                            <thead>
                                <tr>
                                    <th className="small">#</th>
                                    <th className="small">Cargo Size</th>
                                    <th className="small">Location</th>
                                    <th className="small">Destination</th>
                                    <th className="small">Driver</th>
                                    {/*<th className="small">Price</th>*/}
                                    <th className="small">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading && (
                                    <tr>
                                        <td colSpan="7" className="small text-center text-muted">Loading...</td>
                                    </tr>
                                )}
                                {orders && orders.map((order, i)=>(
                                    <tr key={i}>
                                        <td><small>{++i}</small></td>
                                        <td><small>{order.cargoSize}</small></td>
                                        <td><small>{order.location.formatted}</small></td>
                                        <td><small>{order.destination.formatted}</small></td>
                                        <td><small>{order.driver.displayName}</small></td>
                                        {/*<td><small></small>&#x20B5;</td>*/}
                                        <td><small></small>{new Date(order.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </>
)}

export default Driver
