import { Button } from '@mui/material'
import React, { useContext } from 'react'
import { AuthContext } from '../../context/auth'

const CloseSession = () => {
  
  const {role, isLoggedIn, logout} = useContext(AuthContext)

  
    return (
      <>
        {
          (role === 'admin' && isLoggedIn) && 
          (
            <footer>
            <Button 
            sx={{fontFamily: 'Nunito', width: '220px'}}
            variant="contained" 
            onClick={logout}
            color="warning">Cerrar Sesión</Button>
            </footer> 
          )
        }
      </>
  )
}

export default CloseSession