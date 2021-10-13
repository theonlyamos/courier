import React, { useEffect, useState } from 'react'
import { Link, navigate } from 'gatsby'
import Overlay from './overlay'
import { isAuthenticated, getUser, logout } from '../services/auth'
import { getDBUser } from '../services/user'
import { btn, btnPrimary} from '../pages/styles.module.css'

export default function NavBar({pageTitle}){
    let [user, setUser] = useState(null)
    useEffect(() => {
        if (isAuthenticated){
            getDBUser(getUser().toJSON().uid)
            .then((result)=>{
                setUser(result.data())
            })
            .catch((error)=>{
                console.log(error)
            })
        }
    }, [])

    const onLogout = async(e)=>{
        e.preventDefault()
        await logout()
        navigate('/app/login')
    }
    return isAuthenticated()  ?
        (
            <nav className="navbar navbar-expand-lg navbar-light bg-white" id="ftco-navbar">
                <div className="container">
                    <button className="navbar-toggler p-0p-2 border-0" type="button" data-bs-toggle="collapse" data-bs-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="fas fa-ellipsis-h fa-2x text-dark"></span>
                    </button>
                    <header className="d-lg-none">{pageTitle ? pageTitle: ''}</header>
                    {
                    <a className="navbar-brand text-uppercase d-flex align-items-center" href="/">
                        <i className="far fa-user-circle fa-2x"></i>
                    </a>
                    }
                    <div className="collapse navbar-collapse justify-content-end" id="ftco-nav">
                        <ul className="navbar-nav">
                            {user && user.utype === 'customer' && (
                                <>
                                    <li className="nav-item d-flex align-items-center border-bottom">
                                        <i className="fas fa-home fa-fw me-2 d-lg-none"></i>
                                        <Link to="/app/profile" state={{user: user}} className="nav-link text-dark">Home</Link>
                                    </li>
                                    <li className="nav-item d-flex align-items-center border-bottom">
                                        <i className="fas fa-truck-loading fa-fw me-2 d-lg-none"></i>
                                        <Link to="/app/orders" state={{user: user}} className="nav-link text-dark">Orders</Link>
                                    </li>
                                </>
                            )}
                            {user && user.utype === 'driver' && (
                                <>
                                    <li className="nav-item d-flex align-items-center border-bottom">
                                        <i className="fas fa-home fa-fw me-2 d-lg-none"></i>
                                        <Link to="/app/driver" state={{user: user}} className="nav-link text-dark">Home</Link>
                                    </li>
                                    <li className="nav-item d-flex align-items-center border-bottom">
                                        <i className="fas fa-truck-pickup fa-fw me-2 d-lg-none"></i>
                                        <Link to="/app/vehicle" className="nav-link text-dark">Vehicle/Truck</Link>
                                    </li>
                                </>
                            )}
                            <li className="nav-item d-flex align-items-center border-bottom">
                                <i className="fas fa-user-cog fa-fw me-2 d-lg-none"></i>
                                <Link to="/app/account" className="nav-link text-dark">Account</Link>
                            </li>
                            <li className="nav-item d-flex align-items-center border-bottom">
                                <i className="fas fa-cogs fa-fw me-2 d-lg-none"></i>
                                <Link to="/app/settings" className="nav-link text-dark">Settings</Link>
                            </li>
                            <li className="nav-item d-flex align-items-center text-danger">
                                <i className="fas fa-sign-out-alt fa-fw me-2 d-lg-none"></i>
                                <a href="#logout" className="nav-link text-danger" onClick={onLogout}>Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
        :
        (
            <>
                <Overlay></Overlay>
                <div className={`w-100 d-flex justify-content-end p-3`}>
                    <Link to="/app/login" className={`btn btn-primary ${btn} ${btnPrimary}`}>LOGIN</Link>
                </div>
            </>
        )
    
}