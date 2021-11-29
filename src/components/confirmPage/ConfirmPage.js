import React from "react";
import "./ConfirmPage.css";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


function ConfirmPage({product, quantity, address}){
  return (
    <Box id="confirm-page">
      <Box id="confirm-item">
          <Typography component="h1" variant="h1" id="confirm-item-name">{product[1].name}</Typography>
          <Typography>Quantity : <b>{quantity}</b></Typography>
          <Typography>Category : <b>{product[1].category}</b></Typography>
          <Typography className="italic">{product[1].description}</Typography>
          <Typography><span style={{fontSize : "30px", color : "red"}}>Total Price : </span><span className="price">{product[1].price * quantity}</span></Typography>
      </Box>
      <Box id="confirm-address">
        <Typography>{address}</Typography>
      </Box>
    </Box>
  )
}

export default ConfirmPage;