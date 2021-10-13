import React, { useEffect, useState } from "react"
import { navigate, Link } from 'gatsby'
import { isAuthenticated, getUser } from "../services/auth"
import NavBar from '../components/nav-bar'
import { rounded10 } from '../pages/styles.module.css'

const Profile = ({user}) => {
    useEffect(() => {
        //setUser(getUser().toJSON().uid)
    }, [])
    if (!isAuthenticated()){
        navigate('/app/login')
        return null
    }

    return (
    <>
        <NavBar pageTitle='Home'></NavBar>
        <div className="container mt-5">
            <div className={`d-flex align-items-center border border-primary ${rounded10} ps-3`} style={{maxWidth: 'fit-content'}}>
                <i className="fas fa-truck-moving fa-2x"></i>
                <Link to="/app/orders/new" className={`btn btn-primary ${rounded10} text-white font-monospace ms-3`}>New Order</Link>
            </div>
            <div className="row py-4 border-bottom">
                <div className="col-6 col-md-4 col-lg-3">
                    <div className={`card ${rounded10} border-2`}>
                        <div className="card-body d-flex flex-column align-items-center justify-center">
                            <div className="h3 fw-bold">3</div>
                            <div className="h6 text-secondary">Total Orders</div>
                        </div>
                    </div>
                </div>
                <div className="col-6 col-md-4 col-lg-3">
                    <div className={`card ${rounded10} border-2`}>
                        <div className="card-body d-flex flex-column align-items-center justify-center">
                            <div className="h3 fw-bold">1</div>
                            <div className="h6 text-secondary">Active Orders</div>
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
    </>
)}

export default Profile