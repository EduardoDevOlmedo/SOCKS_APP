import React, { useContext, useEffect } from 'react'
import { AppBar, Divider, Grid, Toolbar, Typography } from '@mui/material'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import useMediaQuery from '@mui/material/useMediaQuery';
import { constants } from '../../utils';
import { AuthContext } from '../../context/auth';

import { Link } from '@mui/material';
import NavLink from './NavLink';

const Navbar = () => {
  
    const {role} = useContext(AuthContext)
    

    const path = useRouter().asPath

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
            <NextLink passHref href="/">
                <Link underline="none">
                <Typography 
                className="title"
                component="h1">
                    Skeletons Socks
                </Typography>
                </Link>
            </NextLink>
            {
                matches && (
                    <>
                         <div style={{display: 'flex'}}>
               {
                  role === "admin" &&
                   (
                    <>
                    <NextLink passHref href={'/actions/add'}> 
                    <Link underline="none" sx={{height: '65px', 
                            background: path ===  '/add' ? '#1E1E1E' : '#FF9F10',
                            color: path === "/add" ? '#FF9F10' : '#1E1E1E',
                            display: 'flex', alignItems: 'center',
                            padding: '10px'
                        }}>
                        <Typography className="linkTo" sx={{ 
                            fontFamily: 'Nunito',
                            fontSize: '20px',
                            padding: '0 15px',
                        textTransform: 'uppercase'}}>
                           SUBIR</Typography>
                        </Link>
                    </NextLink>
                    </>  
                  )
                }
                    <NextLink passHref href={'/categories/calcetines'}> 
                    <Link underline="none" sx={{height: '65px', 
                            background: path ===  '/categories/calcetines' ? '#1E1E1E' : '#FF9F10',
                            color: path === "/categories/calcetines" ? '#FF9F10' : '#1E1E1E',
                            display: 'flex', alignItems: 'center',
                            padding: '10px'
                        }}>
                        <Typography className="linkTo" sx={{ 
                            fontFamily: 'Nunito',
                            fontSize: '20px',
                            padding: '0 15px',
                        textTransform: 'uppercase'}}>
                          Calcetas</Typography>
                        </Link>
                    </NextLink> 
                 <NextLink passHref href={'/categories/punteras'}> 
                    <Link underline="none" sx={{height: '65px', 
                            background: path ===  '/categories/punteras' ? '#1E1E1E' : '#FF9F10',
                            color: path === "/categories/punteras" ? '#FF9F10' : '#1E1E1E',
                            display: 'flex', alignItems: 'center',
                            padding: '10px'
                        }}>
                        <Typography className="linkTo" sx={{ 
                            fontFamily: 'Nunito',
                            fontSize: '20px',
                            padding: '0 15px',
                        textTransform: 'uppercase'}}>
                           PUNTERAS</Typography>
                        </Link>
                    </NextLink>
            </div>
                    </>
                )
            }
        </Toolbar>
    </AppBar>
    
    </>
  )
}

export default Navbar