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
          <Overlay/>
          <div className={`w-100 d-flex justify-content-end p-3`}>
              <Link to='/app/signup' className={`btn ${btn} ${btnDark}`}>SIGNUP</Link>
          </div>

          <ContainerBox>
              
              <FlexBox direction='column'>
                  <h2 className={`mt-5 text-center`}>Welcome back</h2>
                  <div className={`h5 mt-2 text-center`}>Login to manage your account</div>
                  <div className={`mt-5`}>
                      <InputBox type='email' placeholder='Enter Email Address'></InputBox>
                  </div>
                  <div className={`mt-3`}>
                      <InputBox type='password' placeholder='Enter Password'></InputBox>
                  </div>
                  <div className={`mt-4 100`}>
                      <button className={`${btn} btn-primary ${btnLg} w-100`}>Login</button>
                  </div>
              </FlexBox>
          </ContainerBox>
      </>
  )
}

export default LoginPage
