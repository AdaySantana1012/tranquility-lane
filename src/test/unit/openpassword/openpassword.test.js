import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { OpenPassword, ConfirmOpenPassword } from '../../../components/OpenPassword';

describe('OpenPassword', () => {
  const showPasswordMock = jest.fn();

  it('should render open eye icon', () => {
    const { getByAltText } = render(<OpenPassword isOpenPassword={false} showPassword={showPasswordMock} />);
    const eyeIconElement = getByAltText('Icono de password');
    expect(eyeIconElement).toBeInTheDocument();
    expect(eyeIconElement.getAttribute('src')).toBe('eye-icon.svg');
  });

  it('should render close eye icon', () => {
    const { getByAltText } = render(<OpenPassword isOpenPassword={true} showPassword={showPasswordMock} />);
    const eyeIconElement = getByAltText('Icono de password');
    expect(eyeIconElement).toBeInTheDocument();
    expect(eyeIconElement.getAttribute('src')).toBe('close-eye-icon.svg');
  });

  it('should call showPassword function on click', () => {
    const { getByTestId } = render(<OpenPassword isOpenPassword={false} showPassword={showPasswordMock} />);
    const buttonElement = getByTestId('password-icon');
    fireEvent.click(buttonElement);
    expect(showPasswordMock).toHaveBeenCalledTimes(1);
  });
});

describe('ConfirmOpenPassword', () => {
  const showPasswordMock = jest.fn();

  it('should render open eye icon', () => {
    const { getByAltText } = render(<ConfirmOpenPassword isConfirmOpenPassword={false} showPassword={showPasswordMock} />);
    const eyeIconElement = getByAltText('Icono de password');
    expect(eyeIconElement).toBeInTheDocument();
    expect(eyeIconElement.getAttribute('src')).toBe('eye-icon.svg');
  });

  it('should render close eye icon', () => {
    const { getByAltText } = render(<ConfirmOpenPassword isConfirmOpenPassword={true} showPassword={showPasswordMock} />);
    const eyeIconElement = getByAltText('Icono de password');
    expect(eyeIconElement).toBeInTheDocument();
    expect(eyeIconElement.getAttribute('src')).toBe('close-eye-icon.svg');
  });

  it('should call showPassword function on click', () => {
    const { getByTestId } = render(<ConfirmOpenPassword isConfirmOpenPassword={false} showPassword={showPasswordMock} />);
    const buttonElement = getByTestId('password-icon');
    fireEvent.click(buttonElement);
    expect(showPasswordMock).toHaveBeenCalledTimes(1);
  });
});