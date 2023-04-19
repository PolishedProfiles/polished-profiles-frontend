import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import Hero from './index';

describe('Hero', () => {
  it('renders the hero component', () => {
    render(<Hero />);
    expect(screen.getByText('AI Resume Tailoring')).toBeInTheDocument();
  });
});

it('checks if the login button is rendered', () => {
  render(<Hero />);
  expect(screen.getByText('Log in')).toBeInTheDocument();
});









