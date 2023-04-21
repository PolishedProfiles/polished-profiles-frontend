import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './login-button';

jest.mock('@auth0/auth0-react');

describe('LoginButton', () => {
  test('renders login button when not authenticated', () => {
    useAuth0.mockReturnValue({ isAuthenticated: false, loginWithRedirect: jest.fn() });
    render(<LoginButton />);
    const button = screen.getByRole('button', { name: /log in/i });
    expect(button).toBeInTheDocument();
  });

  test('does not render login button when authenticated', () => {
    useAuth0.mockReturnValue({ isAuthenticated: true, loginWithRedirect: jest.fn() });
    render(<LoginButton />);
    const button = screen.queryByRole('button', { name: /log in/i });
    expect(button).not.toBeInTheDocument();
  });

  test('calls loginWithRedirect when login button is clicked', () => {
    const loginWithRedirect = jest.fn();
    useAuth0.mockReturnValue({ isAuthenticated: false, loginWithRedirect });
    render(<LoginButton />);
    const button = screen.getByRole('button', { name: /log in/i });
    fireEvent.click(button);
    expect(loginWithRedirect).toHaveBeenCalledTimes(1);
  });
});

