import { Grid, Typography, Divider, Link } from '@mui/material'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const NavMobile = () => {
    const path = useRouter().asPath


    return (
    <Grid container justifyContent={'space-around'}>
    <Grid item>
      <NextLink passHref href={"/categories/calcetines"}>
      <Link underline="none">
        <Typography className="linkTo"  sx={{ 
          fontFamily: 'Nunito',
          color: path === '/categories/calcetines' ? '#FF9F10' : '#ffffff',
          fontSize: '20px',
         textTransform: 'uppercase'}}>
          Calcetines</Typography>
      </Link>
      </NextLink>
    </Grid>
    <Divider sx={{background: '#004040'}} orientation="vertical" flexItem/>
    <Grid item>
    <NextLink passHref href={"/categories/punteras"}>
      <Link underline="none">
        <Typography className="linkTo" sx={{
            fontFamily: 'Nunito',
            color: path === '/categories/punteras' ? '#FF9F10' : '#ffffff',
            fontSize: '20px',
           textTransform: 'uppercase'
        }}>Punteras</Typography>
      </Link>
      </NextLink>
    </Grid>
</Grid>
  )
}

export default NavMobile