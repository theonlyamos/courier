import * as React from "react"
import { Link } from 'gatsby'
import Overlay from '../overlay'
import ContainerBox from '../../components/container'
import FlexBox from '../../components/flexbox'
import InputBox from '../../components/inputbox'

import { btn, btnDark, btnLg } from '../styles.module.css'

const LoginPage = ()=>{
  return (
      <>
          
          <div className={`container`}>
              <div className={`w-100 d-flex justify-content-between align-items-center p-3`}>
                  <Link to='/app'>
                      <i className={`fas fa-angle-left fa-2x text-dark`}></i>
                  </Link>
                  <Link to='/app/signup' className={`btn btn-outline-light text-dark`}>LOGIN</Link>
              </div>

              <div className={`w-100 mt-5 px-5 text-center`}>
                  <i className={`fas fa-sign-in-alt fa-4x`}></i>
                  <h2 className={`mt-3`}>Welcome back</h2>
                  <div className={`h5 mt-2`}>Login to manage your account</div>

              </div>
              <form name="login" netlify>
                  <div className={`row align-items-center justify-content-center`}>
                      <div className={`col-sm-9 col-md-3 col-lg-4`}>
                          <div className={`input-group mt-3 border border-2 border-dark rounded-pill`}>
                              <input type='email' name='email' className={`form-control border-0`} placeholder='Enter Email Address' required/> 
                              <span className={`input-group-text bg-white`}>
                                  <i className={`fas fa-envelope`}></i>
                              </span>
                          </div>
                          <div className={`input-group mt-3 border border-2 border-dark rounded-pill`}>
                              <input type='password' name='password' className={`form-control border-0`} placeholder='Enter Password' required/> 
                              <span className={`input-group-text bg-white`}>
                                  <i className={`fas fa-lock`}></i>
                              </span>
                          </div>

                          <div className={`form-group mt-3`}>
                              <button className={`${btn} btn-primary ${btnLg} w-100`}>Login</button>

                          </div>
                      </div>
                  </div>
              </form>
          </div>


      </>
  )
}

export default LoginPage
