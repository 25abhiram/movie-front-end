import React, { useState } from "react";
import axios from "axios";

export const AddTheatreForm = () => {
  const [theatre, setTheatre] = useState({
    theatreName: "",
    location: "",
    movieId: "",
    showtimes: "",
    startDate: "",
    endDate: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setTheatre({ ...theatre, [e.target.name]: e.target.value });

    // Clear the error message when the user types
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

    // Validate each field
    if (!theatre.theatreName.trim()) newErrors.theatreName = "Theatre Name is required";
    if (!theatre.location.trim()) newErrors.location = "Location is required";
    if (!theatre.movieId.trim()) newErrors.movieId = "Movie ID is required";
    if (!theatre.startDate) newErrors.startDate = "Start Date is required";
    if (!theatre.endDate) newErrors.endDate = "End Date is required";

    // Ensure start date is not in the past
    const today = new Date().toISOString().split("T")[0]; // Get current date
    if (theatre.startDate && theatre.startDate < today) {
      newErrors.startDate = "Start Date cannot be in the past";
    }

    // Ensure end date is not before start date
    if (theatre.endDate && theatre.startDate && theatre.endDate < theatre.startDate) {
      newErrors.endDate = "End Date cannot be before Start Date";
    }

    // Showtimes validation
    if (!theatre.showtimes.trim()) {
      newErrors.showtimes = "Showtimes are required (comma-separated)";
    }

    // If there are errors, update the state and stop submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/theatres", {
        ...theatre,
        showtimes: theatre.showtimes.split(",").map((time) => time.trim()), // Convert to array
      });
      alert("Theatre added successfully!");

      // Reset form after successful submission
      setTheatre({
        theatreName: "",
        location: "",
        movieId: "",
        showtimes: "",
        startDate: "",
        endDate: "",
      });

      setErrors({}); // Clear errors
    } catch (error) {
      console.error("Error adding theatre:", error);
    }
  };

  return (
    <div className="p-4 border rounded">
      <h3 className="text-primary">Add New Theatre</h3>
      <form onSubmit={handleSubmit}>
        {/* Theatre Name */}
        <div className="mb-2">
          <input
            type="text"
            name="theatreName"
            className={`form-control ${errors.theatreName ? "is-invalid" : ""}`}
            placeholder="Theatre Name"
            value={theatre.theatreName}
            onChange={handleChange}
          />
          <div className="invalid-feedback">{errors.theatreName}</div>
        </div>

        {/* Location */}
        <div className="mb-2">
          <input
            type="text"
            name="location"
            className={`form-control ${errors.location ? "is-invalid" : ""}`}
            placeholder="Location"
            value={theatre.location}
            onChange={handleChange}
          />
          <div className="invalid-feedback">{errors.location}</div>
        </div>

        {/* Movie ID */}
        <div className="mb-2">
          <input
            type="text"
            name="movieId"
            className={`form-control ${errors.movieId ? "is-invalid" : ""}`}
            placeholder="Movie ID"
            value={theatre.movieId}
            onChange={handleChange}
          />
          <div className="invalid-feedback">{errors.movieId}</div>
        </div>

        {/* Showtimes */}
        <div className="mb-2">
          <input
            type="text"
            name="showtimes"
            className={`form-control ${errors.showtimes ? "is-invalid" : ""}`}
            placeholder="Showtimes (comma-separated)"
            value={theatre.showtimes}
            onChange={handleChange}
          />
          <div className="invalid-feedback">{errors.showtimes}</div>
        </div>

        {/* Start Date */}
        <div className="mb-2">
          <input
            type="date"
            name="startDate"
            className={`form-control ${errors.startDate ? "is-invalid" : ""}`}
            value={theatre.startDate}
            min={new Date().toISOString().split("T")[0]} // Prevent past dates
            onChange={handleChange}
          />
          <div className="invalid-feedback">{errors.startDate}</div>
        </div>

        {/* End Date */}
        <div className="mb-2">
          <input
            type="date"
            name="endDate"
            className={`form-control ${errors.endDate ? "is-invalid" : ""}`}
            value={theatre.endDate}
            onChange={handleChange}
          />
          <div className="invalid-feedback">{errors.endDate}</div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-100 mt-2">Submit</button>
      </form>
    </div>
  );
};
