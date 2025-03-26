import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const RequestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [donation, setDonation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDonationDetails();
  }, [id]);

  const fetchDonationDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/donations/${id}`);
      setDonation(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching donation details:", error);
      setError("Failed to fetch donation details. Please try again.");
    }
  };

  const handleRequestSubmit = async () => {
    setLoading(true);
    try {
      await axios.put(`http://localhost:5000/donations/request/${id}`);
      alert("Request submitted successfully!");
      navigate("/request");
    } catch (error) {
      console.error("Error submitting request:", error);
      alert("Failed to submit request. Please try again.");
    }
    setLoading(false);
  };

  if (error) {
    return <p className="text-center mt-5 text-danger">{error}</p>;
  }

  if (!donation) {
    return <p className="text-center mt-5">Loading donation details...</p>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center">Donation Details</h2>
      <div className="border p-4 rounded shadow mt-4">
        <p><strong>Medicine Name:</strong> {donation.name}</p>
        <p><strong>Quantity:</strong> {donation.quantity}</p>
        <p><strong>Expire Date:</strong> {new Date(donation.expire_date).toLocaleDateString()}</p>
        <p><strong>Donor Address:</strong> {donation.address}</p>
        <button className="btn btn-success mt-3" onClick={handleRequestSubmit} disabled={loading}>
          {loading ? "Submitting..." : "Submit Request"}
        </button>
      </div>
    </div>
  );
};

export default RequestDetails;
