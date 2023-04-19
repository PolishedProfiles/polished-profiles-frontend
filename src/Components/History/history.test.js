import { render, screen, fireEvent,waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import History from '.';

describe('History', () => {
  test('renders History component', () => {
    render(<History />);
    const headerElement = screen.getByText(/Job Application no\.1/i);
    expect(headerElement).toBeInTheDocument();
  });
  
test('renders the stored resumes', () => {
    render(<History />);
    const headerElement = screen.getByText(/Job Application no\.1/i);
    expect(headerElement).toBeInTheDocument();
  });
});