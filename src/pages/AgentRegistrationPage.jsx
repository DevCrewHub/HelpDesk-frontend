import { useEffect, useState } from 'react';
import api from '../utils/api';
import { User, Mail, Lock, Phone, Building, UserPlus, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Layout from '../layout/SidebarLayout';
import { toast } from 'react-toastify';


export default function AgentRegistrationPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    fullName: '',
    phoneNumber: '',
    departmentName: '',
  });

  const [departments, setDepartments] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

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
      const res = await api.post('/admin/register', {
        ...formData,
        userRole: 'AGENT',
      });
      toast.success(res.data.message || 'Agent registered successfully!');
      setFormData({
        userName: '',
        email: '',
        password: '',
        fullName: '',
        phoneNumber: '',
        departmentName: departments[0]?.name || '',
      });
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        'An unexpected error occurred.';
      setErrors({
        general: err.request
          ? 'Network error: Unable to connect to server.'
          : msg,
      });
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
          className={`w-full pl-10 ${showToggle ? 'pr-12' : 'pr-4'} py-3 border rounded-lg focus:ring-2 focus:outline-none focus:ring-indigo-500 transition-colors ${errors[name] ? 'border-red-500' : 'border-gray-300'}`}
        />
        {showToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
          </button>
        )}
      </div>
      {errors[name] && <p className="mt-1 text-sm text-red-600">{errors[name]}</p>}
    </div>
  );

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (role !== "ADMIN") {
      navigate("/");
    }

    const fetchDepartments = async () => {
      try {
        const response = await api.get("/admin/department");
        setDepartments(response.data || []);
        if (response.data.length > 0) {
          setFormData((prev) => ({
            ...prev,
            departmentName: response.data[0].name,
          }));
        }
      } catch (error) {
        console.error("Failed to fetch departments:", error);
      }
    };

    fetchDepartments();
  }, [navigate]);

  return (
    <Layout>
      <div className="flex-grow px-6 py-2">
        <div className="-mx-6 border-b border-gray-300 bg-gray-50 mt-2 pb-2 mb-6">
          <h1 className="text-2xl pb-2 px-6 font-semibold text-indigo-700">Register New Agent</h1>
        </div>

        <div className="-mx-6 px-6 pb-6 mt-0">
          <p className="text-base text-gray-600">Add a new agent to your system</p>
        </div>

        {/* Form Card */}
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md border border-gray-200 overflow-visible">
          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.general && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{errors.general}</p>
              </div>
            )}
            {renderInput('Username', 'userName', 'text', User, 'username')}
            {renderInput('Email Address', 'email', 'email', Mail, 'email')}
            {renderInput('Password', 'password', 'password', Lock, 'new-password', true)}
            {renderInput('Full Name', 'fullName', 'text', User, 'name')}
            {renderInput('Phone Number', 'phoneNumber', 'tel', Phone, 'tel')}

            {/* Department */}
            <div>
              <label htmlFor="departmentName" className="block text-sm font-medium text-gray-700 mb-2">
                Department
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  id="departmentName"
                  name="departmentName"
                  value={formData.departmentName}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white cursor-pointer"
                >
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.name}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`w-full text-white font-medium py-2 rounded-lg transition-all duration-300 cursor-pointer ${
                  loading
                    ? 'bg-indigo-300 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                {loading ? 'Registering...' : 'Register Agent'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
