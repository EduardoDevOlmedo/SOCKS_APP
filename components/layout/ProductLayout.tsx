import { useMediaQuery } from '@mui/material';
import Head from 'next/head'
import React from 'react'
import CloseSession from '../ui/CloseSession';
import Navbar from '../ui/Navbar';
import ProductNavbar from '../ui/products/ProductNavbar';

interface Props {
    children: JSX.Element | JSX.Element[]
    title: string;
    pageDescription: string;
}

const ProductLayout: React.FC<Props> = ({children, title, pageDescription}) => {
  
  
  const matches = useMediaQuery('(min-width:800px)');
  
  
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
            maxWidth: '1440px'
        }}>
    {
      !matches && 
      (
       <ProductNavbar />
      )
    }
        {
            children
        }
        </main>
        <CloseSession />
    </>
  )
}

export default ProductLayout