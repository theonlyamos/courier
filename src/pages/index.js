import React from "react"
import { Link, navigate } from 'gatsby'

import Overlay from '../components/overlay'
import ContainerBox from '../components/container'
import FlexBox from '../components/flexbox'
import InputBox from '../components/inputbox'
import { btn, btnLg, btnPrimary, btnDark } from './styles.module.css'

const HomePage = ()=>{

    navigate('/app')
      
  return (
      <>
          {/**
          <Overlay></Overlay>
          <div className={`w-100 d-flex justify-content-end p-3`}>
              <Link to="/app/login" className={`btn btn-primary ${btn} ${btnPrimary}`}>LOGIN</Link>
          </div>
          <ContainerBox>
              <FlexBox direction='column'>
                  <h2 className={`mt-3 text-center`}>Need something picked up?</h2>
                  <div className={`h5 pt-1 text-center`}>Search our database for available trucks/vehicles</div>
                  <div className={`mt-3`}>
                      <InputBox type='text' placeholder='Enter Location'></InputBox>
                  </div>
                  <div className={`mt-3`}>
                      <InputBox type='text' placeholder='Enter Destination'></InputBox>
                  </div>
                  <div className={`mt-3`}>
                      <InputBox type='text' placeholder='Select Cargo Size'></InputBox>
                  </div>
                  <div className={`mt-4 w-100`}>
                      <button className={`btn btn-dark btn-lg w-100 ${btn} ${btnDark} ${btnLg}`}>SEARCH</button>
                  </div>
              </FlexBox>
          </ContainerBox>
          */}
      </>
  )
}

export default HomePage
