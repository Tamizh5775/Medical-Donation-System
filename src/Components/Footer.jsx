import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-3 mt-4">
      <div className="container text-center">
        <p className="mb-1">
          &copy; {new Date().getFullYear()} Your Website Name. All Rights
          Reserved.
        </p>
        <div>
          <a href="#" className="text-light mx-2">
            Privacy Policy
          </a>
          <a href="#" className="text-light mx-2">
            Terms of Service
          </a>
          <a href="#" className="text-light mx-2">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
