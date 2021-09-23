import * as React from "react"
import { Link } from 'gatsby'
import { btn, btnLg } from '../styles.module.css'

const LoginPage = ()=>{
  return (
      <>
          
          <div className={`container`}>
              <div className={`w-100 d-flex justify-content-between align-items-center p-3`}>
                  <Link to='/app'>
                      <i className={`fas fa-angle-left fa-2x text-dark`}></i>
                  </Link>
                  <Link to='/app/login' className={`btn btn-outline-light text-primary`}>LOGIN</Link>
              </div>

              <div className={`w-100 mt-5 px-5 text-center`}>
                  <i className={`fas fa-user-plus fa-4x`}></i>
                  <h2 className={`mt-3 p-0`}>Registration</h2>
                  <div className={`h5 mt-2`}></div>

              </div>
              <form name="signup" netlify>
                  <div className={`row align-items-center justify-content-center`}>
                      <div className={`col-sm-9 col-md-3 col-lg-4`}>
                          <div className={`input-group mt-3 border border-2 border-dark rounded`}>
                              <input type='email' name='name' className={`form-control border-0`} placeholder='Enter Fullname' required/> 
                              <span className={`input-group-text bg-white`}>
                                  <i className={`far fa-user-circle`}></i>
                              </span>
                          </div>
                          <div className={`input-group mt-3 border border-2 border-dark rounded`}>
                              <input type='email' name='email' className={`form-control border-0`} placeholder='Enter Email Address' required/> 
                              <span className={`input-group-text bg-white`}>
                                  <i className={`far fa-envelope`}></i>
                              </span>
                          </div>

                          <div className={`input-group mt-3 border border-2 border-dark rounded`}>
                              <input type='password' name='password' className={`form-control border-0`} placeholder='Enter Password' required/> 
                              <span className={`input-group-text bg-white`}>
                                  <i className={`fas fa-lock`}></i>
                              </span>
                          </div>
                          <div className={`input-group mt-3 border border-2 border-dark rounded`}>
                              <input type='password' name='cpassword' className={`form-control border-0`} placeholder='Confirm Password' required/> 
                              <span className={`input-group-text bg-white`}>
                                  <i className={`fas fa-lock`}></i>
                              </span>
                          </div>
                          <div className={`form-check mt-3`}>
                              <input className={`form-check-input`} type="checkbox" value="" name="tos" id="tos"/>
                              <label className={`form-check-label`} for="tos">
                                  <small>{`I agree with all terms and conditions`}</small>
                              </label>
                          </div>

                          <div className={`form-group mt-3`}>
                              <button className={`${btn} btn-dark ${btnLg} w-100`}>Signup</button>

                          </div>
                      </div>
                  </div>
              </form>
          </div>


      </>
  )
}

export default LoginPage
