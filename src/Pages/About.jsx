import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./About.css"; // Ensure to create a separate CSS file for custom styling

const About = () => {
  return (
    <div className="container my-5">
      <div className="text-center mb-4">
        <h1 className="fw-bold fade-in">About Us</h1>
        <p className="text-muted">Making medicine accessible to those in need.</p>
      </div>

      <div className="row align-items-center mb-5">
        <div className="col-md-12">
          <h3 className="fw-bold">Our Mission</h3>
          <p>
            Our mission is to bridge the gap between surplus medicines and people in need. 
            By facilitating medicine donations, we ensure that no medicine goes to waste while 
            helping those who cannot afford essential healthcare.
          </p>
        </div>
      </div>

      <div className="row align-items-center mb-5">
        <div className="col-md-12">
          <h3 className="fw-bold">Our Vision</h3>
          <p>
            We envision a world where essential medicines are accessible to everyone. 
            Through community-driven efforts and responsible redistribution, we strive to 
            create a healthier and more compassionate society.
          </p>
        </div>
      </div>

      <div className="row text-center fade-in">
        <h2 className="fw-bold mb-4">Meet the Team</h2>
        <div className="col-md-2"></div>
        <div className="col-md-2 hover-zoom">
          <h5 className="mt-2">Titus G</h5>
          <p className="text-muted">Founder & Medical Advisor</p>
        </div>
        <div className="col-md-2 hover-zoom">
          <h5 className="mt-2">Tamil Selvan S</h5>
          <p className="text-muted">Operations Manager</p>
        </div>
        <div className="col-md-2 hover-zoom">
          <h5 className="mt-2">Sam Solomon R</h5>
          <p className="text-muted">Community Outreach Coordinator</p>
        </div>
        <div className="col-md-2 hover-zoom">
          <h5 className="mt-2">Kishor V</h5>
          <p className="text-muted">Logistics Coordinator</p>
        </div>
        <div className="col-md-2 hover-zoom">
          <h5 className="mt-2">Vijay Athethyan R</h5>
          <p className="text-muted">Marketing Head</p>
        </div>
      </div>
    </div>
  );
};

export default About;
