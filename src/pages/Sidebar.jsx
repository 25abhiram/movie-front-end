import React from "react";
import { NavLink } from "react-router-dom";

export const Sidebar = ({ setActiveForm }) => {
  return (
    <div
      className="d-flex flex-column p-3 border-end"
      style={{ width: "250px" }}
    >
      <button
        className="btn btn-outline-secondary mb-2"
        onClick={() => setActiveForm("movie")}
      >
        <i className="bi bi-plus-circle me-2"></i> Add Movie
      </button>

      <button
        className="btn btn-outline-secondary mb-2"
        onClick={() => setActiveForm("theatre")}
      >
        <i className="bi bi-plus-circle me-2"></i> Add Theatre
      </button>

      <button
        className="btn btn-outline-secondary mb-2"
        onClick={() => setActiveForm("manageMovies")}
      >
        <i className="bi bi-pencil-square me-2"></i> Manage Movies
      </button>

      <button
        className="btn btn-outline-secondary"
        onClick={() => setActiveForm("manageTheatres")}
      >
        <i className="bi bi-building me-2"></i> Manage Theatres
      </button>
    </div>
  );
};
