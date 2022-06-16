import { Grid } from '@mui/material'
import React, { useContext } from 'react'
import MainLayout from '../../components/layout/MainLayout'
import ProductCard from '../../components/ui/Card'
import { ProductContext } from '../../context/product'

const CalcetinPage = () => {
  
  const {products} = useContext(ProductContext)

  const calcetines = products.filter(product => product.type === 'calcetin')


  return (
    <MainLayout title="Calcetines" pageDescription='Ver calcetines'>
      <Grid container spacing={2} sx={{mt: 5, width:'100%', textAlign: 'center'}}>  
        {
          calcetines.map(calcetin => (
            <ProductCard product={calcetin}/>
          ))
        }
        
      </Grid>
    </MainLayout>
  )
}

export default CalcetinPage