import React, { useContext, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../pages/Sidebar";
import { AddMovieForm } from "../pages/AddMovieForm";
import { AddTheatreForm } from "../pages/AddTheatreForm";
import { MovieManagement } from "../pages/MovieManagement";
import { TheatreManagement } from "../pages/TheatreManagement";

export const AdminPage = () => {
  const { userDetails } = useContext(StoreContext);
  const navigate = useNavigate();
  const [activeForm, setActiveForm] = useState(null); // Track which form to show

  // Check if the user is an admin, otherwise redirect
  if (!userDetails?.roles.includes("ROLE_ADMIN")) {
    navigate("/");
    return null; // Prevent rendering if unauthorized
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center text-primary">Admin Dashboard</h1>
      <p className="text-center">Welcome, You have admin access.</p>
      <hr />
      <div className="d-flex">
        <Sidebar setActiveForm={setActiveForm} /> {/* Pass the function */}
        <div className="flex-grow-1 p-3">
          {activeForm === "movie" && <AddMovieForm />}
          {activeForm === "theatre" && <AddTheatreForm />}
          {activeForm === "manageMovies" && <MovieManagement />}
          {activeForm === "manageTheatres" && <TheatreManagement />}
        </div>
      </div>
    </div>
  );
};
