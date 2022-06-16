import { Typography, Link } from '@mui/material';
import NextLink from 'next/link';
import React from 'react'
import { useRouter } from 'next/router'

interface Props {
    title: string;
    route: string;
}

const NavLink: React.FC<Props> = ({title, route}) => {
  
    const path = useRouter().asPath
  
    return (
    <NextLink passHref href={route}> 
    <Link underline="none" sx={{height: '65px', 
            background: path ===  route ? '#1E1E1E' : '#FF9F10',
            color: path === route ? '#FF9F10' : '#1E1E1E',
            display: 'flex', alignItems: 'center',
            padding: '10px'
   }}>
        <Typography className="linkTo" sx={{ 
         fontFamily: 'Nunito',
         fontSize: '20px',
         padding: '0 15px',
        textTransform: 'uppercase'}}>
           {title}</Typography>
        </Link>
    </NextLink>
  )
}

export default NavLink