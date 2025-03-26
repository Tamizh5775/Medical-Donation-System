import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const RequestDonation = () => {
  const { id } = useParams(); // Get donation ID from URL
  const navigate = useNavigate();

  const [donation, setDonation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    urgency: "Medium",
    address: "",
    request_date: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/donations/${id}`)
      .then((response) => {
        setDonation(response.data);
        setFormData((prev) => ({
          ...prev,
          name: response.data.name,
          quantity: response.data.quantity,
        }));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching donation:", error);
        alert("Failed to load donation details.");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Prevent requesting more than available quantity
    if (name === "quantity" && value > donation.quantity) {
      alert(`You can't request more than ${donation.quantity}`);
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.address || !formData.request_date) {
      alert("Please fill in all required fields.");
      return;
    }
    try {
      await axios.post("http://localhost:5000/request", formData);
      alert("Request submitted successfully!");
      navigate("/donations"); // Redirect back
    } catch (error) {
      console.error("Error submitting request:", error);
      alert("Failed to submit request. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <button
        onClick={() => navigate("/donations")}
        className="btn btn-secondary mb-3"
      >
        ← Back to Donations
      </button>
      <h2 className="text-center">Request Medicine</h2>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : donation ? (
        <div className="card shadow-lg p-4">
          <div className="row">
            <div className="col-md-4 text-center">
              <img
                src={donation.image || "https://via.placeholder.com/150"}
                alt={donation.name}
                className="img-fluid rounded"
              />
            </div>
            <div className="col-md-8">
              <h4>{donation.name}</h4>
              <p>
                <strong>Quantity Available:</strong> {donation.quantity}
              </p>
              <p>
                <strong>Expiry Date:</strong>{" "}
                {donation.expire_date || "N/A"}
              </p>
              <p>
                <strong>Donor Address:</strong> {donation.address || "N/A"}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-danger">Donation not found</p>
      )}

      <form onSubmit={handleSubmit} className="mt-4 border p-4 rounded shadow">
        <input
          type="text"
          name="name"
          className="form-control mb-3"
          value={formData.name}
          readOnly
        />
        <input
          type="number"
          name="quantity"
          className="form-control mb-3"
          value={formData.quantity}
          onChange={handleChange}
          min="1"
          max={donation?.quantity}
          required
        />
        <select
          name="urgency"
          className="form-control mb-3"
          value={formData.urgency}
          onChange={handleChange}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <textarea
          name="address"
          className="form-control mb-3"
          placeholder="Your Address"
          value={formData.address}
          onChange={handleChange}
          required
        ></textarea>
        <input
          type="date"
          name="request_date"
          className="form-control mb-3"
          value={formData.request_date}
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn btn-success">
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default RequestDonation;
