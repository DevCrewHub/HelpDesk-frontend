import { useState, useMemo, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FormHeader from "../components/auth/FormHeader";
import ToggleSwitch from "../components/auth/ToggleSwitch";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import api from "../utils/api";

const AuthPage = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = location.pathname === "/login";

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [registerData, setRegisterData] = useState({ email: "", userName: "", fullName: "", phoneNumber: "", password: "" });

  const validateEmail = useCallback((email) => /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email), []);
  const validatePhone = useCallback((phone) => /^\d{10}$/.test(phone.replace(/\D/g, "")), []);
  const validatePassword = useCallback((password) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return {
      isValid: minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar,
      requirements: { minLength, hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar },
    };
  }, []);

  const passwordValidation = useMemo(() => {
    if (!registerData.password) return { isValid: false, requirements: {} };
    return validatePassword(registerData.password);
  }, [registerData.password, validatePassword]);

  const handlePhoneChange = useCallback((e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) {
      setRegisterData((prev) => ({ ...prev, phoneNumber: value }));
    }
  }, []);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    try {
      const res = await api.post("/auth/login", {
        userName: loginData.username,
        password: loginData.password,
      });
      localStorage.setItem("token", res.data.jwt);
      console.log(res);
      setIsAuthenticated(true);
      navigate("/");
    } catch (err) {
      setErrors({ general: "Invalid credentials" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const newErrors = {};
    if (!validateEmail(registerData.email)) newErrors.email = "Invalid email";
    if (!validatePhone(registerData.phoneNumber)) newErrors.phoneNumber = "Invalid phone number";
    const pwdCheck = validatePassword(registerData.password);
    if (!pwdCheck.isValid) newErrors.password = "Weak password";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }
    try {
      await api.post("/auth/signup", {
        ...registerData,
        userRole: "CUSTOMER",
        departmentName: "General Inquiry",
      });
      alert("Registration successful");
      navigate("/login");
    } catch (err) {
      setErrors({ general: "Registration failed" });
    } finally {
      setIsLoading(false);
    }
  };

  const clearForms = () => {
    setShowPassword(false);
    setErrors({});
    setLoginData({ username: "", password: "" });
    setRegisterData({ email: "", userName: "", fullName: "", phoneNumber: "", password: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-white to-blue-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <FormHeader isLogin={isLogin} />
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <ToggleSwitch isLogin={isLogin} setIsLogin={(val) => navigate(val ? "/login" : "/register")} clearForms={clearForms} />
          {errors.general && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg"><p className="text-red-600 text-sm">{errors.general}</p></div>}
          <div className="relative overflow-hidden">
            {isLogin ? (
              <LoginForm
                loginData={loginData}
                setLoginData={setLoginData}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                isLoading={isLoading}
                handleLoginSubmit={handleLoginSubmit}
                errors={errors}
              />
            ) : (
              <div className="max-h-96 overflow-y-auto pr-2">
                <RegisterForm
                  registerData={registerData}
                  setRegisterData={setRegisterData}
                  handlePhoneChange={handlePhoneChange}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  isLoading={isLoading}
                  handleRegisterSubmit={handleRegisterSubmit}
                  passwordValidation={passwordValidation}
                  errors={errors}
                />
              </div>
            )}
          </div>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button onClick={() => { clearForms(); navigate(isLogin ? "/register" : "/login"); }} className="text-blue-600 hover:text-blue-700 font-medium transition-colors cursor-pointer">
                {isLogin ? "Register here" : "Sign in here"}
              </button>
            </p>
            <p className="mt-3 text-xs text-gray-500">By continuing, you agree to our Terms of Service and Privacy Policy.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;