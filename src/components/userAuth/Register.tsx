import React, {MouseEvent, useContext, useState, ChangeEvent} from "react";
import { Paper, TextField, Button, InputLabel , OutlinedInput, InputAdornment, IconButton, FormControl } from "@mui/material";
import {Link} from "react-router-dom";
import "./login.css";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { RootStoreContext } from "../../store/rootStore";
import { observer } from "mobx-react-lite";


const Register = () => {

  const store = useContext(RootStoreContext);
  const {register} = store.commonStore;

  const [values, setValues] = useState({
    firstName: '',
    lastName:'',
    address:'',
    email:'',
    phone:'',
    password: '',
    cpassword:'',
    showPassword: false,
    showCPassword: false
  });

  const  handleRegister = () =>{
    register({
      email: values.email,
      phone: values.phone,
      password: values.password,
      name: values.firstName + values.lastName,
      address:values.address
    })
  }

  const handleChange = (prop: any) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleClickShowCPassword = () => {
    setValues({
      ...values,
      showCPassword: !values.showCPassword,
    });
  };

  const handleMouseDownPassword = (event:MouseEvent) => {
    event.preventDefault();
  };

  return (
    <div>
      <h1>SIGN UP</h1>
      <Paper className="RegisterCard" variant="outlined" >
        <div className="flex">
            <TextField id="outlined-basic" label="First Name" variant="outlined" size="small" value={values.firstName} onChange={handleChange('firstName')} required/>
            <TextField id="outlined-basic" label="Last Name" variant="outlined" size="small" value={values.lastName} onChange={handleChange('lastName')}  required/>
        </div>
        <div className="expand">
        <TextField id="outlined-basic" label="Address" variant="outlined" size="small" value={values.address} onChange={handleChange('address')} required/>
        </div>
        <div className="flex">
            <TextField id="outlined-basic" label="Email" variant="outlined" size="small" value={values.email} onChange={handleChange('email')} required/>
            <TextField id="outlined-basic" label="Phone Number" variant="outlined" size="small" value={values.phone} onChange={handleChange('phone')} required/>
        </div>
        <div className="expand">
        <FormControl size="small" variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            required
          />
        </FormControl>
        </div>
        <div className="expand">
        <FormControl size="small" variant="outlined">
        <InputLabel htmlFor="outlined-adornment-cpassword">Confirm Password</InputLabel>
        <OutlinedInput
            id="outlined-adornment-cpassword"
            type={values.showCPassword ? 'text' : 'password'}
            value={values.cpassword}
            onChange={handleChange('cpassword')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowCPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showCPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            required
          />
        </FormControl>
        </div>
        <Button variant="contained" onClick={handleRegister} disabled = {(values.firstName && values.lastName && values.address && values.email && values.phone && values.password && values.cpassword) ? false : true} color="primary">REGISTER</Button>
        <p>Dont have an account? <Link style={{textDecoration:"none"}} to='/'>Sign In</Link></p>
      </Paper>
    </div>
  );
};

export default observer(Register);
