import React from 'react';
import { Stack, Box } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import '../styles/home-page.scss';

export const HomePage = () => {
  return (
    <div>
      <Box className='navbar'>
        <Stack className='links-container' direction='row' justifyContent='space-around' alignItems='center'>
          <Link to='/'>Home</Link>
          <Link to='reg-form'>Register</Link>
        </Stack>
      </Box>

      <Outlet />

    </div>
  )
}
