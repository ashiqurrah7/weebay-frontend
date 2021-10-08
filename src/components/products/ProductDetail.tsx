import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { RootStoreContext } from "../../store/rootStore";
import { CircularProgress, Typography, Button, Dialog, DialogTitle, DialogActions } from "@mui/material";
import { useParams } from "react-router";
import * as moment from "moment";
import Logout from "../shared/Logout";
import { Link } from "react-router-dom";

const ProductDetail = () => {
  const store = useContext(RootStoreContext);
  const { user,product, getProduct, buy, rent } = store.commonStore;
  type RouteParams = {
    id: string;
  };
  const { id } = useParams<RouteParams>();
  useEffect(() => {
    getProduct(parseInt(id));
  }, [id, user]);

  const [openBuy, setOpenBuy] = useState(false);
  const [openRent, setOpenRent] = useState(false);

  const handleClickBuy = () => {
    setOpenBuy(true);
  };

  const handleBuy = () => {
    if(user && product) buy({user_id:user.id, product_id: product.id});
    else alert('please login')
  }

  const handleRent = () => {
    if(user && product) rent({user_id:user.id, product_id: product.id});
    else alert('please login')
  }

  const handleClickRent = () => {
    setOpenRent(true);
  };

  const handleClose = () => {
    setOpenBuy(false);
    setOpenRent(false);
  };

  return product ? <div className="ProductDetailsContainer">
  <div className="myProductHead">
    <Typography variant="h5" component="div" gutterBottom>
      {product!.title}
    </Typography>
  </div>
  <Typography
    className="greyFont"
    variant="subtitle1"
    component="div"
    gutterBottom
  >
    Categories: {product?.categories}
  </Typography>
  <Typography
    className="greyFont"
    variant="subtitle1"
    component="div"
    gutterBottom
  >
    Price: {product!.price} | Rent: ${product!.rentRate}{" "}
    {product!.rentInterval}
  </Typography>
  <Typography paragraph component="div" gutterBottom>
    {product!.desc}
  </Typography>
  <div className="myProductHead">
    <Typography
      className="greyFont"
      variant="caption"
      component="div"
      gutterBottom
    >
      Date posted: {moment(product!.created_at).format("Do MMMM YYYY")}
    </Typography>
    <Typography
      className="greyFont"
      variant="caption"
      component="div"
      gutterBottom
    >
      {product!.views} views
    </Typography>
  </div>
  <div style={{display:"flex", justifyContent:"flex-end"}}>
      <Button
        sx={{
          mt: "1em",
          mr: "1em"
        }}
        variant="contained"
        onClick={handleClickBuy} 
      >
        Buy
      </Button>

      <Button
        sx={{
          mt: "1em",
        }}
        variant="contained"
        onClick={handleClickRent}
      >
        Rent
      </Button>
    </div>
    <Logout />

    <Dialog
    open={openBuy}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
      {"Are you sure you want to buy this product?"}
    </DialogTitle>
    <DialogActions>
      <Button
        sx={{ marginRight: "0.5em" }}
        variant="contained"
        color="error"
        onClick={handleClose}
      >
        No
      </Button>
      <Button onClick={handleBuy} variant="contained" autoFocus>
        Yes
      </Button>
    </DialogActions>
  </Dialog>

  <Dialog
    open={openRent}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
      {"Are you sure you want to rent this product?"}
    </DialogTitle>
    <DialogActions>
      <Button
        sx={{ marginRight: "0.5em" }}
        variant="contained"
        color="error"
        onClick={handleClose}
      >
        No
      </Button>
      <Button onClick={handleRent} variant="contained" autoFocus>
        Yes
      </Button>
    </DialogActions>
  </Dialog>
</div> : <div>Nothing to display</div>
};

export default observer(ProductDetail);
