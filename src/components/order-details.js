import React, { useEffect, useState, useContext } from "react"
import { navigate, Link } from 'gatsby'
import { isAuthenticated, getUser } from "../services/auth"
import { getDBUser, updateDBUser } from "../services/user"
import { getOrder, updateOrder } from "../services/order"
import BackButtonNavbar from "./back-button-navbar"
import { rounded10 } from '../pages/styles.module.css'
import { FirebaseContext } from "../services/firebase-provider"

const OrderDetails = ({orderId}) => {
    const { authToken } = useContext(FirebaseContext)
    const [order, setOrder] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        if (!authToken){
            navigate('/app/login')
            return null
        } 
        
        //setUser(getUser())
        fetchOrder()

    }, [order])

    const fetchOrder = async()=>{
        try{
            const result = await getOrder(orderId)
            if (result.exists){
                setOrder(result.data())
            }
            setIsLoading(false)
        }
        catch(error){
            setIsLoading(false)
            console.log(error)
        }
    }


    return (
    <>
        <BackButtonNavbar pageTitle="Order Details"/>
        <div className="container mt-1 position-relative">
            {isLoading && (
                <div className={`w-100 mt-5 text-center`}>
                    <i className={`fas fa-spin fa-spinner fa-3x`}></i>
                    <div className={`h5 my-3`}></div>
                </div>
            )}
            <div className={`row align-items-center justify-content-center`}>
                {order && (
                    <div className={`col-md-6 col-lg-5`}>
                    <div className="w-100 mb-3 text-center">
                            <a href={`tel:${order?.driver?.phoneNumber}`} className="btn btn-lg btn-primary text-white">
                                <i className="fas fa-phone-alt fa-fw"></i>
                                Call Driver
                            </a>
                        </div>
                        <div className="card mb-3">
                            <div className="bg-dark text-white p-2">
                                Location
                            </div>
                            <div className="p-2 bg-light">{order?.location?.formatted}</div>
                        </div>
                        <div className="card mb-3">
                            <div className="bg-dark text-white p-2">
                                Destination
                            </div>
                            <div className="p-2 bg-light">{order?.destination?.formatted}</div>
                        </div>
                        <div className="card mb-3">
                            <div className="bg-dark text-white p-2">
                                Driver
                            </div>
                            <div className="p-2 bg-light">
                                <div className="row ms-0">
                                        <div className={`col-4 text-center ${rounded10} p-2`}>
                                            {order?.driver?.photoURL ? (
                                                <img 
                                                    src={order?.driver?.photoURL}
                                                    className="w-100 img-fluid"
                                                    style={{objectFit: 'cover', objectPosition: 'top'}}
                                                />
                                            )
                                            : (
                                                <i className="fas fa-user-alt fa-3x"></i>
                                            )
                                            }
                                        </div>
                                        <div className="col-8 text-center d-flex flex-column justify-content-center">
                                        <div className="p-2 bg-light border-bottom">{order?.driver?.displayName}</div>
                                            <a href={`tel:${order?.driver?.phoneNumber}`} className="nav-link">
                                                <i className="fas fa-phone-alt fa-fw"></i>
                                                {order?.driver?.phoneNumber}
                                            </a>
                                        </div>
                                    </div>
                            </div>
                        </div>
                        <div className="card mb-5">
                            <div className="bg-dark text-white p-2">
                                Vehicle
                            </div>
                            <div className="bg-light">
                                <div className="row ms-0">
                                    <div className={`col-4 text-center ${rounded10} p-2`}>
                                        <img 
                                            src={order?.driver?.vehicle?.images[0]}
                                            className="w-100 img-fluid"
                                            style={{objectFit: 'cover', objectPosition: 'top'}}
                                            />
                                    </div>
                                    {order?.driver?.vehicle && (
                                        <div className="col-8 text-center d-flex flex-column justify-content-center">
                                            <span className="badge bg-dark text-light p-1 rounded-pill">
                                            {order?.driver?.vehicle?.makeModel}
                                            </span> {order?.driver?.vehicle?.plateNumber}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                )}
            </div>
        </div>
    </>
)}

export default OrderDetails
