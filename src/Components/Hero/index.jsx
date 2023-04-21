import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from '../Auth0/login-button';
import { Link } from 'react-router-dom';


const Hero = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <section className="hero">
      <h2>AI Resume Tailoring</h2>
      <p>A Perfectly Crafted Resume for Every Opportunity</p>
      {
        isAuthenticated
        ? <button><Link style={{color: 'white', textDecoration: 'none'}} to="/app">Get Started</Link></button>
        : <LoginButton className="login-button">Get Started</LoginButton>
      }
      
    </section>
  );
};

export default Hero;
