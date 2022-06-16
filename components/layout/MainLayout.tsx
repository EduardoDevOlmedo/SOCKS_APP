import { Divider, Grid, Link, Typography, useMediaQuery } from '@mui/material';
import Head from 'next/head'
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import Navbar from '../ui/Navbar';
import NavMobile from '../ui/NavMobile';

interface Props {
    children: JSX.Element | JSX.Element[]
    title: string;
    pageDescription: string;
}

const MainLayout: React.FC<Props> = ({children, title, pageDescription}) => {
  
  
  const matches = useMediaQuery('(max-width:800px)');
  
  
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
        </main>
        <footer>Footer</footer>
    </>
  )
}

export default MainLayout