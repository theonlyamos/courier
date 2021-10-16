import React, { useEffect, useState } from "react"
import { navigate, Link } from 'gatsby'
import { isAuthenticated, getUser } from "../services/auth"
import { getDBUser } from "../services/user"
import { getOrders, getOrdersCount } from "../services/order"
import NavBar from '../components/nav-bar'
import { rounded10 } from '../pages/styles.module.css'

const Profile = ({location}) => {
    const [user, setUser] = useState({})
    const [userInfo, setUserInfo] = useState({})
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [orders, setOrders] = useState([])
    const [ordersCount, setOrdersCount] = useState(0)

    useEffect(() => {

        if (!isAuthenticated()){
            navigate('/app/login')
            return null
        } 

        getUserInfo()
        getRecentOrders()

    }, [])

    const getUserInfo = async()=>{
        try {
            const result = await getDBUser(getUser().toJSON().uid)
            if (result.exists){
                const account = result.data()
                setUserInfo(account)
            }
        }
        catch(error){
            console.log(error)
        }
    }

    const getRecentOrders = async()=>{
        try {
            setIsLoading(true)
            const snapshot = await getOrders(getUser().toJSON().uid, 10)
            if (!snapshot.empty){
                let allOrders = []
                snapshot.forEach(doc => {
                    allOrders.push({id: doc.id, ...doc.data()})
                })
                setOrders(allOrders)
                setIsLoading(false)
            }
            const count = await getOrdersCount(getUser().toJSON().uid)
            setOrdersCount(count)
            
        }
        catch(error){
            console.log(error)
            setIsLoading(false)
        }
    }

    const orderDetails = (orderId)=>{
        navigate(`/app/orders/${orderId}`)
    }

    return (
    <>
        <NavBar pageTitle='Home'></NavBar>
        <div className="container mt-5">
        <div className={`row align-items-center justify-content-center`}>
                <div className={`col-lg-6`}>
                    <div className={`d-flex align-items-center border border-primary ${rounded10} ps-3`} style={{maxWidth: 'fit-content'}}>
                        <i className="fas fa-truck-moving fa-2x"></i>
                        <Link to="/app/orders/new" className={`btn btn-primary ${rounded10} text-white font-monospace ms-3`}>New Order</Link>
                    </div>
                    <div className="row py-4 border-bottom">
                        <div className="col-6 col-md-4">
                            <div className={`card ${rounded10} border-2`}>
                                <div className="card-body d-flex flex-column align-items-center justify-center">
                                    <div className="h3 fw-bold">{ordersCount}</div>
                                    <div className="h6 text-secondary">Total Orders</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <header className="lead text-center text-secondary fw-bold my-3">Recent Orders</header>
                    <div className="table-responsive">
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
                                    <tr key={i} onClick={()=>orderDetails(order.id)} style={{cursor: 'pointer'}}>
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

export default Profile
