import { Box, Typography } from '@mui/material'
import React from 'react'

export default function brands() {
    const brands = [
       {id: 1 , path : "../../../../Imgs/brands/Ashley.png"},
       {id: 2 , path : "../../../../Imgs/brands/tjx.png"},
       {id: 3 , path : "../../../../Imgs/brands/LZB.png"},
       {id: 4 , path : "../../../../Imgs/brands/roche.png"},
       {id: 5 , path : "../../../../Imgs/brands/SCS.png"},
       {id: 6 , path : "../../../../Imgs/brands/Kartell.png"},
       {id: 7 , path : "../../../../Imgs/brands/Restoration.png"},
       {id: 8 , path : "../../../../Imgs/brands/Williams-Sonoma.png"},
    ];

  return (<>
       
    <Box
    sx={{
        minWidth: "75%"  ,
        maxWidth:"75%",
        mx:"auto",
    bgcolor: "#FFF",
    my:"50px"}}>
        <Typography sx={{fontWeight: '900',m : '40px 0', fontSize : {xs : "20px" , md : "40px"}}} 
            variant='h4'>Brands</Typography>
        <Box sx={{width : '100%', m: "40px 0",display : "flex", justifyContent:"space-evenly", alignItems:"center", flexWrap:{sx:"wrap",md:"nowrap"}}}>
        {brands.map((brand)=>
            <Box key={brand.id} sx={{width:"10%"}}> <img src={brand.path} style={{width:"80%"}}/> </Box>
        )}
        </Box>
    </Box>
    </>
  )
}
