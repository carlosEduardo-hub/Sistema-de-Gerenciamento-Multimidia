import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // Importando os ícones do lucide-react

interface PasswordInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  name: string;
  error?: string; // Erro opcional
}

const PasswordInput: React.FC<PasswordInputProps> = ({ value, onChange, placeholder, name, error }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="text-gray-700 font-semibold">
        {placeholder}
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full h-10 px-3 pr-10 border rounded outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={placeholder}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none"
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5 text-gray-600" />
          ) : (
            <Eye className="h-5 w-5 text-gray-600" />
          )}
        </button>
      </div>
      {error && <span className="text-red-600 text-sm">{error}</span>}
    </div>
  );
};

export default PasswordInput;
