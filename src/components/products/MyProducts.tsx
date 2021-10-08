import React, {useState, useContext, useEffect } from "react";
import {
  Paper,
  Dialog,
  DialogActions,
  DialogTitle,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import Logout from "../shared/Logout";
import { Link } from "react-router-dom";
import "./products.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import * as moment from "moment";
import { RootStoreContext } from "../../store/rootStore";
import { observer } from "mobx-react-lite";

const MyProducts = () => {
  const store = useContext(RootStoreContext);
  const { myProducts, loadingMyProducts, getMyProducts, removeProduct, user } = store.commonStore;
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(0);

  useEffect(()=>{
    if(user) getMyProducts(user.id);
  },[user])

  const handleClickOpen = (id:number) => {
    setSelected(id);
    setOpen(true);
  };

  const handleClose = () => {
    setSelected(0);
    setOpen(false);
  };

  const handleDelete = () => {
    removeProduct(selected);
    setSelected(0);
    setOpen(false);
  };

  return (user && myProducts) ? <div className="MyProductsContainer">
  <Typography variant="h4" component="div" gutterBottom>
    MY PRODUCTS
  </Typography>
  {myProducts!.map((item, index) => (
    <Paper key={index} className="MyProductCard" variant="outlined">
      <div className="myProductHead">
        <Typography variant="h5" component="div" gutterBottom>
          {item.title}
        </Typography>
        <div>
        <Link to={`/products/${item.id}/edit`}>
          <IconButton >
            <EditIcon />
          </IconButton>
        </Link>
        <IconButton onClick={() => handleClickOpen(item.id)}>
          <DeleteIcon />
        </IconButton>
        </div>
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
  <Link to='/products/add'>
    <Button sx={{ float: "right" }} variant="contained">
    Add Product
    </Button>
  </Link>
  <br />
  <Logout />

  <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
      {"Are you sure you want to delete this product?"}
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
      <Button variant="contained" onClick={handleDelete} autoFocus>
        Yes
      </Button>
    </DialogActions>
  </Dialog>
</div> : <div>Nothing to display</div>
};

export default observer(MyProducts);
