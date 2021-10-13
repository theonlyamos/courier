import React, { useEffect, useState } from "react"
import { navigate, Link } from 'gatsby'
import { isAuthenticated, getUser } from "../services/auth"
import { getOrders } from "../services/order"
import NavBar from '../components/nav-bar'
import { rounded10 } from '../pages/styles.module.css'

const Orders = () => {
    let [user, setUser] = useState({})
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [orders, setOrders] = useState([])

    useEffect(() => {
        if (!isAuthenticated()){
            navigate('/app/login')
            return null
        }
        setUser(getUser().toJSON())

        getAllOrders()
    }, [])
    
    const getAllOrders = async()=>{
        try {
            const snapshot = await getOrders(getUser().toJSON().uid)
            if (snapshot.empty){
                console.log('0 orders')
            }
            let allOrders = []
            snapshot.forEach(doc => {
                allOrders.push({id: doc.id, ...doc.data()})
            })
            console.log(allOrders)
            setOrders(allOrders)
            setIsLoading(false)
        }
        catch(error){
            console.log(error)
        }
    }

    const orderDetails = (orderId)=>{
        navigate(`/app/orders/${orderId}`)
    }

    return (
    <>
        <NavBar pageTitle='Orders'></NavBar>
        <div className="container mt-5">
            <div className={`d-flex align-items-center border border-primary ${rounded10} ps-3`} style={{maxWidth: 'fit-content'}}>
                <i className="fas fa-truck-moving fa-2x"></i>
                <Link to="/app/orders/new" className={`btn btn-primary ${rounded10} text-white font-monospace ms-3`}>New Order</Link>
            </div>
            <header className="lead text-center text-secondary fw-bold my-3">All Orders</header>
            <div className="table-responsive" style={{overflow: 'auto'}}>
                <table className="table table-hover table-striped">
                    <thead className="bg-dark text-white">
                        <tr>
                            <th className="small">#</th>
                            <th className="small">Cargo Size</th>
                            <th className="small">Location</th>
                            <th className="small">Destination</th>
                            <th className="small">Driver</th>
                            <th className="small">Price</th>
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
                            <tr key={i} onClick={()=>orderDetails(order.id)}>
                                <td><small>{++i}</small></td>
                                <td><small>{order.cargoSize}</small></td>
                                <td><small>{order.location.formatted}</small></td>
                                <td><small>{order.destination.formatted}</small></td>
                                <td><small>{order.driver.displayName}</small></td>
                                <td><small></small>&#x20B5;</td>
                                <td><small></small>{new Date(order.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </>
)}

export default Orders