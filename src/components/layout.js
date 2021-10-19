import React from 'react'
import { FirebaseProvider } from '../services/firebase-provider'
import Helmet from 'react-helmet'

const Layout = ({children}) => (
    <FirebaseProvider>
    	<Helmet>
    		<title>CourierGH</title>
    		<meta name="description" content="Want to move things from one location to other? Look no further"/>
    	</Helmet>
        {children}
    </FirebaseProvider>
)

export default Layout
