import React, {MouseEvent, useContext, useState, FormEvent, useEffect} from "react";
import { Paper, TextField, Button, InputLabel , OutlinedInput, InputAdornment, IconButton, FormControl, CircularProgress } from "@mui/material";
import Logout from "../shared/Logout";
import "./login.css";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { RootStoreContext } from "../../store/rootStore";


const Account = () => {

  const store = useContext(RootStoreContext);
  const {user, editUser} = store.commonStore;

  useEffect(() => {
    console.log(user);
    if(user) setValues({
      name: user.name,
      address: user.address,
      email: user.email,
      phone: user.phone,
      password: user.password
    })
  }, [user])

  const [values, setValues] = useState({
    name: '',
    address: '',
    email:'',
    phone:'',
    password:''
  });

  const [auxValues, setAuxValues] = useState({
    cpassword: '',
    showPassword: false,
    showCPassword: false
  });


  const handleChange = (prop: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  
  const handleSubmit=(e: FormEvent) => {
    e.preventDefault();
    if(user) editUser(user.id, {...values})
  }

  const handleClickShowPassword = () => {
    setAuxValues({
      ...auxValues,
      showPassword: !auxValues.showPassword,
    });
  };

  const handleClickShowCPassword = () => {
    setAuxValues({
      ...auxValues,
      showCPassword: !auxValues.showCPassword,
    });
  };

  const handleMouseDownPassword = (event:MouseEvent) => {
    event.preventDefault();
  };

  return user ? <form onSubmit={handleSubmit}>
    <h1>ACCOUNT SETTINGS</h1>
    <Paper className="RegisterCard" variant="outlined" >
      <div className="expand">
      <TextField id="outlined-basic" label="Name" variant="outlined" value={values.name} onChange={handleChange('name')} size="small" required/>
      </div>
      <div className="expand">
      <TextField id="outlined-basic" label="Address" variant="outlined" value={values.address} onChange={handleChange('address')} size="small" required/>
      </div>
      <div className="flex">
          <TextField id="outlined-basic" label="Email" variant="outlined" value={values.email} onChange={handleChange('email')} size="small" required/>
          <TextField id="outlined-basic" label="Phone Number" variant="outlined" value={values.phone} onChange={handleChange('phone')} size="small" required/>
      </div>
      <div className="expand">
      <FormControl size="small" variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
      <OutlinedInput
          id="outlined-adornment-password"
          type={auxValues.showPassword ? 'text' : 'password'}
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
                {auxValues.showPassword ? <VisibilityOff /> : <Visibility />}
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
          type={auxValues.showCPassword ? 'text' : 'password'}
          value={auxValues.cpassword}
          onChange={handleChange('cpassword')}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowCPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {auxValues.showCPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
      </div>
      <Button variant="contained" color="primary">UPDATE</Button>
      <Logout />
    </Paper>
  </form> : <div>Nothing to Display</div>
};

export default Account;
