import { GetStaticProps, NextPage } from "next"
import { ProductFunctions } from "../database"

import React, { useContext, useEffect } from 'react'
import MainLayout from "../components/layout/MainLayout"
import {  Grid, IconButton, useMediaQuery} from "@mui/material"
import { IProduct } from "../interfaces"
import ProductCard from "../components/ui/Card"
import { Add } from "@mui/icons-material"
import { AuthContext } from "../context/auth"

interface Props {
  data: IProduct[]
}

const Home: NextPage<Props> = ({data}) => {

  const matches = useMediaQuery('(max-width: 800px)')

  const {role} = useContext(AuthContext)

  return (
    <MainLayout title="Skeletons Socks kSV - Home" pageDescription="Skeletons Socks SV Oficial Page">
      <Grid container spacing={2} sx={{mt: 5, width:'100%', textAlign: 'center'}}>
        {
          data.map(product => (
            <ProductCard key={product._id} product={product}
            />
          ))
        }
      </Grid>
    </MainLayout>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async (ctx) => {
    const data = await ProductFunctions.getProducts() // your fetch function here 
    
    return {
      props: {
        data
      }, revalidate: 5
    }
}