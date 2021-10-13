import React, { useEffect, useState } from "react"
import { navigate, Link } from 'gatsby'
import { isAuthenticated, getUser } from "../services/auth"
import { getDBUser, updateDBUser } from "../services/user"
import NavBar from '../components/nav-bar'
import { rounded10 } from '../pages/styles.module.css'

const Settings = ({location}) => {
    const [user, setUser] = useState({})
    const [userInfo, setUserInfo] = useState({})
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    

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

    useEffect(() => {

        if (!isAuthenticated()){
            navigate('/app/login')
            return null
        } 
        
        setUser(getUser().toJSON())
        getUserInfo()

    }, [])

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
            console.log((password && passwordConfirm))
            if ((password && passwordConfirm) && (password === passwordConfirm)){
                setIsLoading(true)
                await getUser().updatePassword(password)
                setIsLoading(false)
                setIsSuccess(true)
            }
            else {
                setError('Passwords must match!')
            }
             
        }
        catch(error){
            setError(error.message)
            setIsLoading(false)
        }
        
    }

    return (
    <>
        <NavBar pageTitle='Settings'></NavBar>
        <div className="container mt-5" style={{minHeight: '85vh'}}>
            <div className={`row align-items-center justify-content-center`}>
                <div className={`col-lg-6`}>
                    <header className="lead text-center">Change Password</header>
                    {error && (
                        <div className="alert alert-danger alert-dismissible fade show my-3">
                            {error}
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    )}
                    {isSuccess && (
                        <div className="alert alert-success alert-dismissible fade show my-3">
                            Password updated successfully
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="row mt-3">
                            <div className="form-group col-12 mt-2">
                                <label htmlFor="password" className="text-secondary">New Password</label>
                                <input 
                                    type="password"
                                    id="password" 
                                    className="form-control"
                                    onChange={ e => {
                                        setPassword(e.target.value)
                                    }}
                                    value={password}
                                    required
                                    minLength="8"/>
                            </div>
                            <div className="form-group col-12 mt-2">
                                <label htmlFor="newPasswordConfirm" className="text-secondary">Confirm Password</label>
                                <input 
                                    type="password"
                                    id="newPasswordConfirm" 
                                    className="form-control"
                                    onChange={ e => {
                                        setPasswordConfirm(e.target.value)
                                    }}
                                    value={passwordConfirm}
                                    required
                                    minLength="8"/>
                            </div>
                            <div className="form-group mt-3 text-center">
                                {isLoading ? (
                                    <button type="submit" className="btn btn-primary btn-lg w-100 text-uppercase" disabled>
                                        <i className="fas fa-spin fa-spinner fa-fw"></i> Updating Password...
                                    </button>
                                ) : (
                                    <button type="submit" className="btn btn-primary btn-lg w-100 text-uppercase">
                                        Submit
                                    </button>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
)}

export default Settings