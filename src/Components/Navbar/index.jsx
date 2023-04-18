import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from '../Auth0/logout-button';
import LoginButton from '../Auth0/login-button';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { isAuthenticated } = useAuth0();
  console.log('isAuthenticated', isAuthenticated);

  return (
    <nav>
      <h1>Polished Profiles</h1>
      <div>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        {isAuthenticated ? (
          <>
            <Link to="/app">App</Link>
            <Link to="/history">History</Link>
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
