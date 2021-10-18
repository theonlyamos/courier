import React from 'react'
import { FirebaseProvider } from '../services/firebase-provider'

const Layout = ({children}) => (
    <FirebaseProvider>
        {children}
    </FirebaseProvider>
)

export default Layout