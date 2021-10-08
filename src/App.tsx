import React, {useEffect, useContext} from 'react'
import './App.css'
import { Grid} from "@mui/material";
import Login from './components/userAuth/Login'
import Register from './components/userAuth/Register'
import Account from './components/userAuth/Account'
import MyProducts from './components/products/MyProducts'
import CreateProduct from './components/products/CreateProduct'
import {Switch, Route} from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RootStoreContext } from './store/rootStore';
import { observer } from "mobx-react-lite";
import Products from './components/products/Products';
import ProductDetail from './components/products/ProductDetail';
import Bought from './components/products/Bought';
import Rented from './components/products/Rented';
import PrivateRoute from './components/routing/PrivateRoute';
import EditProduct from './components/products/EditProduct';
import Navbar from './components/nav/Navbar';
if(localStorage.jwt) {
  console.log(localStorage.jwt);
}


function App() {
  const store = useContext(RootStoreContext);
  const {getUser, isAuthenticated} = store.commonStore;
  useEffect(() => {
      getUser(parseInt(localStorage.jwt));
      console.log(isAuthenticated);
  }, [isAuthenticated])

  return (
    <div className="App">
      <ToastContainer hideProgressBar autoClose={2500} position="top-right"  style={{width:"max-content", paddingRight:"10px"}}/>
      <Grid container justifyContent="center" maxWidth="sm">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/account" component={Account}/>
          <Route exact path="/bought" component={Bought} />
          <Route exact path="/rented" component={Rented} />
          <Route exact path="/products" component={Products} />
          <Route exact path="/products/me" component={MyProducts} />
          <Route exact path="/products/add" component={CreateProduct} />
          <Route exact path="/products/:id" component={ProductDetail} />
          <Route exact path="/products/:id/edit" component={EditProduct} />
        </Switch>
      </Grid>
    </div>
  )
}

export default observer(App);
