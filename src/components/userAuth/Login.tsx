import React, {useContext, useState, ChangeEvent} from "react";
import { Paper, TextField, Button } from "@mui/material";
import {Link} from "react-router-dom";
import "./login.css";
import { RootStoreContext } from "../../store/rootStore";
import { observer } from "mobx-react-lite";


const Login = (history: any) => {

  const store = useContext(RootStoreContext);
  const {login} = store.commonStore;

  const [values, setValues] = useState({
    email:'',
    password: ''
  });

  const  handleLogin = () =>{
    login({
      email: values.email,
      password: values.password,
    });
  }

  const handleChange = (prop: any) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <div>
      <h1>SIGN IN</h1>
      <Paper className="LoginCard" variant="outlined" >
        <TextField id="outlined-basic" label="Email" variant="outlined" size="small" value={values.email} onChange={handleChange('email')} required/>
        <TextField type="password" id="outlined-basic" label="Password" variant="outlined" size="small" value={values.password} onChange={handleChange('password')} required/>
        <Link to='/products'><Button variant="contained" onClick={handleLogin} color="primary" disabled = {(values.email && values.password) ? false : true} >LOGIN</Button></Link>
        <p>Dont have an account? <Link style={{textDecoration:"none"}} to='/'>Sign Up</Link></p>
      </Paper>
    </div>
  );
};

export default observer(Login);
