import React, {useReducer} from "react";
import { FormControl, TextField, Typography } from "@mui/material";
import NavigationBar from "../../common/navigationBar/NavigationBar"
import { Button } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import "./SignIn.css";
import Footer from "../../common/footer/Footer";

const SET_EMAIL = "SET_EMAIL";
const SET_PASSWORD = "SET_PASSWORD";
const SET_EMAIL_ERROR = "SET_EMAIL_ERROR";
const SET_PASSWORD_ERROR = "SET_PASSWORD_ERROR";

const initialState ={
  email : "",
  password : "",
  emailError : false,
  passwordError : false,
  emailHelperText : "",
  passwordHelperText : ""
}

const reducer = (state, action)=>{
  switch(action.type){
    case SET_EMAIL : return  {...state, email : action.value};
    case SET_PASSWORD : return  {...state, password : action.value};
    case SET_EMAIL_ERROR : return {...state, emailError : action.value, emailHelperText : "Required"};
    case SET_PASSWORD_ERROR : return {...state, passwordError : action.value, passwordHelperText : "Required"};
    default : return state;
  }
}

function SignIn(){

  const [formData, dispatch] = useReducer(reducer, initialState);

  const handleChange=(event)=>{
    const {name, value} = event.target;
    if(name === "email-signin"){
      dispatch({type : SET_EMAIL, value});
    }else{
      dispatch({type : SET_PASSWORD, value});
    }
  }

  return (
    <>
      <NavigationBar/>
      <div className="form-container">
        <div id="signin-header">
          <LockOutlinedIcon id="lock-logo" fontSize="large" />
          <Typography component="h4" variant="h4">Sign in</Typography>
        </div>
        <form>
          <FormControl>
            <TextField
              required
              type="email"
              name="email-signin"
              onChange={handleChange}
              value={formData.email}
              error={formData.emailError}
              helperText={formData.emailHelperText}
              label="Email Address"
              InputLabelProps={{ shrink: true }}
            />
          </FormControl>
          <FormControl>
            <TextField
              required
              type="password"
              name="password-signin"
              onChange={handleChange}
              value={formData.password}
              error={formData.passwordError}
              helperText={formData.passwordHelperText}
              label="Password"
              InputLabelProps={{ shrink: true }}
            />
          </FormControl>
          <Button variant="contained" fullWidth type="submit">
            <Typography>SIGN IN</Typography>
          </Button>
          <a href="#">
            <Typography component="p">Don't have an account? Sign Up</Typography>
          </a>
        </form>
        <div id="footer">
          <Footer />
        </div>
      </div>
    </>
  ) 
}

export default SignIn;
