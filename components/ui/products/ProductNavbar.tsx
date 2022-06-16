import React, { useContext } from 'react'
import { AppBar, Divider, Grid, Icon, IconButton, Link, Toolbar, Typography } from '@mui/material'
import NextLink from 'next/link'
import useMediaQuery from '@mui/material/useMediaQuery';
import { constants } from '../../../utils';
import NavLink from '../NavLink';
import { ArrowBack } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { AuthContext } from '../../../context/auth';

const user = {
    role: 'admin'
}

const ProductNavbar = () => {
  
    const router = useRouter()


    const {role} = useContext(AuthContext)


    if(role !== 'admin'){
        constants.NavValues[0] = {
            title: '',
            route: ''
        }
    }

    const colors = [
        {
            navBar: '#FF9F10'    
        }
    ]

   const matches = useMediaQuery('(min-width:800px)');


    return (
    <>
    <AppBar position="fixed" sx={{background: colors[0].navBar}}>
        <Toolbar sx={{display: 'flex', justifyContent: matches ? 'space-between' : 'center', paddingRight: matches ? '75px !important'  : '0px'}}>
        <div>
        <IconButton onClick={() => router.back()} className="arrow" >
            <ArrowBack sx={{height: '30px', width: '30px'}} />
        </IconButton>
        </div>
            <NextLink passHref href="/">
                <Link underline="none">
                <Typography component="h1" className="title">
                    Skeletons Socks
                </Typography>
                </Link>
            </NextLink>
        <div style={{display: 'flex'}}>
               {
                   matches && 
                   constants.NavValues.map(element => {
                    
                    return (
                        <NavLink key={element.title} {...element}/>
                    )
                   })
                }
            </div>
        </Toolbar>
    </AppBar>
    
    </>
  )
}

export default ProductNavbar