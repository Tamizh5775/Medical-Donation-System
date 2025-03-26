import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container-fluid d-flex flex-column align-items-center justify-content-center vh-100 bg-light text-center">
      <img 
        src="/Untitled design.png" 
        alt="Logo" 
        width="80" 
        height="80" 
        className="mb-4"
      />
      <h1 className="mb-3 fw-bold text-primary">Welcome to Our Platform</h1>
      <p className="mb-4 text-muted">Make a difference by donating or requesting help.</p>
      <div className="d-flex gap-3">
        <button
          className="btn btn-primary px-5 py-2 fw-bold shadow-sm"
          onClick={() => navigate("/donation")}
        >
          Donate
        </button>
        <button
          className="btn btn-outline-secondary px-5 py-2 fw-bold shadow-sm"
          onClick={() => navigate("/request")}
        >
          Request
        </button>
      </div>
    </div>
  );
};

export default Home;
