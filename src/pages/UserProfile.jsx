import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../context/StoreContext";
import { FaUserCircle } from "react-icons/fa";

export const UserProfile = () => {
  const { userDetails, preferences, updatePreferences } = useContext(StoreContext);
  const [newPreferences, setNewPreferences] = useState([]);

  useEffect(() => {
    setNewPreferences(preferences); // Load preferences when page loads
  }, [preferences]);

  const handleSave = () => {
    updatePreferences(newPreferences);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-lg border-0 rounded-4 p-4">
            {/* Profile Section */}
            <div className="text-center">
              <FaUserCircle size={100} className="text-secondary" />
              <h3 className="mt-3 text-primary">{userDetails?.username}</h3>
              <p className="text-muted">{userDetails?.email}</p>
            </div>

            <hr />

            {/* Preferences Section */}
            <h5 className="text-secondary text-center mt-4">Movie Preferences</h5>
            <div className="d-flex flex-wrap gap-2 justify-content-center">
              {["Action", "Comedy", "Drama", "Horror", "Romance", "Sci-Fi"].map((genre) => (
                <button
                  key={genre}
                  className={`btn ${
                    newPreferences.includes(genre) ? "btn-success" : "btn-outline-secondary"
                  }`}
                  onClick={() => {
                    setNewPreferences((prev) =>
                      prev.includes(genre) ? prev.filter((p) => p !== genre) : [...prev, genre]
                    );
                  }}
                >
                  {genre}
                </button>
              ))}
            </div>

            {/* Save Button */}
            <div className="text-center mt-4">
              <button className="btn btn-primary px-4 py-2" onClick={handleSave}>
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
