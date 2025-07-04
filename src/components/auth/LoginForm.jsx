import InputField from './InputField';
import { User, Lock, Eye, EyeOff } from 'lucide-react';

const LoginForm = ({
  loginData,
  setLoginData,
  showPassword,
  setShowPassword,
  isLoading,
  handleLoginSubmit,
  errors,
}) => {
  return (
    <form onSubmit={handleLoginSubmit} className="space-y-6">
      <InputField
        name="Username"
        icon={User}
        value={loginData.username}
        onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
        placeholder="Enter your username"
        error={errors?.username}
      />

      <InputField
        name="Password"
        icon={Lock}
        value={loginData.password}
        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
        placeholder="Enter your password"
        error={errors?.password}
        showToggle
        showPassword={showPassword}

        toggleHandler={() => setShowPassword((prev) => !prev)}
      />

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
            Signing in...
          </div>
        ) : (
          'Sign In'
        )}
      </button>
    </form>
  );
};

export default LoginForm;
