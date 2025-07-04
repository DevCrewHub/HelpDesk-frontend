import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({ userName: "", email: "", password: "", fullName: "", phoneNumber: "", userRole: "CUSTOMER", departmentName: "Technical Support" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:8082/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        alert("Registration Successful");
        navigate("/login");
      } else {
        alert("Registration Failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server Error");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded shadow max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <input name="userName" placeholder="Username" value={formData.userName} onChange={handleChange} className="w-full border mb-4 px-4 py-2" />
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full border mb-4 px-4 py-2" />
        <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full border mb-4 px-4 py-2" />
        <input name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} className="w-full border mb-4 px-4 py-2" />
        <input name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} className="w-full border mb-4 px-4 py-2" />
        <button onClick={handleSubmit} className="bg-indigo-600 text-white px-6 py-2 rounded w-full">Register</button>
      </div>
    </div>
  );
};

export default Register;