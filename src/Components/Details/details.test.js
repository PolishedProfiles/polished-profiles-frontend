import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Details from './index';

describe('Details', () => {
  test('renders all headings', () => {
    render(<Details />);
    const heading1 = screen.getByText('Precision-Matched Resumes');
    const heading2 = screen.getByText('Instantly Impressive');
    const heading3 = screen.getByText('Effortless Adaptability');
    expect(heading1).toBeInTheDocument();
    expect(heading2).toBeInTheDocument();
    expect(heading3).toBeInTheDocument();
  });

  test('renders all paragraphs', () => {
    render(<Details />);
    const paragraph1 = screen.getByText('Ensure your resume is a perfect fit for every oppurtunity');
    const paragraph2 = screen.getByText('Create flawless, recruiter-approved resumes in minutes');
    const paragraph3 = screen.getByText('The perfect resume is just a few clicks away. Get yours now!');
    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
    expect(paragraph3).toBeInTheDocument();
  });
});
