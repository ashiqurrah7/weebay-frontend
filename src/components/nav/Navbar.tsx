import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, Fragment } from 'react'
import {Link} from 'react-router-dom'
import { RootStoreContext } from '../../store/rootStore'
import { Button } from '@mui/material'
import './navbar.css'



const Navbar = () => {

    const store = useContext(RootStoreContext);
    const {isAuthenticated} = store.commonStore;

    const nonAuthComponents = [
    <Link to ='/'><Button variant="outlined">Login</Button></Link>,
    <Link to ='/products'><Button variant="outlined">Products</Button></Link>
    ];
    const authComponents = [
    <Link to ='/account'><Button variant="outlined">Account</Button></Link>,
    <Link to ='/products'><Button variant="outlined">Products</Button></Link>,
    <Link to ='/products/me'><Button variant="outlined">My Products</Button></Link>,
    <Link to ='/bought'><Button variant="outlined">Bought</Button></Link>,
    <Link to ='/rented'><Button variant="outlined">Rented</Button></Link>
    ];

    return (
        <div className="NavContainer">
            {!isAuthenticated ? nonAuthComponents.map((item, index) => <Fragment key={index}>
                {item}
            </Fragment>) : authComponents.map((item, index) => <Fragment key={index}>
                {item}
            </Fragment>)}
        </div>
    )
}

export default observer(Navbar);
