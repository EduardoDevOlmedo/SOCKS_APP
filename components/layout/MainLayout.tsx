import { Add } from '@mui/icons-material';
import { IconButton,  useMediaQuery } from '@mui/material';
import Head from 'next/head'
import React, { useContext } from 'react'
import { AuthContext } from '../../context/auth';
import CloseSession from '../ui/CloseSession';
import Navbar from '../ui/Navbar';
import NavMobile from '../ui/NavMobile';

interface Props {
    children: JSX.Element | JSX.Element[]
    title: string;
    pageDescription: string;
}

const MainLayout: React.FC<Props> = ({children, title, pageDescription}) => {
  
  
  const matches = useMediaQuery('(max-width:800px)');
  const {role} = useContext(AuthContext)

  return (
    <>
    <Head>
            <title title={title}></title>
            <meta name="description" content={pageDescription}/>
            <meta name='og:title' content={title}/>
            <meta name='og:description' content={pageDescription}/>
    </Head>
    <Navbar />
    
        <main style={{
          margin: "80px auto",
            maxWidth: '1440px',
            padding: '0px 30px',
        }}>
    {
      matches &&
      (
       <NavMobile />
      ) 
    }
        {
            children
        }
         {
          (matches && role === 'admin') &&
          (
           <div>
             <IconButton
              href="/actions/add"
              sx={{
                background: '#FF9F10',
                padding: '25px',
                color: '#fff',
                position: 'fixed',
                left: '83%',
                bottom: '10%'
              }}
             >
                <Add 
                  sx={{
                    position: 'fixed'
                  }}
                />
             </IconButton>
           </div>
          )
        }
        <CloseSession />
        </main>
    </>
  )
}

export default MainLayout