import { Search } from '@mui/icons-material'
import { Box, IconButton, Input } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

const SearchBar = () => {
  
 
  const [searchTerm, setSearchTerm] = useState('')

  const router = useRouter()

  const onSearchTerm = () => {
    if(searchTerm.trim().length === 0) return;
    router.push(`/search/${searchTerm}`)
  }
  
  return (
    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center',
    marginTop: '20px'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px', 
      border: '4px solid #FF9F10',width: '1200px', 
      borderRadius: '45px', padding: '10px',
      maxWidth: '90%' }}>
        <IconButton type="submit" 
        sx={{padding: 0}}
        onClick={onSearchTerm}
        >
        <Search
        sx={{ color: 'white', mr: 1, fontWeight: 'bold' }} />
        </IconButton>
        <Input
        onKeyPress={(e) => e.key === 'Enter' ? onSearchTerm() : null}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='noBottomBorder'
        sx={{width: '100%'}}
        id="search" placeholder="¿Qué estás buscando?" />
      </Box>
    </Box>
  )
}

export default SearchBar