import React, { useEffect, useState, useContext } from 'react'
import { Link, navigate } from 'gatsby'
import Overlay from './overlay'
import { isAuthenticated, getUser, logout } from '../services/auth'
import { getDBUser } from '../services/user'
import { btn, btnPrimary} from '../pages/styles.module.css'
import { FirebaseContext } from '../services/firebase-provider'

export default function NavBar({pageTitle}){
    const { authToken, user, setUser, setAuthToken } = useContext(FirebaseContext)
    //let [user, setUser] = useState(null)
    useEffect(() => {
        
    }, [authToken,  user])

    const onLogout = async(e)=>{
        e.preventDefault()
        await logout()
        setUser(null)
        setAuthToken(null)
        localStorage.clear()
        navigate('/app/login')
    }
    return authToken  ?
        (
            <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top" id="ftco-navbar">
                <div className="container">
                    <button className="navbar-toggler p-0p-2 border-0" type="button" data-bs-toggle="collapse" data-bs-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="fas fa-ellipsis-h fa-2x text-dark"></span>
                    </button>
                    <header className="d-lg-none">{pageTitle ? pageTitle: ''}</header>
                    {user ? user.photoURL ? (
                        <Link to="/app/account">
                            <img 
                                src={user.photoURL} 
                                style={{width: "35px", height: "35px",
                                        objectFit: "cover", objectPosition: "top",
                                        cursor: 'pointer' }}
                                className="rounded-circle" alt=""/>
                        </Link>
                    ) :
                    (
                        <Link to="/app/account">
                            <i className="far fa-user-circle fa-2x"></i>
                        </Link>
                    )
                    : (
                        <Link to="/app/">
                            <i className="far fa-user-circle fa-2x"></i>
                        </Link>
                    )
                    
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
                                        <Link to="/app/vehicle" state={{user: user}} className="nav-link text-dark">Vehicle/Truck</Link>
                                    </li>
                                </>
                            )}
                            <li className="nav-item d-flex align-items-center border-bottom">
                                <i className="fas fa-user-cog fa-fw me-2 d-lg-none"></i>
                                <Link to="/app/account" state={{user: user}} className="nav-link text-dark">Account</Link>
                            </li>
                            <li className="nav-item d-flex align-items-center border-bottom">
                                <i className="fas fa-cogs fa-fw me-2 d-lg-none"></i>
                                <Link to="/app/settings" state={{user: user}} className="nav-link text-dark">Settings</Link>
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
