import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';


test('renders Navbar', () => {
  render(<App />);
  const navbar = screen.getByRole('navigation');
  expect(navbar).toBeInTheDocument();
});

test('renders LandingPage by default', () => {
  render(<App />);
  const heading = screen.getByRole('heading', { name: 'AI Resume Tailoring' });
  expect(heading).toBeInTheDocument();
});

test('renders AboutPage when About link is clicked', () => {
  render(<App />);
  const aboutLink = screen.getByText('About');
  fireEvent.click(aboutLink);
  const heading = screen.getByText('About');
  expect(heading).toBeInTheDocument();
});
