import { Button, TextField, Typography } from "@mui/material";
import React, {useState} from "react";
import "./ProductDetails.css";

function ProductDetails({product}){
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");

  const handleChange=(event)=>{
    const {name, value} = event.target;
    console.log(value);
    if(name==="product-quantity"){
      setQuantity(value);
    }
  }

  const handleClick=()=>{
    let quantityRegex = /^\d+$/
    if(quantityRegex.test(quantity) && quantity <= product[1].availableItems && quantity > 0){
      console.log("all well");
      setError(false);
      setHelperText("");
    }else{
      if(quantity > product[1].availableItems){
        setError(true);
        setHelperText("Insufficient quantity");
      }else{
        setError(true);
        setHelperText("Invalid Entry");
      }
    }
  }
  return (
    <div id="product-container">
      <div id="product-image-container">
        <img id="product-image" src={product[1].imageURL}/>
      </div>
      <div id="product-details">
        <div id="details-header">
          <Typography component="h1" variant="h1" id="product-name">{product[1].name}</Typography>
          <Button variant="contained">Available Quantity : {product[1].availableItems}</Button>
        </div>
        <Typography>Category : <b>{product[1].category}</b></Typography>
        <Typography className="italic">{product[1].description}</Typography>
        <Typography id="price">{product[1].price}</Typography>
        <TextField
          label="Enter Quantity"
          required
          type="number"
          name='product-quantity'
          value={quantity}
          onChange={handleChange}
          error={error}
          helperText={helperText}
        />
        <Button id="order-btn" onClick={handleClick} variant="contained" ><Typography>Place Order</Typography></Button>
      </div>
    </div>
  )
}

export default ProductDetails;