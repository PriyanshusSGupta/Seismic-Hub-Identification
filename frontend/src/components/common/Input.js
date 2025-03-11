import React from 'react';
import './Input.css';

const Input = ({
  type = 'text',
  label,
  id,
  value,
  onChange,
  error,
  placeholder,
  required = false,
  disabled = false,
  className = ''
}) => {
  return (
    <div className={`input-wrapper ${className}`}>
      {label && (
        <label htmlFor={id} className="input-label">
          {label}
          {required && <span className="input-required">*</span>}
        </label>
      )}
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`input ${error ? 'input-error' : ''}`}
      />
      {error && <p className="input-error-message">{error}</p>}
    </div>
  );
};

export default Input;