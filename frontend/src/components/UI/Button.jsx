import React from 'react';
import '../../styles/Button.css';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'medium', 
  disabled = false,
  className = '',
  type = 'button',
  ...props 
}) => {
  return (
    <button
      type={type}
      className={`btn btn-${variant} btn-${size} ${className} ${disabled ? 'disabled' : ''}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
