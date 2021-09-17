import * as React from "react"
import { Link } from 'gatsby'
import Overlay from '../overlay'
import ContainerBox from '../../components/container'
import FlexBox from '../../components/flexbox'
import InputBox from '../../components/inputbox'

import { btn, btnDark, btnLg } from '../styles.module.css'

const SignupPage = ()=>{
  return (
      <>
          <div className={`w-100 d-flex justify-content-between align-items-center p-3`}>
              <Link to='/app'>
                  <i className={`fas fa-angle-left fa-2x text-dark`}></i>
              </Link>
              <Link to='/app/login' className={`btn btn-outline-light text-primary`}>LOGIN</Link>
          </div>

          <ContainerBox>
              
              <FlexBox direction='column'>
                  <i className={`mt-3 fas fa-user-plus fa-4x text-center`}></i>
                  <h2 className={`mt-3 text-center`}>Join Us</h2>
                  <div className={`h5 mt-2 text-center`}>Signup to manage your account</div>
                  <div className={`mt-3`}>
                      <InputBox type='text' placeholder='Enter FullName'></InputBox>
                  </div>

                  <div className={`mt-3`}>
                      <InputBox type='email' placeholder='Enter Email Address'></InputBox>
                  </div>
                  <div className={`mt-3`}>
                      <InputBox type='password' placeholder='Enter Password'></InputBox>
                  </div>
                  <div className={`mt-3`}>
                      <InputBox type='password' placeholder='Enter Password'></InputBox>
                  </div>

                  <div className={`mt-4 100`}>
                      <button className={`${btn} ${btnDark} btn-dark ${btnLg} w-100`}>Signup</button>
                  </div>
              </FlexBox>
          </ContainerBox>
      </>
  )
}

export default SignupPage
