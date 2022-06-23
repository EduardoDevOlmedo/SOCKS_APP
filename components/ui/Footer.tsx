import { Facebook, Instagram, WhatsApp } from '@mui/icons-material'
import { IconButton, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { AuthContext } from '../../context/auth'

const Footer = () => {
  
  const buttonStyles = {
    width: {sm: '35px', md: '50px'},
    height: {sm: '35px', md: '50px'},
    color: '#FF9F10'
  }

  const {role, isLoggedIn, logout} = useContext(AuthContext)


  return (
    <>
      <div className="footerCont">
      <Typography
      sx={{
        fontFamily: 'Nunito',
        fontSize: '22px',
        marginBottom: '10px'
      }}
      >Contacto</Typography>
       <div>
       <IconButton
          href='https://www.instagram.com/skeletonsocks.sv/?hl=es-la'
          target="_blank" 
        >
            <Instagram 
            sx={buttonStyles}
            />
        </IconButton>
        <IconButton
          href="https://wa.me/50376232064"
          target="_blank" 
        >
            <WhatsApp 
          sx={buttonStyles}
            />
        </IconButton>
        <IconButton
          href='https://www.facebook.com/Skeletons-socks-SV-100477068590540'
          target="_blank" 
        >
            <Facebook 
            sx={buttonStyles}
            />
        </IconButton>
       </div>
    </div>
    </>
  )
}

export default Footer