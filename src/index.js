import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import NavigationBar from "./common/navigationBar/NavigationBar";
import SignIn from "./components/signIn/SignIn";
import SignUp from "./components/signUp/SignUp";


ReactDOM.render(
  <SignUp />,
  document.getElementById('root')
);
