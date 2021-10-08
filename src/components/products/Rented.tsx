import React, {useContext, useEffect} from "react";
import {
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";
import Logout from "../shared/Logout";
import { Link } from "react-router-dom";
import "./products.css";
import * as moment from "moment";
import { RootStoreContext } from "../../store/rootStore";
import { observer } from "mobx-react-lite";

const Rented = () => {
  const store = useContext(RootStoreContext);
  const { rented, loadingProducts, getRented, user } = store.commonStore;

  useEffect(()=>{
    if(user != null) {
        getRented(user.id);
    };
  },[user])


  return loadingProducts ? (
    <div className="ProductsContainer"><CircularProgress /> </div>
  ) : (
    <div className="ProductsContainer">
      {rented ? <div>
        <Typography sx={rented.length> 2 ? {mt:"15rem"} : {}} variant="h4" component="div" gutterBottom>
        RENTED PRODUCTS
      </Typography>
        {rented.map((item, index) => (
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
              ? `${item.desc.substring(0, 250)} ${(
                  <Link to="/">...More Details</Link>
                )}`
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

export default observer(Rented);
