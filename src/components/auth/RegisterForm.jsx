import InputField from './InputField';
import PasswordRequirements from './PasswordRequirements';
import { Mail, User, Phone, Lock, Eye, EyeOff } from 'lucide-react';

const RegisterForm = ({
  registerData,
  setRegisterData,
  handlePhoneChange,
  showPassword,
  setShowPassword,
  isLoading,
  handleRegisterSubmit,
  passwordValidation,
  errors
}) => {
  return (
    <form onSubmit={handleRegisterSubmit} className="space-y-4">
      <InputField
        name="Email Address"
        type="email"
        icon={Mail}
        value={registerData.email}
        onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
        placeholder="Enter your email"
        error={errors?.email}
      />

      <InputField
        name="Username"
        icon={User}
        value={registerData.userName}
        onChange={(e) => setRegisterData({ ...registerData, userName: e.target.value })}
        placeholder="Choose a username"
      />

      <InputField
        name="Full Name"
        icon={User}
        value={registerData.fullName}
        onChange={(e) => setRegisterData({ ...registerData, fullName: e.target.value })}
        placeholder="Enter your full name"
      />

      <InputField
        name="Phone Number"
        icon={Phone}
        type="tel"
        value={registerData.phoneNumber}
        onChange={handlePhoneChange}
        placeholder="Enter 10-digit phone number"
        error={errors?.phoneNumber}
      />

      <InputField
        name="Password"
        icon={Lock}
        value={registerData.password}
        onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
        placeholder="Create a strong password"
        error={errors?.password}
        showToggle
        showPassword={showPassword}

        toggleHandler={() => setShowPassword((prev) => !prev)}
      />

      {registerData.password && (
        <PasswordRequirements requirements={passwordValidation.requirements} />
      )}

      <button
        type="submit"
        disabled={isLoading || !passwordValidation.isValid}
        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-4 rounded-lg font-medium hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
            Creating account...
          </div>
        ) : (
          'Create Account'
        )}
      </button>
    </form>
  );
};

export default RegisterForm;
