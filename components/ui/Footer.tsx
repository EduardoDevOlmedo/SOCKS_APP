import { Facebook, Instagram, WhatsApp } from '@mui/icons-material'
import { Button, IconButton, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { AuthContext } from '../../context/auth'

const Footer = () => {
  
  const buttonStyles = {
    width: {sm: '30px', md: '50px'},
    height: {sm: '30px', md: '50px'}
  }

  const {role, isLoggedIn, logout} = useContext(AuthContext)


  return (
    <footer>
      {
        role !== "admin" && !isLoggedIn && (
     <div>
      <Typography
      sx={{
        fontFamily: 'Nunito'
      }}
      >Skeletons Socks SV</Typography>
      </div>
        )
      }
      <div>
        {
          (role === 'admin' && isLoggedIn) && 
          (
            <Button variant="contained" 
            onClick={logout}
            color="warning">Salir</Button>
          )
        }
      </div>
       <div>
       <IconButton
        >
            <Instagram 
            sx={buttonStyles}
            />
        </IconButton>
        <IconButton
        >
            <WhatsApp 
          sx={buttonStyles}
            />
        </IconButton>
        <IconButton 
        >
            <Facebook 
            sx={buttonStyles}
            />
        </IconButton>
       </div>
    </footer>
  )
}

export default Footer