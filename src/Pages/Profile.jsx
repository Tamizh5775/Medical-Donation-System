import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const UserProfile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    bio: "",
    avatar: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = {
          name: "John Doe",
          email: "johndoe@example.com",
          bio: "Web Developer & Tech Enthusiast",
          avatar: "/assets/avatar.jpg",
        };
        setUser(userData);
      } catch (err) {
        setError("Failed to fetch user data");
      }
    };
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser((prevUser) => ({ ...prevUser, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setUser((prevUser) => ({ ...prevUser, avatar: "" }));
  };

  const validateForm = () => {
    if (!user.name.trim()) return "Name cannot be empty";
    if (!user.email.match(/^\S+@\S+\.\S+$/)) return "Invalid email format";
    if (!user.bio.trim()) return "Bio cannot be empty";
    return "";
  };

  const handleSave = async () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    console.log("Saved Data:", user);
    setIsEditing(false);
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="text-center">
          <img
            src={user.avatar || "/assets/default-avatar.png"}
            alt="User Avatar"
            className="rounded-circle img-fluid profile-img shadow"
          />
          {isEditing && (
            <>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="form-control mt-2"
              />
              {user.avatar && (
                <button className="btn btn-danger mt-2" onClick={removeImage}>
                  Remove Image
                </button>
              )}
            </>
          )}
        </div>
        <div className="mt-4">
          <label className="form-label fw-bold">Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="form-control"
            disabled={!isEditing}
            aria-label="Name"
          />
        </div>
        <div className="mt-3">
          <label className="form-label fw-bold">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="form-control"
            disabled={!isEditing}
            aria-label="Email"
          />
        </div>
        <div className="mt-3">
          <label className="form-label fw-bold">Bio</label>
          <textarea
            name="bio"
            value={user.bio}
            onChange={handleChange}
            className="form-control"
            disabled={!isEditing}
            aria-label="Bio"
          />
        </div>
        <div className="mt-4 text-center">
          {isEditing ? (
            <button className="btn btn-success me-2" onClick={handleSave}>
              Save
            </button>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
