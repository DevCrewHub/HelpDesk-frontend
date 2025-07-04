import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const CreateTicket = () => {
  const [formData, setFormData] = useState({ title: "", description: "", priority: "Medium", department: "Technical Support" });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = () => {
    if (!formData.title || !formData.description) return alert("Fill all fields");
    alert("Ticket Created");
    navigate("/");
  };

  return (
    <main className="flex-1 p-8">
      <div className="max-w-2xl mx-auto">
        <button onClick={() => navigate("/")} className="text-indigo-600 flex items-center gap-2 mb-4">
          <FaArrowLeft className="w-4 h-4" /> Back
        </button>
        <h2 className="text-2xl font-bold mb-6">Create Ticket</h2>
        <div className="space-y-4">
          <input name="title" value={formData.title} onChange={handleInputChange} placeholder="Title" className="w-full border px-4 py-2" />
          <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" className="w-full border px-4 py-2" />
          <select name="priority" value={formData.priority} onChange={handleInputChange} className="w-full border px-4 py-2">
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          <select name="department" value={formData.department} onChange={handleInputChange} className="w-full border px-4 py-2">
            <option>Technical Support</option>
            <option>Billing</option>
          </select>
          <button onClick={handleFormSubmit} className="bg-indigo-600 text-white px-6 py-2 rounded">Submit</button>
        </div>
      </div>
    </main>
  );
};

export default CreateTicket;