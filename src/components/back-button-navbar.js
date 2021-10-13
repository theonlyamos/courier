import React from 'react'
import {navigate} from 'gatsby'

const BackButtonNavbar = ({pageTitle})=>{
    return (
        <>
            <div className={`w-100 d-flex justify-content-between align-items-center p-3 sticky-top bg-white`}>
                <button className="btn" onClick={()=>navigate(-1)}>
                    <i className={`fas fa-angle-left fa-2x text-dark`}></i>
                </button>
                <h5 className={`p-0 m-0`}>{pageTitle}</h5>
            </div>
        </>
    )
}

export default BackButtonNavbar