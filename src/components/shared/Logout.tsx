import React, { useContext } from 'react'
import { Button } from '@mui/material'
import './shared.css'
import { observer } from 'mobx-react-lite'
import { RootStoreContext } from '../../store/rootStore'
import {Link} from 'react-router-dom'

const Logout = () => {
    const store = useContext(RootStoreContext);
    const {logout} = store.commonStore;
    return (
        <div className="Logout">
            <Link to='/'><Button variant="contained" onClick={logout} color="error">LOGOUT</Button></Link>
        </div>
    )
}

export default observer(Logout)
