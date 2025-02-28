import React, { useState } from "react";
import axios from "axios";

export const AddMovieForm = () => {
  const genresList = ["Action", "Comedy", "Drama", "Horror", "Romance", "Sci-Fi"];

  const [movie, setMovie] = useState({
    title: "",
    releaseDate: "",
    trailerLink: "",
    poster_path: "",
    genres: [],
    runtime: "",
    budget: "",
    revenue: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error message when user types
  };

  const handleGenreChange = (e) => {
    const { value, checked } = e.target;
    setMovie((prev) => ({
      ...prev,
      genres: checked ? [...prev.genres, value] : prev.genres.filter((g) => g !== value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    // Validate form fields
    if (!movie.title.trim()) newErrors.title = "Title is required";
    if (!movie.releaseDate) newErrors.releaseDate = "Release Date is required";
    if (!movie.trailerLink.trim()) newErrors.trailerLink = "Trailer Link is required";
    if (!movie.poster_path.trim()) newErrors.poster_path = "Poster URL is required";
    if (!movie.runtime.trim()) newErrors.runtime = "Runtime is required";
    if (!movie.budget.trim()) newErrors.budget = "Budget is required";
    if (!movie.revenue.trim()) newErrors.revenue = "Revenue is required";
    if (!movie.description.trim()) newErrors.description = "Description is required";
    if (movie.genres.length === 0) newErrors.genres = "At least one genre is required";

    // Validate release date (should not be in the future)
    const today = new Date().toISOString().split("T")[0];
    if (movie.releaseDate && movie.releaseDate > today) {
      newErrors.releaseDate = "Release Date cannot be in the future";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/v1/movies", movie);
      alert("Movie added successfully!");

      // Reset form after successful submission
      setMovie({
        title: "",
        releaseDate: "",
        trailerLink: "",
        poster_path: "",
        genres: [],
        runtime: "",
        budget: "",
        revenue: "",
        description: "",
      });

      setErrors({});
    } catch (error) {
      console.error("Error adding movie:", error);
    }
  };

  return (
    <div className="p-4 border rounded">
      <h3 className="text-primary">Add New Movie</h3>
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-2">
          <input type="text" name="title" value={movie.title} 
            className={`form-control ${errors.title ? "is-invalid" : ""}`} 
            placeholder="Title" onChange={handleChange} />
          <div className="invalid-feedback">{errors.title}</div>
        </div>

        {/* Release Date */}
        <div className="mb-2">
          <input type="date" name="releaseDate" value={movie.releaseDate}
            className={`form-control ${errors.releaseDate ? "is-invalid" : ""}`} 
            max={new Date().toISOString().split("T")[0]} onChange={handleChange} />
          <div className="invalid-feedback">{errors.releaseDate}</div>
        </div>

        {/* Trailer Link */}
        <div className="mb-2">
          <input type="text" name="trailerLink" value={movie.trailerLink}
            className={`form-control ${errors.trailerLink ? "is-invalid" : ""}`} 
            placeholder="Trailer Link" onChange={handleChange} />
          <div className="invalid-feedback">{errors.trailerLink}</div>
        </div>

        {/* Poster URL */}
        <div className="mb-2">
          <input type="text" name="poster_path" value={movie.poster_path}
            className={`form-control ${errors.poster_path ? "is-invalid" : ""}`} 
            placeholder="Poster URL" onChange={handleChange} />
          <div className="invalid-feedback">{errors.poster_path}</div>
        </div>

        {/* Genre Checkboxes */}
        <div className="mt-2">
          <label className="form-label">Select Genres:</label>
          <div className="d-flex flex-wrap gap-2">
            {genresList.map((genre) => (
              <div key={genre} className="form-check">
                <input type="checkbox" value={genre}
                  className="form-check-input"
                  onChange={handleGenreChange}
                  checked={movie.genres.includes(genre)} />
                <label className="form-check-label">{genre}</label>
              </div>
            ))}
          </div>
          <div className="invalid-feedback d-block">{errors.genres}</div>
        </div>

        {/* Runtime */}
        <div className="mb-2">
          <input type="text" name="runtime" value={movie.runtime}
            className={`form-control ${errors.runtime ? "is-invalid" : ""}`} 
            placeholder="Runtime" onChange={handleChange} />
          <div className="invalid-feedback">{errors.runtime}</div>
        </div>

        {/* Budget */}
        <div className="mb-2">
          <input type="text" name="budget" value={movie.budget}
            className={`form-control ${errors.budget ? "is-invalid" : ""}`} 
            placeholder="Budget" onChange={handleChange} />
          <div className="invalid-feedback">{errors.budget}</div>
        </div>

        {/* Revenue */}
        <div className="mb-2">
          <input type="text" name="revenue" value={movie.revenue}
            className={`form-control ${errors.revenue ? "is-invalid" : ""}`} 
            placeholder="Revenue" onChange={handleChange} />
          <div className="invalid-feedback">{errors.revenue}</div>
        </div>

        {/* Description */}
        <div className="mb-2">
          <textarea name="description" value={movie.description}
            className={`form-control ${errors.description ? "is-invalid" : ""}`} 
            placeholder="Description" onChange={handleChange} />
          <div className="invalid-feedback">{errors.description}</div>
        </div>

        <button type="submit" className="btn btn-primary w-100">Submit</button>
      </form>
    </div>
  );
};
