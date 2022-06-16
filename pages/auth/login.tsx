import { Button, Grid, Input, Typography } from '@mui/material';
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../context/auth'

type formData = {
  user: string;
  password: string;
}

const LoginPage = () => {
  
  const {LoginUser} = useContext(AuthContext)

  const {register, handleSubmit, formState: { errors }} = useForm<formData>()
 
  
  const handleLogin = (user: string, password: string) => {
   try {
    LoginUser(user, password)
   } catch (error) {
    alert(error)
   }
  }
  
  const onSubmit = (data: formData) => {
      handleLogin(data.user, data.password)
  }

    return (
    <>
       <Grid container sx={{display: 'grid', height: '100vh', placeContent: 'center'}}>
       <Typography component="h1" className="logTitle">
                    Skeletons Socks
      </Typography>
      <form 
      onSubmit={handleSubmit(onSubmit)}
      style={{display: 'contents'}}>
      <Input 
      {
        ...register("user", {
          required: 'El usuario es requerido'
        })
      }
      error={!!errors.user}
      placeholder='Usuario'
      sx={{width: '300px', 
      margin: '30px auto',
      color: '#fff',
      borderBottom: '3px solid #707070',
      fontFamily: 'Nunito'
    }}
      />
       <Input
       type="password"
       {
        ...register("password", {
          required: 'La contraseña es requerida'
        })
      }
      error={!!errors.password}
      placeholder='Contraseña'
      sx={{width: '300px', 
      margin: '0 auto',
      color: '#fff',
      fontFamily: 'Nunito',
      borderBottom: '3px solid #707070'
    }}
    />
      <Button variant="contained" type='submit' sx={{
        background: '#FF9F10',
        margin: '40px auto',
        width: 'fit-content',
        fontFamily: 'Nunito',
        color: '#080808',
        borderRadius: '20px'
      }}>INGRESAR</Button>
      </form>
       </Grid> 
    </>
  )
}

export default LoginPage