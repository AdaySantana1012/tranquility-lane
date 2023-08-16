import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import SignUpForm from '../../../components/SignUpForm/SignUpForm';

jest.mock('../../../firebase/firebase', () => ({
  useAuth: () => ({
    login: jest.fn(),
  }),
}));

describe('SignUpForm', () => {
  test('renders with correct elements', () => {
    const setIsLoginOpen = jest.fn();

    const { getByLabelText, getByText } = render(
      <Router>
        <SignUpForm setIsLoginOpen={setIsLoginOpen} />
      </Router>
    );

    // Check for form elements
    expect(getByLabelText('Correo Electrónico')).toBeInTheDocument();
    expect(getByLabelText('Contraseña')).toBeInTheDocument();
    expect(getByText('Iniciar Sesión')).toBeInTheDocument();

    // Check for logo
    expect(getByText('Imagen logo')).toBeInTheDocument();

    // Check for header elements
    fireEvent.click(getByText('×'));
    expect(setIsLoginOpen).toHaveBeenCalled();

    // Check for overlay elements
    fireEvent.click(getByText('×'));
    expect(setIsLoginOpen).toHaveBeenCalledTimes(2);
  });

  test('handles form submission', () => {
    const setIsLoginOpen = jest.fn();

    const { getByLabelText, getByText } = render(
      <Router>
        <SignUpForm setIsLoginOpen={setIsLoginOpen} />
      </Router>
    );

    // Set form values
    fireEvent.change(getByLabelText('Correo Electrónico'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(getByLabelText('Contraseña'), {
      target: { value: 'password123' },
    });

    // Submit form
    fireEvent.click(getByText('Iniciar Sesión'));

    // Make assertions
    expect(useAuth().login).toHaveBeenCalledWith(
      'test@example.com',
      'password123'
    );
    expect(setIsLoginOpen).toHaveBeenCalledWith(false);
  });

  test('displays error message on form submission failure', () => {
    const setIsLoginOpen = jest.fn();

    const { getByLabelText, getByText } = render(
      <Router>
        <SignUpForm setIsLoginOpen={setIsLoginOpen} />
      </Router>
    );

    // Set form values
    fireEvent.change(getByLabelText('Correo Electrónico'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(getByLabelText('Contraseña'), {
      target: { value: 'password123' },
    });

    // Submit form (with error)
    useAuth().login.mockRejectedValue(new Error('Invalid credentials'));
    fireEvent.click(getByText('Iniciar Sesión'));

    // Make assertions
    expect(useAuth().login).toHaveBeenCalledWith(
      'test@example.com',
      'password123'
    );
    expect(setIsLoginOpen).toHaveBeenCalledTimes(0);
    expect(getByText('Contraseña o email incorrecto, inténtelo de nuevo')).toBeInTheDocument();
  });
});