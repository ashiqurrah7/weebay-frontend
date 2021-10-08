import React, {useState, useContext, useEffect, ChangeEvent, Fragment } from "react";
import {
  Paper,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import Logout from "../shared/Logout";
import { Link } from "react-router-dom";
import "./products.css";
import * as moment from "moment";
import { RootStoreContext } from "../../store/rootStore";
import { observer } from "mobx-react-lite";

const Products = () => {
  const store = useContext(RootStoreContext);
  const { products, loadingProducts, getProducts, removeProduct, user } = store.commonStore;
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(0);

  useEffect(()=>{
    if(user) getProducts();
  },[user])

  const [values, setValues] = useState({
    search:'',
    password: ''
  });


  const handleChange = (prop: any) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return loadingProducts ? (
    <div className="ProductsContainer"><CircularProgress /> </div>
  ) : (
    <div className="ProductsContainer">
      <Paper className="searchProducts">
      Search
      <TextField id="outlined-basic" label="search" variant="outlined" size="small" value={values.search} onChange={handleChange('search')}/>
      </Paper>
      {products ? <div>
        <Typography sx={products.length> 2 ? {mt:"15rem"} : {}} variant="h4" component="div" gutterBottom>
        PRODUCTS
      </Typography>
        {products.map((item, index) => (
        <Paper key={index} className="MyProductCard" variant="outlined">
          <div className="myProductHead">
            <Typography variant="h5" component="div" gutterBottom>
              {item.title}
            </Typography>
          </div>
          <Typography
            className="greyFont"
            variant="subtitle1"
            component="div"
            gutterBottom
          >
            Categories: {item.categories}
          </Typography>
          <Typography
            className="greyFont"
            variant="subtitle1"
            component="div"
            gutterBottom
          >
            Price: {item.price} | Rent: ${item.rentRate} {item.rentInterval}
          </Typography>
          <Typography paragraph component="div" gutterBottom>
            {item.desc.length > 250
              ? <Fragment>{item.desc.substring(0, 250)} <Link to={`/products/${item.id}`} style={{textDecoration:"none"}}>...More Details</Link></Fragment>
              : item.desc}
          </Typography>
          <div className="myProductHead">
            <Typography
              className="greyFont"
              variant="caption"
              component="div"
              gutterBottom
            >
              Date posted: {moment(item.created_at).format("Do MMMM YYYY")}
            </Typography>
            <Typography
              className="greyFont"
              variant="caption"
              component="div"
              gutterBottom
            >
              {item.views} views
            </Typography>
          </div>
        </Paper>
      ))}
      </div> : <div>Nothing to Display</div>}
      <br />
      <Logout />
    </div>
  );
};

export default observer(Products);
