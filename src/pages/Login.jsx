import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ setIsAuthenticated }) => {
  const [credentials, setCredentials] = useState({ userName: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!credentials.userName || !credentials.password) return alert("Enter all fields");
    try {
      const res = await fetch("http://localhost:8082/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("token", data.jwt);
        setIsAuthenticated(true);
        navigate("/");
      } else {
        alert("Invalid Credentials");
      }
    } catch (err) {
      console.error(err);
      alert("Server Error");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded shadow max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input name="userName" placeholder="Username" value={credentials.userName} onChange={handleChange} className="w-full border mb-4 px-4 py-2" />
        <input name="password" type="password" placeholder="Password" value={credentials.password} onChange={handleChange} className="w-full border mb-4 px-4 py-2" />
        <button onClick={handleSubmit} className="bg-indigo-600 text-white px-6 py-2 rounded w-full">Login</button>
      </div>
    </div>
  );
};

export default Login;
