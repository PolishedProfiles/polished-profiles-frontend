import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TextInput from './index';

describe('TextInput', () => {
  it('should render the text input field', () => {
    render(<TextInput />);
    expect(screen.getByLabelText('Resume Info')).toBeInTheDocument();
  });

  it('should call the handleChange function when the value of the input field changes', () => {
    const handleChange = jest.fn();
    render(<TextInput handleChange={handleChange} />);
    const inputField = screen.getByLabelText('Resume Info');
    fireEvent.change(inputField, { target: { value: 'Test value' } });
    expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({
      target: expect.objectContaining({ value: 'Test value' }),
    }));
  })
});
