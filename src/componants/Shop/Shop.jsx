import React from 'react';
import {
    Box,
    Button,
    Chip,
    CircularProgress,
    IconButton,
    Rating,
    Stack,
    TextField,
    Typography,
    useMediaQuery,
    useTheme,
    Checkbox,
    FormControlLabel,
    FormGroup
  } from
    "@mui/material";
  import { useState } from "react";
  import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
  import FavoriteIcon from "@mui/icons-material/Favorite";
  import SearchIcon from "@mui/icons-material/Search";
  import { useGetproductByNameQuery } from "../../services/productApi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AddToCart, decrement, increment } from "../../services/CartSlice";
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RemoveIcon from '@mui/icons-material/Remove';
import { AddToFav, deleteFromFav } from "../../services/FavSlice";
import ScrollToTop from "../../ExternalMethods/ScrollToTop";
import BannerSection from "../Home/HomeSections/bannerSection";

const Shop = () => {

  const Tags = [
    {Tag : "Chairs"} , 
    {Tag : "BedRoom"} , 
    {Tag : "Bed"} , 
    {Tag : "Cabinet"} , 
    {Tag : "Sofa"} , 
    {Tag : "Decor"} , 
    {Tag : "Office"} , 
    {Tag : "Lamp"} , 
    {Tag : "Accent Furniture"} , 
    {Tag : "Special Offer"} , 
  ]


  const { data, error, isLoading } = useGetproductByNameQuery();
  const { SelectedProductsId , SelectedProducts  } = useSelector((state) => state.Cart);
  const { favProductsId   } = useSelector((state) => state.Fav);
  let checked = ["All"];
  const dispatch = useDispatch();
  const Navigate = useNavigate();
 



//   ________________________________________________________________
  const uniqueProducts = [];
  const categories = [];

  if (data) {
    // ____________________________________
    // this code is used to get only one product for each category 
    // ____________________________________
  // Iterate over each product
  for (const product of data) {
      const category = product.category;
      // Check if the category is already added to the uniqueProducts array
      if (!categories.includes(category)) {
      uniqueProducts.push(product);
      categories.push(category);
      }
  }
  }
//_________________________________________________________________



  const valueFilter = (checked)=>{
      return checked.includes("All")? data : data.filter((product)=> product.category === checked);
  }

  function ProductQuantity(item) {
      const useritem = SelectedProducts.find((userselect) => {
        return userselect.id === item.id;
      });
      return useritem.quantity;
    }

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
    


    return (
        <>
    <ScrollToTop/>
    <BannerSection  PageName="Shop" />

    {error && 
   <Box  sx={{display : "flex" , justifyContent : "center" , alignItems : "center" ,width : "100%" , height : "100%"}}>
    <Typography variant="h6">Data Not Found</Typography>
    </Box>
   }


     {isLoading && 
      <Box sx={{display : "flex" , justifyContent : "center" , alignItems : "center" ,width : "100%" , height : "100%"}}>
      <CircularProgress />
  </Box>
     
     }

<Box sx={{ p : "50px 0" , width : "100%" , display : "flex" , justifyContent : "center" , border : "2px solid black"}}>

{data && 

<>
    <Box sx={{display : "flex" , flexWrap : "wrap" ,justifyContent : "center" , width : {xs : "100%" , md : "58%" }}}>
    
    {valueFilter("All").map((Product)=>
            
            (
            <Box
            key={Product.id}
            className="Card"
            sx={{
                width : {xs:"180px" , md: "210px"} ,
                height: "290px",
                backgroundColor: "#F3F2EE",
                borderRadius: "15px",
                padding: "10px",
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
                m : "10px"
            }}
    
            >
            {Product.discount &&
            <Chip
            label={Math.floor( 100 -  (Product.sale / Product.price) * 100) +"%"}
            sx={{
                height: "20px",
                borderRadius: "5px",
                backgroundColor: "#AC8C5B",
                color: "#FFF",
                position: "absolute",
            }}
            />
    
            }
        {favProductsId.includes(Product.id) ?
        (
        <IconButton
            onClick={() => {
            dispatch(deleteFromFav(Product))
            }}
            sx={{ color: "gray", position: "absolute", right: "5px" }}
        >
            <FavoriteIcon />
        </IconButton>   
        ) : (
        <IconButton
                onClick={() => {
            dispatch(AddToFav(Product))
                    }}
                    sx={{ color: "gray", position: "absolute", right: "5px" }}
                    >
                    <FavoriteBorderIcon />
                    </IconButton>   
        )
        
        
        
        }
        
            <Box sx={{ width: "75%", height: "65%", mx: "auto" }}  
                onClick={() => {
                Navigate(`/prodetails/${Product.id}`)
                }}
    
            >
                <img
                style={{ width: "100%", height: "100%" }}
                src={Product.imageLink}
                alt=""
                />
            </Box>
            <Box
                className="cardcontent"
                sx={{
                p: "5px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                bgcolor: "#FFF",
                mx: "auto",
                width: "95%",
                height: "32%",
                borderRadius: "15px",
                }}
            >
                <Typography variant="h6">{Product.Name}</Typography>
                <Stack spacing={1}>
                <Rating
                    name="half-rating-read"
                    defaultValue={Product.rate}
                    precision={0.5}
                    readOnly
                />
                </Stack>
                <Box sx={{ mt: "5px", display: "flex" }}>
                <del style={{ marginRight: "7px" }}> ${Product.price}</del>
                <Typography>${Product.sale}</Typography>
                </Box>
    
    
    
                {SelectedProductsId.includes(Product.id) ?
    
            (<Box className="btn-tocart" display="none">
            <Box  sx={{ height : "27%", display : "flex"  , alignItems : "center" , justifyContent : "center"}}>
            <Box sx={{display : "flex" , alignItems : "center" , width : "75%" , justifyContent : "center"}}>
                <IconButton 
                
                onClick={() => {
                    dispatch(decrement(Product))
                }}
                sx={{bgcolor : "#FFF", 
                ":hover" : {
                    bgcolor : "#ac8c5b"
                    }
                
                }} size="small" >
                    <RemoveIcon sx={{color : "#ac8c5b" , ":hover" : {
                    color : "#FFF"
                    }}} />
                </IconButton>
                <Typography sx={{mx:"5px" , fontWeight : "bold"}}>{ProductQuantity(Product)}</Typography>
                <IconButton
                onClick={() => {
                    dispatch(increment(Product))
                }}
                
                sx={{bgcolor : "#FFF" , ":hover" : {
                    bgcolor : "#ac8c5b"
                    }}} size="small">
                    <AddIcon sx={{color : "#ac8c5b" , ":hover" : {
                    color : "#FFF"
                    }}} />
                </IconButton>
            </Box>
    
            </Box>
            </Box>
    
            ) : 
    
    
            (
            <Button
            className="btn-tocart"
            sx={{ bgcolor: "#AC8C5B", display: "none" ,
            ":hover": {
            color: "#ac8c5b",
            outline: "1px solid #ac8c5b",
            bgcolor : "transparent"
            },
            }}
            variant="contained"
    
            onClick={() => {
            dispatch(AddToCart(Product))
    
            }}
    
            >
            add to cart
            </Button>
            )
                
                }
    
    
    
    
    
            </Box>
            </Box>
                ))}
    
    
    </Box>
    
    
    <Box sx={{width : "17%" , display : {xs : "none" , md : "block"}}} >
    
    <Box sx={{border:"1px solid black",width : "100%" , p:"0 10px" ,
            height: "50px",
            borderRadius: "15px",
            my : "10px",

            }}>
            <Box sx={{ position: "relative" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <input placeholder="Search" style={{padding: "10px",
            margin : "10px" , border:"none"}} />
                    <SearchIcon
                    sx={{ color: "black", position: "absolute", right: "5px" }}
                    />
                </Box>
                </Box>
            </Box>


            <Box sx={{border:"1px solid black",width : "100%" , p:"0 10px" ,
            borderRadius: "15px",
            paddingY:"10px",
            }}>
                <Box sx={{display:"flex", justifyContent:"space-between",my:"10px", mx:"25px"}}>
                    <Typography variant="h6">Category</Typography>
                    <ExpandMoreIcon/>
                </Box>
                <Box sx={{width: "80%",margin:"10px auto", height:"1px",bgcolor:"black"}} />
                <FormGroup sx={{my:"10px"}}>


                <Box sx={{display:"flex",alignItems:"center", 
                    justifyContent:"space-between", mx:"25px", color:"gray"}}>
                        <FormControlLabel control={<Checkbox size="small" />} label="All" onClick={()=> {
                                                                                            (!checked.includes("All"))?
                                                                                            checked.push("All"): checked = checked.filter((x) => x !== "All");
                                                                                            console.log(checked);}} />
                        <Typography onClick={()=>console.log(checked)}>({data.length})</Typography>
                    </Box>





                    {categories.map((cate)=> <Box key={cate} sx={{display:"flex",alignItems:"center", 
                                                                        justifyContent:"space-between", mx:"25px",
                                                                        color:"gray"}}>
                        <FormControlLabel control={<Checkbox size="small" />} label={cate} onClick={()=>{
                                                                                            (!checked.includes(cate))?
                                                                                            checked.push(cate): checked = checked.filter((x) => x !== cate);
                                                                                            console.log(checked);}} />
                        <Typography >({data.filter((pro) => pro.category === cate ).length})</Typography>
                    </Box>
                     )}
                </FormGroup>
            </Box>       
        
    <Box sx={{width : "100%" , mt :"15px" ,border : "1px solid black" , borderRadius : "15px" , p:"10px"}}>
    <Typography mb="10px" variant='h6'>Tags Cloud</Typography>
    <hr/>
    
    {/* {Tags.map((tag) => (
        <Button  sx={{bgcolor : "#F3F2EE" , color : "black" , m : "5px" , borderRadius : "10px" , fontSize : "12px"}} >{tag.Tag}</Button>
    ))}
     */}
    
    
    </Box>
    
    
    
    </Box>
</>

}

</Box>
        </>
    );
}

export default Shop;
