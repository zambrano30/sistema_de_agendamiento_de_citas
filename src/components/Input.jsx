import React from 'react'

export default function Input({
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  id,
  required,
  disabled,
  className = ""
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      id={id}
      required={required}
      disabled={disabled}
      className={`form-input ${className}`}
    />
  )
}
