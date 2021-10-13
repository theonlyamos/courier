import React, { useEffect, useState } from "react"
import { navigate, Link } from 'gatsby'
import { isAuthenticated, getUser } from "../services/auth"
import { getOrder } from "../services/order"
import BackButtonNavbar from "./back-button-navbar"


const OrderDetails = ({orderId}) => {
    const [user, setUser] = useState(null)
    const [order, setOrder] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        if (!isAuthenticated()){
            navigate('/app/login')
            return null
        }

        setUser(getUser())
        fetchOrder()
    }, [])

    const fetchOrder = async()=>{
        const result = await getOrder(orderId)
        if (result.exists){
            setOrder(result.data())
        }
        //setIsLoading(false)
    }

    return (
    <>
        <div className="container">
            <BackButtonNavbar pageTitle="Order Details"/>
            {isLoading && (
                <div className={`w-100 mt-5 text-center`}>
                    <i className={`fas fa-spin fa-spinner fa-3x`}></i>
                    <div className={`h5 my-3`}></div>
                </div>
            )}
        </div>
    </>
)}

export default OrderDetails