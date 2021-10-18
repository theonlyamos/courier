import React, { useEffect, useState, useContext } from "react"
import { navigate } from 'gatsby'
import { isAuthenticated, getUser } from "../services/auth"
import { getDBUser } from "../services/user"
import { FirebaseContext } from "../services/firebase-provider"

const Loader = () => {
    const { authToken, user } = useContext(FirebaseContext)
    const [isLoading, setIsLoading] = useState(true)
    
    const checkUserType = async() => {
        try{
            if (user.utype === 'driver'){
                if (!user.hasOwnProperty('subscription'))
                    navigate('/app/pricing')
                else
                    navigate('/app/driver')
            }
            else{
                navigate('/app/profile')
            }
        }
        catch(error){
            console.log(error)
            navigate('/app/login')
        }
    }

    useEffect(() => {
        //if (isAuthenticated()){
        if (authToken){
            checkUserType()
        }
        else
            navigate('/app/login')
    }, [authToken, user])

 
    return (
        <>
        {isLoading ? 
        (
            <div className="w-100 d-flex flex-column align-items-center justify-content-center" style={{height: '100vh'}}>
                <i className="fas fa-truck-loading fa-5x"></i>
                <i className="fas fa-spin fa-spinner fa-4x"></i>
            </div>
        )
        :
        null
        }
        </>
)}

export default Loader
