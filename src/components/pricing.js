import React, { useEffect, useState } from "react"
import {Link} from 'gatsby'
import {btn, btnLg} from '../pages/styles.module.css'
import { isAuthenticated, getUser } from '../services/auth';
import { updateDBUser } from '../services/user';
import { navigate } from 'gatsby'
import { usePaystackPayment } from 'react-paystack'

const Pricing = () => {
    const [user, setUser] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [subscribed, setSubscribed] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')


    useEffect(() => {
        if (!isAuthenticated()){
            navigate('/app/')
        }
        setUser(getUser().toJSON())
       console.log('Authentication', isAuthenticated())
    }, [])

    const config = {
        reference: (new Date()).getTime().toString(),
        email: user.email,
        amount: 20000,
        publicKey: "pk_test_5463026b54f8b70e361626ddce22544182c7d314",
        currency: 'GHS',
        channels: ['mobile_money']
    };

    const onSuccess = async(reference) => {
        try {
            setSubscribed(true)
            setIsLoading(true)
            setSuccess('Registration complete')
            await updateDBUser(user.uid, {
                subscription: {...reference},
                updatedAt: new Date().toUTCString()
            })
            setIsLoading(false)
            navigate('/app/driver')
        }
        catch(error){
            console.log(error)
            setIsLoading(false)
            setError('Payment unsuccessful!')
        }
    };

    const onClose = () => {
        console.log('closed')
    }
 
    const PaystackHook = () => {
        const initializePayment = usePaystackPayment(config);
        return (
          <div className="text-center">
              <button className="btn btn-primary mt-4" onClick={() => {
                  initializePayment(onSuccess, onClose)
              }}>Pay GHS20</button>
          </div>
        );
    };

    return (
    <> <div className={`container`}>
        <div className={`w-100 d-flex justify-content-end align-items-center p-3`}>
            <button className={`btn text-danger`}>
                <i className="fas fa-sign-out-alt fa-fw"></i>
                Logout
            </button>
        </div>

        <div className={`row align-items-center justify-content-center`}>
            <div className={`w-100 mt-5 px-5 text-center`}>
                <i className={`fas fa-sign-in-alt fa-4x`}></i>
                <h2 className={`mt-3`}>Registration Fee</h2>
                <div className={`small mt-3`}>A GHS20 registration fee is required to complete registration.</div>
                <div className={`small mt-2`}>You will be charged a GHS50/month subscription fee after the first month.</div>
            </div>
            <div className={`col-sm-9 col-md-6 col-lg-4`}>
                {isLoading && (
                    <div className="text-center">
                        <i className="fas fa-spin fa-spinner fa-3x"></i>
                    </div>
                )}
                {!subscribed && (
                    <PaystackHook />
                )}
                {error && (
                    <div className="alert alert-danger">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="alert alert-success">
                        {success}
                    </div>
                )}
            </div>
        </div>
    </div> 
    </>
    )
}

export default Pricing