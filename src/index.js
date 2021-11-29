import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import NavigationBar from "./common/navigationBar/NavigationBar";
import SignIn from "./components/signIn/SignIn";
import SignUp from "./components/signUp/SignUp";
import ProductPage from "./components/productsPage/ProductsPage";


ReactDOM.render(
  <ProductPage isAdmin/>,
  document.getElementById('root')
);
