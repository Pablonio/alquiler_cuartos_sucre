// Input.tsx
import React from 'react';

interface InputProps {
  id: string;
  label?: string;
  type?: 'text' | 'email' | 'password' | 'file' | 'date';
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  register?: any; // Para usar con react-hook-form si es necesario
  errors?: any; // Para mostrar errores con react-hook-form
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = 'text',
  placeholder,
  required = false,
  disabled = false,
  register,
  errors,
  onChange,
  value,
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="mt-1">
        <input
          {...register(id)} // Integración con react-hook-form
          id={id}
          type={type}
          required={required}
          disabled={disabled}
          placeholder={placeholder}
          onChange={onChange}
          value={value} // Establecer el valor del input
          className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
            errors && errors[id] ? 'border-red-500' : ''
          }`}
        />
      </div>
      {errors && errors[id] && (
        <p className="mt-2 text-sm text-red-600" id={`${id}-error`}>
          {errors[id].message}
        </p>
      )}
    </div>
  );
};

export default Input;
