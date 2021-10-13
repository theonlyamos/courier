import React, { useEffect, useState } from "react"
import {Link} from 'gatsby'
import { signup, updateUser, getUser, isAuthenticated } from '../services/auth';
import { createDBUser } from '../services/user';
import { navigate } from 'gatsby'
import {btn, btnLg} from '../pages/styles.module.css'

const Signup = () => {
    const [displayName, setDisplayName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCpassword] = useState('')
    const [utype, setUtype] = useState('customer')
    const [isDriver, setIsDriver] = useState(false)
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState('')

    useEffect(() => {
        if (isAuthenticated()){
            //navigate(`/app/`) 
        }
       console.log('Authentication', isAuthenticated())
    }, [])

    const selectUserType = (e) => {
        setUtype(e.target.value)
        if (e.target.value === 'driver')
            setIsDriver(true)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try{
          if (password === cpassword){
                setIsLoading(true)
                await signup(email, password) 
                await updateUser({displayName})
                const user = getUser().toJSON()
                await createDBUser({
                    uid: user.uid,
                    email,
                    displayName,
                    phoneNumber,
                    utype,
                    photoURL: '',
                    createdAt: new Date().toUTCString(),
                    updatedAt: new Date().toUTCString()
                })
                setIsLoading(false)
                setIsSuccess(true)
                navigate(`/app/`)
                
          }
          else {
              setError('Passwords do not match!')
          }
        }catch(e){
            console.log(e)
            setError(e.message)
            if (e.code === 'auth/user-not-found'){
                setError('Invalid username/password')
            }
            setIsLoading(false)
        }
    }
    return ( <> <div className={`container`}>
        <div className={`w-100 d-flex justify-content-between align-items-center p-3`}>
        <Link to='/app'>
            <i className={`fas fa-angle-left fa-2x text-dark`}></i>
        </Link>
        <Link to='/app/login' className={`btn btn-outline-light text-primary`}>LOGIN</Link>
        </div>

        <div className={`w-100 mt-2 px-5 text-center`}>
            <i className={`fas fa-user-plus fa-4x`}></i>
            <h2 className={`mt-3 p-0`}>Registration</h2>
            <div className={`h5 mt-2`}></div>
        </div>
        <form method='POST' className="mb-4" onSubmit={handleSubmit}>
            <div className={`row align-items-center justify-content-center`}>
                <div className={`col-sm-9 col-md-6 col-lg-4`}>
                    { (error.length > 1) && (
                        <div className="alert alert-danger p-2">
                            { error }
                        </div>
                    )}
                    { (isSuccess) && (
                        <div className="alert alert-success p-2">
                            {`Registration Successfull!`}
                        </div>
                    )}
                        <div className={`form-group mt-3 rounded`}>
                            <label className={`text-muted small`}>Select type of user</label>
                            <select 
                                onChange={selectUserType}
                                value={utype} 
                                id='type'
                                className={`form-control custom-check`}
                                required
                            >
                                <option value='customer'>Customer</option>
                                <option value='driver'>Driver</option>
                            </select>
                        </div>
                        <div className={`input-group mt-3 border rounded`}>
                            <input
                            type='text'
                            onChange={ e => {
                                setDisplayName(e.target.value)
                            }}
                            value={ displayName }
                            className={`form-control border-0`}
                            placeholder='Enter Fullname'
                            required/>
                            <span className={`input-group-text bg-white`}>
                            <i className={`far fa-user-circle`}></i>
                            </span>
                        </div>
                        {isDriver && (
                            <div className={`input-group mt-3 border rounded`}>
                                <input
                                type='text'
                                onChange={ e => {
                                    setPhoneNumber(e.target.value)
                                }}
                                value={ phoneNumber }
                                className={`form-control border-0`}
                                placeholder='Enter phone number'
                                required/>
                                <span className={`input-group-text bg-white`}>
                                <i className="fas fa-phone-alt"></i>
                                </span>
                            </div>
                        )}
                        <div className={`input-group mt-3 border rounded`}>
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
                            <i className={`far fa-envelope`}></i>
                            </span>
                        </div>

                        <div className={`input-group mt-3 border rounded`}>
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
                        <div className={`input-group mt-3 border rounded`}>
                            <input
                            type='password'
                            onChange={ e => {
                                setCpassword(e.target.value)
                            }}
                            value={ cpassword }
                            className={`form-control border-0`}
                            placeholder='Confirm Password'
                            required/>
                            <span className={`input-group-text bg-white`}>
                            <i className={`fas fa-lock`}></i>
                            </span>
                        </div>
                        <div className={`form-check mt-3`}>
                            <input
                            className={`form-check-input`}
                            type="checkbox"
                            value=""
                            id="tos" 
                            required/>
                            <label className={`form-check-label`}>
                            <small>{`I agree with all terms and conditions`}</small>
                            </label>
                        </div>

                        <div className={`form-group mt-3`}>
                            {isLoading ? 
                            (<button className={`${btn} btn-dark ${btnLg} w-100`} disabled><i className="fas fa-spin fa-spinner"></i></button>)
                            :

                            isSuccess ?
                            (<button className={`${btn} btn-dark ${btnLg} w-100`}><i className="fas check"></i></button>)
                            
                            :
                            (<button className={`${btn} btn-dark ${btnLg} w-100`}>Signup</button>)
                            }
                        </div>
                    </div>
                </div>
            </form>
    </div> </>
    )
}

export default Signup