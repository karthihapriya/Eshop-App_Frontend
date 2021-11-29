import React from "react";
import {Typography, Link} from "@mui/material";
import "./Footer.css";

function Footer(){
  return (
    <Typography id="copyright" >
      Copyright &copy; <Link href="#" underline="always" rel="noopener">upGrad</Link> 2021
    </Typography>
  )
}

export default Footer;