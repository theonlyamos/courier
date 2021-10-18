import React, {useEffect, useContext} from "react"
import { navigate } from "gatsby"
//import { isAuthenticated } from "../services/auth"
import { FirebaseContext } from "../services/firebase-provider"

const PrivateRoute = ({ component: Component, location, ...rest }) => {
    const { authToken } = useContext(FirebaseContext)

    useEffect(()=>{
        checkLoginStatus()
    },[])

    const checkLoginStatus = () => {
      if (!authToken && location.pathname !== `/app/login`) {
          navigate("/app/login")
          return null
      }
    }
  /*
  if (!isAuthenticated() && location.pathname !== `/app/login`) {
    navigate("/app/login")
    return null
  }
  */

  return <Component {...rest} />
}

export default PrivateRoute
