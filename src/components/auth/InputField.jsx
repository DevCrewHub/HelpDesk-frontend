import { Eye, EyeOff } from 'lucide-react';

const InputField = ({
  type = 'text',
  value,
  onChange,
  placeholder,
  icon: Icon,
  error,
  name,
  required = true,
  showToggle,
  toggleHandler,
  showPassword,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
        {name}
      </label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        )}
        <input
          type={showToggle ? (showPassword ? 'text' : 'password') : type}
          required={required}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full pl-10 ${showToggle ? 'pr-12' : 'pr-4'} py-3 border rounded-lg focus:ring-inset focus:ring-2 focus:outline-none transition-colors ${
            error ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'
          }`}
        />
        {showToggle && toggleHandler && (
          <button
            type="button"
            onClick={toggleHandler}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
          </button>
        )}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
