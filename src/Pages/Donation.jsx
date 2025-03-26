import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Donations = () => {
  const [donations, setDonations] = useState([]);
  const [requestedDonations, setRequestedDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterUrgency, setFilterUrgency] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    image: "",
    expire_date: "",
    address: "",
    donating_date: "",
    urgency: "Medium",
  });

  useEffect(() => {
    fetchDonations();
    fetchRequestedDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const response = await axios.get("http://localhost:5000/donations");
      setDonations(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching donations:", error);
      setLoading(false);
    }
  };

  const fetchRequestedDonations = async () => {
    try {
      const response = await axios.get("http://localhost:5000/requested-donations");
      setRequestedDonations(response.data);
    } catch (error) {
      console.error("Error fetching requested donations:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/donate", formData);
      alert("Donation submitted successfully!");
      setShowForm(false);
      setFormData({
        name: "",
        quantity: "",
        image: "",
        expire_date: "",
        address: "",
        donating_date: "",
        urgency: "Medium",
      });
      fetchDonations();
      fetchRequestedDonations();
    } catch (error) {
      console.error("Error donating medicine:", error);
    }
  };

  const sortDonations = (a, b) => {
    if (sortOption === "latest")
      return new Date(b.created_at) - new Date(a.created_at);
    if (sortOption === "expiry")
      return new Date(a.expire_date) - new Date(b.expire_date);
    if (sortOption === "quantity") return b.quantity - a.quantity;
    return 0;
  };

  const filteredDonations = donations
    .filter(
      (donation) =>
        donation.name.toLowerCase().includes(search.toLowerCase()) &&
        (filterUrgency ? donation.urgency === filterUrgency : true)
    )
    .sort(sortDonations);

  return (
    <div className="container mt-5">
      <h2 className="text-center">Donate & View Medicines</h2>

      <button
        className="btn btn-primary mb-3"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Close Form" : "Donate Medicine"}
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
            required
          />
          <input
            type="text"
            name="image"
            className="form-control mb-3"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
          />
          <input
            type="date"
            name="expire_date"
            className="form-control mb-3"
            value={formData.expire_date}
            onChange={handleChange}
            required
          />
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
            name="donating_date"
            className="form-control mb-3"
            value={formData.donating_date}
            onChange={handleChange}
            required
          />
          <select
            name="urgency"
            className="form-control mb-3"
            value={formData.urgency}
            onChange={handleChange}
          >
            <option value="Low">Low Urgency</option>
            <option value="Medium">Medium Urgency</option>
            <option value="High">High Urgency</option>
          </select>
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </form>
      )}

      {/* Requested Donations */}
      <div className="mt-5">
        <h3 className="text-center">Requested Donations</h3>
        {requestedDonations.length === 0 ? (
          <p className="text-center text-muted">No requested donations found.</p>
        ) : (
          <table className="table table-bordered mt-3">
            <thead className="table-dark">
              <tr>
                <th>Requester Name</th>
                <th>Medicine Name</th>
                <th>Quantity</th>
                <th>Request Date</th>
              </tr>
            </thead>
            <tbody>
              {requestedDonations.map((request) => (
                <tr key={request._id}>
                  <td>{request.requester_name}</td>
                  <td>{request.medicine_name}</td>
                  <td>{request.quantity}</td>
                  <td>{new Date(request.request_date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Donations;
