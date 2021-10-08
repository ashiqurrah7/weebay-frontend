import React, { FormEvent, useContext, useState } from "react";
import {
  TextField,
  Button,
  InputLabel,
  OutlinedInput,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
  Theme,
  useTheme,
  Typography
} from "@mui/material";
import { Link } from "react-router-dom";
import "./products.css";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../store/rootStore";
import Logout from "../shared/Logout";

const CreateProduct = () => {
  const store = useContext(RootStoreContext);
  const {user, addProduct} = store.commonStore;
  const [values, setValues] = useState({
    title: "",
    categories: "",
    desc: "",
    price: 0,
    rentRate: 0,
    rentInterval:"hourly"
  });
  const [categoryName, setCategories] = useState<string[]>([]);

  const categories = [
    'Electronics',
    'Furniture',
    'Home Appliances',
    'Sporting Goods',
    'Outdoor',
    'Toys'
  ];
  const handleCategory = (event: SelectChangeEvent<typeof categoryName>) => {
    const {
      target: { value },
    } = event;
    setValues({ ...values, categories: typeof value === 'string' ? value : value.join(', ')});
    setCategories(typeof value === 'string' ? value.split(',') : value);
  };

  const handleSelect = (event: SelectChangeEvent) => {
    setValues({ ...values, rentInterval: event.target.value as string});
  };
  const theme = useTheme();

  function getStyles(name: string, personName: string[], theme: Theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const handleChange =
    (prop: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

    const handleSubmit=(e: FormEvent) => {
      e.preventDefault();
      if(user) addProduct({...values, user_id:user.id});
    }

  return user ? <form className="AddProductContainer" onSubmit={handleSubmit}>
  <Typography variant="h4" component="div" gutterBottom sx={{textAlign:"center"}}>
    ADD A PRODUCT
  </Typography>
  <label htmlFor="title">Title</label>
  <div className="expand">
  <TextField id="outlined-basic" variant="outlined" size="small" value={values.title} onChange={handleChange('title')} required/>
  </div>
  <label htmlFor="categories">Categories</label>
  <FormControl size="small" sx={{ m: 1, ml:0, width: 300 }}>
    <InputLabel id="demo-multiple-name-label">Select a Category</InputLabel>
    <Select
      labelId="demo-multiple-name-label"
      id="demo-multiple-name"
      multiple
      value={categoryName}
      onChange={handleCategory}
      input={<OutlinedInput label="Select a Category" />}
      MenuProps={MenuProps}
      required
    >
      {categories.map((category) => (
        <MenuItem
          key={category}
          value={category}
          style={getStyles(category, categoryName, theme)}
        >
          {category}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
  <label htmlFor="description">Description</label>
  <div className="expand">
  <TextField rows="6" id="outlined-basic" multiline variant="outlined" size="small" value={values.desc} onChange={handleChange('desc')} required/>
  </div>
  <div className="flex" style={{justifyContent:"space-between"}}>
    <div className="stack">
    <label htmlFor="price">Price</label>
    <TextField id="outlined-basic" variant="outlined" size="small" value={values.price} onChange={handleChange('price')} required/>
    </div>

    <div className="stack">
    <label htmlFor="rent">Rent</label>
    <TextField id="outlined-basic" variant="outlined" size="small" value={values.rentRate} onChange={handleChange('rentRate')} required/>
    </div>
    <div>
    <label htmlFor="">Rent Interval</label>
    <FormControl size="small" fullWidth>
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={values.rentInterval}
      onChange={handleSelect}
      required
    >
      <MenuItem value='hourly'>Hourly</MenuItem>
      <MenuItem value='daily'>Daily</MenuItem>
    </Select>
  </FormControl>
    </div>
  </div>
  <Button type="submit" sx={{ alignSelf:"flex-end", maxWidth:"max-content", mt:"1em"}} variant="contained">
    Add Product
  </Button>
  <Logout />
</form> : <div>Nothing to display</div>
};

export default observer(CreateProduct);
