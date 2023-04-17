import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from '../Auth0/logout-button';
import LoginButton from '../Auth0/login-button';

const Navbar = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <nav>
      <h1>Polished Profiles</h1>
      <div>
        <a href="/">Home</a>
        <a href="/about">About</a>
        {isAuthenticated ? (
        <>
        <a href="/app">App</a>
        <a href="/history">History</a>
        < LogoutButton /> 
        </>
      )
        : <LoginButton />}
        {/* <a href="/login" >Login</a> */}
        

      </div>
    </nav>
  );
};

export default Navbar;
