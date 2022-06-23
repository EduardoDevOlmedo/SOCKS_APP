import { Delete, Edit } from '@mui/icons-material';
import { Grid, Card, CardActionArea, CardMedia, CardContent, Typography, Tooltip, IconButton, ClickAwayListener } from '@mui/material'
import React, { useContext, useState } from 'react'
import NextLink from "next/link"
import { IProduct } from '../../interfaces';
import { AuthContext } from '../../context/auth';

interface Props {
    product: IProduct
}



const ProductCard: React.FC<Props> = ({product}) => {
  

    const {title, image, description, _id} = product



    return (
      <Grid  container xs={12} md={3} item>
      <div style={{position: 'relative', width: '100%', height: 'auto', marginTop: '10px'}}>
      <NextLink href={`/product/${_id}`}>
      <Card sx={{ width: '100%', height: '100%', display: {xs: 'flex', md: 'block'}}}>
         <Grid item xs={6} md={12}>
          <CardActionArea>
          <CardMedia 
            sx={{height: {xs: '190px', md: '350px'},}}
            component='img'
            src={image}
            ></CardMedia>
          </CardActionArea>
      </Grid>
        <Grid item xs={6} md={12} display="flex" alignItems="center">
               <CardContent sx={{textAlign: 'justify'}}>
                <CardActionArea>
                 <Typography sx={{fontWeight: 'bold', letterSpacing: '0'}} gutterBottom component="div">
                   {title}
                 </Typography>
                 <Typography sx={{color: '#000', letterSpacing: '0', fontFamily: 'Nunito', textAlign: 'initial '}} variant="body2" color="text.secondary">
                   {description.length > 70 ? description.substring(0,50) + '...' : description}
                 </Typography>
                </CardActionArea>
               </CardContent>
             </Grid>
         </Card>
      </NextLink>
      </div>
  </Grid>
  )
}

export default ProductCard