import React from 'react'
import { Router } from '@reach/router'
import Profile from '../components/profile'
import Driver from '../components/driver'
import Login from '../components/login'
import Signup from '../components/signup'
import Setup from '../components/setup'
import Loader from '../components/dashboard'
import NewOrder from '../components/new-order'
import Orders from '../components/orders'
import OrderDetails from '../components/order-details'
import Pricing from '../components/pricing'
import Vehicle from '../components/vehicle'
import NewVehicle from '../components/new-vehicle'
import Account from '../components/account'
import Settings from '../components/settings'

import PrivateRoute from '../components/privateRoute'

const App = () => (
    <Router basepath="/app">
        <PrivateRoute path="/profile" component={Profile}/>
        <PrivateRoute path="/orders" component={Orders}/>
        <PrivateRoute path="/orders/new" component={NewOrder}/>
        <PrivateRoute path="/orders/:orderId" component={OrderDetails}/>
        <Driver path="/driver"/>
        <Account path="/account"/>
        <PrivateRoute path="/setup" component={Setup}/>
        <PrivateRoute path="/pricing" component={Pricing}/>
        <PrivateRoute path="/vehicle" component={Vehicle}/>
        <PrivateRoute path="/vehicle/new" component={NewVehicle}/>
        <Signup path="/signup"/>
        <Login path="/login"/>
        <Settings path="/settings"/>
        <Loader default/>
    </Router>
)

export default App