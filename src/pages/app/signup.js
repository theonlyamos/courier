import * as React from "react"
import Overlay from '../overlay'
import ContainerBox from '../../components/container'
import FlexBox from '../../components/flexbox'
import InputBox from '../../components/inputbox'

import { w100, flex, justifyEnd, padding1, marginTop2, textCenter,
         paddingTop1, btn, btnPrimary, btnDark, btnLg } from '../styles.module.css'

const LoginPage = ()=>{
  return (
      <>
          <Overlay/>
          <ContainerBox>
              <div className={`${padding1} ${w100} ${flex} ${justifyEnd}`}>
                  <button className={`${btn} ${btnDark}`}>SIGNUP</button>
              </div>

              <FlexBox direction='column'>
                  <h2 className={`${marginTop2} ${textCenter}`}>Need something picked up?</h2>
                  <h4 className={`${paddingTop1} ${textCenter}`}>Search our database for available trucks/vehicles</h4>
                  <div className={marginTop2}>
                      <InputBox type='email' placeholder='Enter Email Address'></InputBox>
                  </div>
                  <div className={marginTop2}>
                      <InputBox type='password' placeholder='Enter Password'></InputBox>
                  </div>
                  <div className={`${marginTop2} ${w100}`}>
                      <button className={`${btn} ${btnPrimary} ${btnLg} ${w100}`}>Login</button>
                  </div>
              </FlexBox>
          </ContainerBox>
      </>
  )
}

export default LoginPage
