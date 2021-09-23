import * as React from "react"
import { Link } from 'gatsby'
import { btn, btnLg } from '../styles.module.css'

const SetupPage = ()=>{
  return (
      <>
          
          <div className={`container`}>
              <div className={`w-100 d-flex justify-content-between align-items-center p-3`}>
                 <h5 className={`text-dark m-0`}>Add Vehicle/Truck</h5> 
                  <Link to='/app'>
                      <i className={`far fa-user-circle fa-2x text-dark`}></i>
                  </Link>
              </div>

              <form name="addTruck" netlify>
                  <div className={`row align-items-center justify-content-center`}>
                      <div className={`col-sm-9 col-md-3 col-lg-4`}>
                          <div className={`form-group mt-3`}>
                              <label for='type' className={`text-muted small`}>Vehicle/Truck Type</label>
                              <select name='type' id='type' className={`form-control custom-check`}>
                                  <option></option>
                                  <option value='mini'>Mini Truck</option>
                                  <option value='mega'>Mega Truck</option>
                              </select>
                          </div>
                          <div className={`form-group mt-3 rounded`}>
                              <label for='makeAndModel' className={`text-muted small`}>Make & Model</label>
                              <input type='text' className={`form-control`} name='makeAndModel' id='makeAndModel' required/>
                          </div>
                          <div className={`form-group mt-3 rounded`}>
                              <label for='plateNumber' className={`text-muted small`}>Plate Number</label>
                              <input type='text' className={`form-control`} name='plateNumber' id='plateNumber' required/>
                          </div>
                          <div className={`form-group mt-3 rounded`}>
                              <label for='features' className={`text-muted small`}><small>Other identifiable features, separated by comma</small></label>
                              <textarea rows='3' name='features' id='features' className={`form-control`} ></textarea>
                          </div>
                          <div className={`form-group mt-3 rounded`}>
                              <label for='images' className={`text-muted small`}>Add pictures of vehicle/truck</label>
                              <input type='file' className={`form-control form-file`} name='images' id='images' placeholder='Images of the vehicle' multiple required/>
                          </div>
                          <div className={`d-flex`}>
                              <i className={`fas fa-images fa-3x m-2`}></i> 
                              <i className={`fas fa-images fa-3x m-2`}></i> 
                              <i className={`fas fa-images fa-3x m-2`}></i> 
                          </div> 
                          <div className={`form-group mt-3`}>
                              <button className={`${btn} btn-primary ${btnLg} w-100`}>Submit</button>

                          </div>
                      </div>
                  </div>
              </form>
          </div>


      </>
  )
}

export default SetupPage
