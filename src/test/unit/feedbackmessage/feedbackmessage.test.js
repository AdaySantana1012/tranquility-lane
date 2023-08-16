import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FeedbackMessage from '../../../components/FeedbackMessage/FeedbackMessage';

describe('FeedbackMessage', () => {
  test('renders error message correctly', () => {
    const setFeedback = jest.fn();
    const { getByText } = render(
      <FeedbackMessage
        type="error"
        code="auth/email-already-in-use"
        message="Este correo electrónico ya existe"
        setFeedback={setFeedback}
      />
    );

    const closeButton = getByText('×');
    expect(closeButton).toBeInTheDocument();

    const errorMessage = getByText('¡Ha ocurrido un error!');
    const errorDescription = getByText('Este correo electrónico ya existe');
    expect(errorMessage).toBeInTheDocument();
    expect(errorDescription).toBeInTheDocument();

    fireEvent.click(closeButton);
    expect(setFeedback).toHaveBeenCalledWith({
      isActive: false,
    });
  });

  test('renders success message correctly', () => {
    const setFeedback = jest.fn();
    const { getByText } = render(
      <FeedbackMessage
        type="success"
        message="¡Se ha registrado con éxito!"
        setFeedback={setFeedback}
      />
    );

    const closeButton = getByText('×');
    expect(closeButton).toBeInTheDocument();

    const successMessage = getByText('¡Se ha registrado con éxito!');
    const successDescription = getByText('message');
    expect(successMessage).toBeInTheDocument();
    expect(successDescription).toBeInTheDocument();

    fireEvent.click(closeButton);
    expect(setFeedback).toHaveBeenCalledWith({
      isActive: false,
    });
  });
});
