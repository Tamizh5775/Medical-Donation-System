import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Request = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    urgency: "Medium",
    address: "",
    request_date: "",
  });
  const [donations, setDonations] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const response = await axios.get("http://localhost:5000/donations");
      setDonations(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching donations:", error);
      setError("Failed to load donations. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Prevent requesting more than available quantity
    if (name === "quantity") {
      const requestedQuantity = parseInt(value, 10);
      const availableQuantity = donations.find(
        (donation) => donation.name === formData.name
      )?.quantity;

      if (availableQuantity && requestedQuantity > availableQuantity) {
        alert(`You can't request more than ${availableQuantity}`);
        return;
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/request", formData);
      alert("Request submitted successfully!");
      setShowForm(false);
      setFormData({
        name: "",
        quantity: "",
        urgency: "Medium",
        address: "",
        request_date: "",
      });
    } catch (error) {
      console.error("Error submitting request:", error);
      alert("Failed to submit request. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Request Medicine</h2>

      <button
        className="btn btn-primary my-3"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Hide Form" : "Place Request"}
      </button>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mt-4 border p-4 rounded shadow"
        >
          <input
            type="text"
            name="name"
            className="form-control mb-3"
            placeholder="Medicine Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="quantity"
            className="form-control mb-3"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
            min="1"
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
            placeholder="Address"
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
          <button type="submit" className="btn btn-success" disabled={loading}>
            {loading ? "Submitting..." : "Submit Request"}
          </button>
        </form>
      )}

      <h3 className="mt-5">Available Donations</h3>
      {error && <p className="text-danger">{error}</p>}
      {donations.length === 0 ? (
        <p className="text-center text-muted">No donations available at the moment.</p>
      ) : (
        <table className="table table-bordered mt-4">
          <thead className="table-dark">
            <tr>
              <th>Medicine</th>
              <th>Quantity</th>
              <th>Expire Date</th>
              <th>Donor Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation) => (
              <tr key={donation._id}>
                <td>{donation.name}</td>
                <td>{donation.quantity}</td>
                <td>
                  {donation.expire_date
                    ? new Date(donation.expire_date).toLocaleDateString()
                    : "N/A"}
                </td>
                <td>{donation.address || "N/A"}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate(`/request/${donation._id}`)}
                    disabled={donation.requested}
                  >
                    {donation.requested ? "Already Requested" : "Request"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Request;
