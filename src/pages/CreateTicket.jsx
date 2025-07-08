import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import api from "../utils/api";

const CreateTicket = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "HIGH",
    departmentName: "Technical",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async () => {
    if (!formData.title || !formData.description)
      return alert("Please fill all fields");

    try {
      setLoading(true);
      await api.post("/customer/ticket", formData);
      alert("Ticket Created Successfully");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Failed to create ticket");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 p-8">
      <div className="max-w-2xl mx-auto">
        <button onClick={() => navigate("/")} className="text-indigo-600 flex items-center gap-2 mb-4">
          <FaArrowLeft className="w-4 h-4" /> Back
        </button>
        <h2 className="text-2xl font-bold mb-6">Create Ticket</h2>
        <div className="space-y-4">
          <input
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Title"
            className="w-full border px-4 py-2"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="w-full border px-4 py-2"
          />
          <select
            name="priority"
            value={formData.priority}
            onChange={handleInputChange}
            className="w-full border px-4 py-2"
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
          <select
            name="departmentName"
            value={formData.departmentName}
            onChange={handleInputChange}
            className="w-full border px-4 py-2"
          >
            <option value="Technical">Technical</option>
            <option value="Finance">Finance</option>
            <option value="Marketing">Marketing</option>
            <option value="Others">Others</option>
          </select>
          <button
            onClick={handleFormSubmit}
            disabled={loading}
            className="bg-indigo-600 text-white px-6 py-2 rounded"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </main>
  );
};

export default CreateTicket;
