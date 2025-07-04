import { User } from 'lucide-react';

const FormHeader = ({ isLogin }) => {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-4 shadow-lg">
        <User className="w-8 h-8 text-white" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">HelpDesk Portal</h1>
      <p className="text-gray-600">
        {isLogin
          ? 'Welcome back! Please sign in to continue.'
          : 'Create your customer account to get started.'}
      </p>
    </div>
  );
};

export default FormHeader;
