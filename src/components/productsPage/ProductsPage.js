import React, { useEffect, useState } from "react";
import NavigationBar from "../../common/navigationBar/NavigationBar";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import "./ProductsPage.css";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import {Select, MenuItem, InputLabel} from "@mui/material"

function ProductsPage({isAdmin}){
  const [toggleValue, setToggleValue] = useState('All');
  const [selectValue, setSelectValue] = useState('default');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(['All']);

  useEffect(()=>{
    const url = "http://localhost:8000/api/products/categories";
    fetch(url)
      .then(response=>response.json())
      .then(res=>setCategories([...categories, ...res]));
  }, [])

  useEffect(()=>{
    switch(selectValue){
      case "price-ltoh" : handleSortFetch("price", "ASC");
      break;
      case "price-htol" : handleSortFetch("price", "DESC");
      break;
      case "default" : handleSortFetch(null, null);
      break;
      case "newest" : handleSortFetch("createdAt", "DESC");
      break;
      default : return null;
    }
  },[selectValue])

  useEffect(()=>{
    toggleValue === "All" ? handleCategoryFetch(null) : handleCategoryFetch(toggleValue);
  }, [toggleValue])

  const handleSortFetch=(type, value)=>{
    const url = `http://localhost:8000/api/products`;
    let urlToSend = type ? `${url}?sortBy=${type}&direction=${value}` : url;
    if(toggleValue !== "All"){
      urlToSend = type ? `${url}?category=${toggleValue}&sortBy=${type}&direction=${value}` : url;
    }
    fetch(urlToSend)
      .then(response=>response.json())
      .then(res=>setProducts(res.content));
  }

  const handleCategoryFetch=(category)=>{
    const url = `http://localhost:8000/api/products`;
    const urlToSend = category ? `${url}?category=${category}` : url;
    fetch(urlToSend)
      .then(response=>response.json())
      .then(res=>setProducts(res.content));
  }

  const handleChange=(event, type)=>{
    const {value} = event.target;
    type === "toggle" ? setToggleValue(value) : setSelectValue(value);
  }

  return(
    <>
      <NavigationBar />
        <div id="toggle-btn-container">
          <ToggleButtonGroup exclusive={true} value={toggleValue} onChange={e=>handleChange(e,"toggle")}>
            {categories.map(item=>(
              <ToggleButton key={item} value={item}>{item}</ToggleButton>
            ))}
          </ToggleButtonGroup>
        </div>
        <div id="select-container">
          <InputLabel htmlFor="select-input" sx={{fontWeight : 500}}>Sort By : </InputLabel>
          <Select
            sx={{width : "20%"}}
            onChange={e=>handleChange(e,"select")}
            value={selectValue}
            inputProps={{
              'id' : "select-input"
            }}
          >
            <MenuItem value="default">Default</MenuItem>
            <MenuItem value="price-htol">Price : High to Low</MenuItem>
            <MenuItem value="price-ltoh">Price : Low to High</MenuItem>
            <MenuItem value="newest">Price : Newest</MenuItem>
          </Select>
        </div>
        <Grid id="grid-container" container columns={8} columnSpacing={5} rowSpacing={5}>
          {products.map(item=>(
            <Grid item lg={2} md={2} xs={2} sx={{display : "flex"}} >
                <Card sx={{display: 'flex', flexDirection: 'column'}}>
                  <div>
                  <CardMedia
                    component="img"
                    height="240"
                    image={item.imageURL}
                    alt={item.name}
                  />
                  </div>
                  <CardContent>
                    <div className="card-header">
                      <Typography gutterBottom variant="h5" component="div">
                        {item.name}
                      </Typography>
                      <Typography gutterBottom variant="h5" component="div">
                        <>&#8377;</>{`${item.price}`}
                      </Typography>
                    </div>
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{marginTop : "auto"}}>
                      <div className="btns-container">
                        <Button variant="contained" size="small">Buy</Button>
                        {isAdmin && 
                        <ButtonGroup variant="string">
                          <Button size="small"><EditIcon /></Button>
                          <Button size="small"><DeleteIcon /></Button>
                        </ButtonGroup>}
                      </div>
                  </CardActions>
                </Card>
            </Grid>
          ))}
        </Grid>
    </>
  )
}

export default ProductsPage;