import { useState } from 'react';
import api from '../utils/api';
import { User, Mail, Lock, Phone, Building, UserPlus, Eye, EyeOff } from 'lucide-react';

export default function AgentRegistrationPage() {
  const [formData, setFormData] = useState({ userName: '', email: '', password: '', fullName: '', phoneNumber: '', departmentName: 'Finance' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const departments = ['Finance', 'Marketing', 'Technical', 'Other'];

  const handleInputChange = ({ target: { name, value } }) => {
    if (name === 'phoneNumber') {
      const numericValue = value.replace(/\D/g, '');
      if (numericValue.length > 10) return;
      value = numericValue;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    const { userName, email, password, fullName, phoneNumber } = formData;

    if (!userName.trim()) newErrors.userName = 'Username is required';
    else if (userName.length < 3) newErrors.userName = 'Username must be at least 3 characters';

    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Please enter a valid email address';

    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 8) newErrors.password = 'Password must be at least 8 characters';

    if (!fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    else if (!/^\d{10}$/.test(phoneNumber)) newErrors.phoneNumber = 'Phone number must be exactly 10 digits';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await api.post('/admin/register', { ...formData, userRole: 'AGENT' });
      alert(res.data.message || 'Agent registered successfully!');
      setFormData({ userName: '', email: '', password: '', fullName: '', phoneNumber: '', departmentName: 'Finance' });
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.error || 'An unexpected error occurred.';
      setErrors({ general: err.request ? 'Network error: Unable to connect to server.' : msg });
    } finally {
      setLoading(false);
    }
  };

  const renderInput = (label, name, type, Icon, autoComplete = '', showToggle = false) => (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type={showToggle ? (showPassword ? 'text' : 'password') : type}
          id={name}
          name={name}
          value={formData[name]}
          onChange={handleInputChange}
          autoComplete={autoComplete}
          placeholder={`Enter ${label.toLowerCase()}`}
          className={`w-full pl-10 ${showToggle ? 'pr-12' : 'pr-4'} py-3 border rounded-lg focus:ring-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors[name] ? 'border-red-500' : 'border-gray-300'}`}
        />
        {showToggle && (
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600" aria-label={showPassword ? 'Hide password' : 'Show password'}>
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      </div>
      {errors[name] && <p className="mt-1 text-sm text-red-600">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <UserPlus className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Register New Agent</h1>
          <p className="text-gray-600">Add a new agent to your system</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.general && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg"><p className="text-red-600 text-sm">{errors.general}</p></div>}
            {renderInput('Username', 'userName', 'text', User, 'username')}
            {renderInput('Email Address', 'email', 'email', Mail, 'email')}
            {renderInput('Password', 'password', 'password', Lock, 'new-password', true)}
            {renderInput('Full Name', 'fullName', 'text', User, 'name')}
            {renderInput('Phone Number', 'phoneNumber', 'tel', Phone, 'tel')}

            <div>
              <label htmlFor="departmentName" className="block text-sm font-medium text-gray-700 mb-2">Department</label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  id="departmentName"
                  name="departmentName"
                  value={formData.departmentName}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none bg-white cursor-pointer"
                >
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Registering...
                  </div>
                ) : 'Register Agent'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}