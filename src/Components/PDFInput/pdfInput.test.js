import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PDFInput from './index';

describe('PDFInput', () => {
  test('renders upload button', () => {
    render(<PDFInput />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent('Choose File');
  });

  test('renders file uploaded message when file is provided', () => {
    render(<PDFInput pdfFile={true} />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent('File Uploaded!');
  });
});