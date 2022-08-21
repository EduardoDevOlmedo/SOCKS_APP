import { GetServerSideProps, GetStaticProps, NextPage } from "next"
import { ProductFunctions } from "../database"
import React, { useContext, useEffect, useState } from 'react'
import MainLayout from "../components/layout/MainLayout"
import {  Box, Grid,  Chip, Typography} from "@mui/material"
import { IProduct, ProductsResponse } from "../interfaces"
import ProductCard from "../components/ui/Card"
import useSWR from "swr"
import CircularProgress from '@mui/material/CircularProgress';
import Cookies from "js-cookie"
import { ProductContext } from "../context/product"


const Home: NextPage = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const {loadMoreProducts, productsAmount} = useContext(ProductContext)

  const role = Cookies.get("role")

  const { data, error } = useSWR<ProductsResponse>(`/api/products?quantity=${productsAmount}`, fetcher)

  if(error){
    return (
      <MainLayout title="Skeletons Socks SV - Home" pageDescription="Skeletons Socks SV Oficial Page">
        <Box display="flex" sx={{justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
          <Typography>Ocurrió un error.</Typography>
        </Box>
    </MainLayout>
    )
  }

  if(!data) {
    return (
    <MainLayout title="Skeletons Socks SV - Home" pageDescription="Skeletons Socks SV Oficial Page">
        <Box display="flex" sx={{justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
          <CircularProgress sx={{color: '#000'}} />
        </Box>
    </MainLayout>
    )
  }

  return (
    <MainLayout title="Skeletons Socks SV - Home" pageDescription="Skeletons Socks SV Oficial Page">
      <Grid container spacing={2} sx={{mt: 2.5, width:'100%', textAlign: 'center', justifyContent: 'center'}}>
       {
          data!.products.map(product => (
            <ProductCard key={product._id} product={product}
            />
          ))
        }
      </Grid>
        <Box display="flex" sx={{justifyContent: 'center', alignItems: 'center', mt: 4}}>
         {
          data.quantity !== data.products.length ?
          (<Chip 
            className="onHover"
            onClick={() =>  loadMoreProducts(role === 'admin' ? 100 : 8)}
            sx={{color: '#fff'}}
            clickable
            label="Ver más" variant="outlined"/>) : undefined
          } 
      </Box>
    </MainLayout>
  )
}

export default Home

