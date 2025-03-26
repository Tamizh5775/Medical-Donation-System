import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import About from "./Pages/About";
import Footer from "./Components/Footer";
import Donation from "./Pages/Donation";
import Request from "./Pages/Request";
import RequestDetails from "./Pages/RequestDetails"; // Import RequestDetails component

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/donation" element={<Donation />} />
          <Route path="/request" element={<Request />} />
          <Route path="/request/:id" element={<RequestDetails />} /> {/* Add dynamic route */}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
