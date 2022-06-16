import { Grid } from '@mui/material'
import React, { useContext } from 'react'
import MainLayout from '../../components/layout/MainLayout'
import ProductCard from '../../components/ui/Card'
import { ProductContext } from '../../context/product'

const PunteraPage = () => {
  const {products} = useContext(ProductContext)

  const punteras = products.filter(product => product.type === 'puntera')


  return (
    <MainLayout title="Puntera" pageDescription='Ver punteras'>
      <Grid container spacing={2} sx={{mt: 5, width:'100%', textAlign: 'center'}}>  
        {
          punteras.map(puntera => (
            <ProductCard product={puntera}/>
          ))
        }
      </Grid>
    </MainLayout>
  )
}

export default PunteraPage