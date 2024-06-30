import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthoForm } from './autho-form';

export const HomePage = () => {
  return (
    <div>

        <Link to='/'>Home</Link>
        <Link to='reg-form'>Register</Link>

        <Outlet />

    </div>
  )
}
