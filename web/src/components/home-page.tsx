import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export const HomePage = () => {
  return (
    <div>

        <Link to='/'>Home</Link>
        <Link to='reg-form'>Register</Link>

        <Outlet />

    </div>
  )
}
