import { LogIn, UserPlus } from 'lucide-react';

const ToggleSwitch = ({ isLogin, setIsLogin, clearForms }) => {
  const switchToLogin = () => {
    setIsLogin(true);
    clearForms();
  };

  const switchToRegister = () => {
    setIsLogin(false);
    clearForms();
  };

  return (
    <div className="flex bg-gray-100 rounded-lg p-1 mb-8">
      <button
        onClick={switchToLogin}
        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 cursor-pointer ${
          isLogin
            ? 'bg-white text-indigo-600 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <LogIn className="w-4 h-4 inline mr-2" />
        Login
      </button>
      <button
        onClick={switchToRegister}
        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 cursor-pointer ${
          !isLogin
            ? 'bg-white text-indigo-600 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <UserPlus className="w-4 h-4 inline mr-2" />
        Register
      </button>
    </div>
  );
};

export default ToggleSwitch;
