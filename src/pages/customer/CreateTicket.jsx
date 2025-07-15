import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { toast } from "react-toastify";

const CreateTicket = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "HIGH",
    departmentName: "",
  });

  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch departments
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await api.get("/customer/departments");
        setDepartments(response.data);
        if (response.data.length > 0) {
          setFormData((prev) => ({
            ...prev,
            departmentName: response.data[0].name,
          }));
        }
      } catch (error) {
        console.error("Failed to fetch departments", error);
        toast.error("Error loading departments");
      }
    };

    fetchDepartments();
  }, []);

  // Only CUSTOMER can access
  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (role !== "CUSTOMER") {
      navigate("/");
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async () => {
    if (!formData.title || !formData.description || !formData.departmentName) {
      return toast.warning("Please fill all fields");
    }

    try {
      setLoading(true);
      await api.post("/customer/ticket", formData);
      toast.success("Ticket Created Successfully");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create ticket");
    } finally {
      setLoading(false);
    }
  };

  return (
    
      <div className="flex-grow px-6 py-2">
        <div className="-mx-6 border-b border-gray-300 bg-gray-50 mt-2 pb-2 mb-6">
          <h1 className="text-2xl pb-2 px-6 font-semibold tracking-tight">Create a New Ticket</h1>
        </div>

        <div className="-mx-6 px-6 pb-6 mt-0">
          <h2 className="text-lg font-medium text-gray-800 mb-1">Submit your issue below</h2>
          <p className="text-base text-gray-600">
            Fill out the form with details of your problem — our support team will assist you as soon as possible.
          </p>
        </div>

        {/* Form Card */}
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md border border-gray-200 overflow-visible">
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter ticket title"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe the issue"
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <select
                name="departmentName"
                value={formData.departmentName}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.name}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-4">
              <button
                onClick={handleFormSubmit}
                disabled={loading}
                className={`w-full text-white font-medium py-2 rounded-lg transition-all duration-300 cursor-pointer ${
                  loading ? "bg-indigo-300 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                {loading ? "Submitting..." : "Submit Ticket"}
              </button>
            </div>
          </div>
        </div>
      </div>
    
  );
};

export default CreateTicket;
