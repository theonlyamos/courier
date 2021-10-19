import React from "react"
import { Link } from 'gatsby'

import Overlay from '../components/overlay'
import ContainerBox from '../components/container'
import FlexBox from '../components/flexbox'
import InputBox from '../components/inputbox'
import { btn, btnLg, btnPrimary, btnDark } from './styles.module.css'
import Helmet from 'react-helmet'

const HomePage = ()=>{
      
  return (
      <>
		  <Helmet>
			 <title>CourierGH</title>
			 <meta name="description" content="Want to move things from one location to other? Look no further"/>
		  </Helmet>
          <Overlay></Overlay>
          <div className={`w-100 d-flex justify-content-end p-3`}>
              <Link to="/app/login" className={`btn btn-primary ${btn} ${btnPrimary}`}>LOGIN</Link>
          </div>
          <ContainerBox>
            <div className={`row align-items-center justify-content-center`}>
                <div className={`col-sm-9 col-md-6 col-lg-5 col-xl-4`}>
                    <FlexBox direction="column">
                        <div className="text-center mt-5">
                            <i className="fas fa-truck-loading fa-5x"></i>
                        </div>
                        <h2 className={`mt-3 text-center`}>Need something picked up?</h2>
                        <div className={`h5 pt-1 text-center font-monospace mt-2`}>Get access to thousands of cargo vehicles/trucks at the press of button</div>
                        <div className={`mt-4 w-100`}>
                            <Link to="/app/signup" className={`btn btn-dark btn-lg w-100 text-uppercase ${btn} ${btnDark} ${btnLg}`}>Get Started</Link>
                        </div>
                    </FlexBox>
                </div>
            </div>
          </ContainerBox>
      </>
  )
}

export default HomePage
