import React, { useEffect, useState, useContext, useCallback } from "react"
import {Link} from 'gatsby'
import {btn, btnLg} from '../pages/styles.module.css'
import { signin, isAuthenticated } from '../services/auth';
import { navigate } from 'gatsby'
import { FirebaseContext } from "../services/firebase-provider";
import { getDBUser } from "../services/user";


const Login = () => {
    const { authToken, user,  setAuthToken, setUser } = useContext(FirebaseContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        /*
        if (isAuthenticated()){
            navigate('/app/')
        }
        */
        if (authToken && user) {
            navigate('/app')
        }
    }, [authToken, user])

    const handleSubmit =  useCallback(async(event) => {
        event.preventDefault()

        try{
            setIsLoading(true)
            //await signin(email, password) 
            const { user } = await signin(email, password)
            if (user) {
                const { refreshToken } = user
                setAuthToken(refreshToken)
                const result = await getDBUser(user.toJSON().uid)
                setUser(result.data())
            }
            setIsLoading(false)
            //navigate('/app/') 
        }catch(e){
            setError(e.message)
            if (e.code === 'auth/user-not-found'){
                setError('Invalid username/password')
            }
            setIsLoading(false)
        }
    }, [email, password, signin, setAuthToken])

    return (
    <> <div className={`container`}>
        <div className={`w-100 d-flex justify-content-between align-items-center p-3`}>
        <Link to='/app'>
            <i className={`fas fa-angle-left fa-2x text-dark`}></i>
        </Link>
        <Link to='/app/signup' className={`btn btn-outline-light text-dark`}>SIGNUP</Link>
        </div>

        <div className={`w-100 mt-5 px-5 text-center`}>
            <i className={`fas fa-sign-in-alt fa-4x`}></i>
            <h2 className={`mt-3`}>Welcome back</h2>
            <div className={`h5 mt-2`}>Login to manage your account</div>
        </div>
        
        <form method='POST' onSubmit={handleSubmit}>
        <div className={`row align-items-center justify-content-center`}>
            <div className={`col-sm-9 col-md-6 col-lg-4`}>
                { (error.length > 1) && (
                    <div className="alert alert-danger p-2">
                        { error }
                    </div>
                )}
                <div className={`input-group mt-3 border border-2 border-dark rounded`}>
                    <input
                    type='email'
                    onChange={ e => {
                        setEmail(e.target.value)
                    }}
                    value={ email }
                    className={`form-control border-0`}
                    placeholder='Enter Email Address'
                    required/>
                    <span className={`input-group-text bg-white`}>
                    <i className={`fas fa-envelope`}></i>
                    </span>
                </div>
                <div className={`input-group mt-3 border border-2 border-dark rounded`}>
                    <input
                    type='password'
                    onChange={ e => {
                        setPassword(e.target.value)
                    }}
                    value={ password }
                    className={`form-control border-0`}
                    placeholder='Enter Password'
                    required/>
                    <span className={`input-group-text bg-white`}>
                    <i className={`fas fa-lock`}></i>
                    </span>
                </div>

                <div className={`form-group mt-3`}>
                    {isLoading 
                    ? (<button className={`${btn} btn-primary ${btnLg} w-100`} disabled><i className="fas fa-spin fa-spinner"></i></button>) 
                    : (<button className={`${btn} btn-primary ${btnLg} w-100`}>Login</button>)}
                </div>
            </div>
        </div>
        </form>
    </div> 
    </>
    )
}

export default Login