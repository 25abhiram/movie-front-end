import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";

export const MovieManagement = () => {
  const { movie_list, setMovieList,fetchMovieList, token } = useContext(StoreContext);
  const [editingMovie, setEditingMovie] = useState(null); // Store the movie being edited
  const [updatedMovie, setUpdatedMovie] = useState({}); // Store updated movie details

  const url = "http://localhost:8080/api/v1/movies";

  useEffect(() => {
    fetchMovieList();
  }, []); 

  // Handle input change for editing
  const handleEditChange = (e) => {
    setUpdatedMovie({ ...updatedMovie, [e.target.name]: e.target.value });
  };

  // Handle delete movie
  const handleDelete = async (movieId,e) => {
    e.preventDefault(); // Prevent unintended reloads
    if (window.confirm("Are you sure you want to delete this movie?")) {
      try {
        await axios.delete(`${url}/${movieId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        fetchMovieList();
        // Update movie list after deletion
        // setMovieList((prevMovies) => prevMovies.filter((movie) => movie.movieId !== movieId));
      } catch (error) {
        console.error("Error deleting movie:", error);
      }
    }
  };

  // Handle save after editing
  const handleSave = async (movieId,e) => {
    e.preventDefault(); // Prevent form submission default behavior
    try {
        const movieToUpdate = {
            ...editingMovie, // Preserve original fields
            ...updatedMovie, // Merge with updated fields
          };

      const response = await axios.put(`${url}/${movieId}`, movieToUpdate, {
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchMovieList();
      // Update the movie list after editing
    //   setMovieList((prevMovies) =>
    //     prevMovies.map((movie) => (movie.movieId === movieId ? response.data : movie))
    //   );

      setEditingMovie(null);
      setUpdatedMovie({});
    } catch (error) {
      console.error("Error updating movie:", error);
    }
  };

  return (
    <div className="p-4 border rounded">
      <h3 className="text-primary mb-4">Manage Movies</h3>

      {/* Movie List Table */}
      <table className="table table-bordered table-hover">
        <thead className="table-dark text-center">
          <tr>
            <th>Title</th>
            <th>Poster</th>
            <th>Backdrop</th>
            <th>Release Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {movie_list.map((movie) => (
            <tr key={movie.movieId}>
              <td className="align-middle">{movie.title}</td>
              <td className="text-center align-middle">
                <img src={movie.poster_path} alt="poster" style={{ width: "50px", height: "50px" }} />
              </td>
              <td className="text-center align-middle">
                <img src={movie.backdrop} alt="backdrop" style={{ width: "50px", height: "50px" }} />
              </td>
              <td className="text-center align-middle">{movie.releaseDate}</td>
              <td className="text-center align-middle">
                <button className="btn btn-warning btn-sm me-2" onClick={() => setEditingMovie(movie)}>
                  Edit
                </button>
                <button className="btn btn-danger btn-sm" onClick={(e) => handleDelete(movie.movieId,e)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Movie Form (Shows When Edit is Clicked) */}
      {editingMovie && (
        <div className="mt-4 p-3 border rounded bg-light">
          <h4>Edit Movie</h4>
          <form>
            <input
              type="text"
              name="title"
              className="form-control mt-2"
              placeholder="Title"
              defaultValue={editingMovie.title}
              onChange={handleEditChange}
            />
            <input
              type="date"
              name="releaseDate"
              className="form-control mt-2"
              defaultValue={editingMovie.releaseDate}
              onChange={handleEditChange}
            />
            <input
              type="text"
              name="trailerLink"
              className="form-control mt-2"
              placeholder="Trailer Link"
              defaultValue={editingMovie.trailerLink}
              onChange={handleEditChange}
            />
            <input
              type="text"
              name="poster_path"
              className="form-control mt-2"
              placeholder="Poster URL"
              defaultValue={editingMovie.poster_path}
              onChange={handleEditChange}
            />
            <input
              type="text"
              name="backdrop"
              className="form-control mt-2"
              placeholder="Backdrop URL"
              defaultValue={editingMovie.backdrop}
              onChange={handleEditChange}
            />
            <input
              type="text"
              name="genres"
              className="form-control mt-2"
              placeholder="Genres (comma-separated)"
              defaultValue={editingMovie.genres.join(", ")}
              onChange={(e) =>
                setUpdatedMovie({
                  ...updatedMovie,
                  genres: e.target.value.split(",").map((g) => g.trim()),
                })
              }
            />
            <input
              type="text"
              name="runtime"
              className="form-control mt-2"
              placeholder="Runtime"
              defaultValue={editingMovie.runtime}
              onChange={handleEditChange}
            />
            <input
              type="text"
              name="budget"
              className="form-control mt-2"
              placeholder="Budget"
              defaultValue={editingMovie.budget}
              onChange={handleEditChange}
            />
            <input
              type="text"
              name="revenue"
              className="form-control mt-2"
              placeholder="Revenue"
              defaultValue={editingMovie.revenue}
              onChange={handleEditChange}
            />
            <textarea
              name="description"
              className="form-control mt-2"
              placeholder="Description"
              defaultValue={editingMovie.description}
              onChange={handleEditChange}
            />

            {/* Save & Cancel Buttons */}
            <div className="mt-3">
              <button className="btn btn-success me-2" onClick={(e) => handleSave(editingMovie.movieId,e)}>
                Save
              </button>
              <button className="btn btn-secondary" onClick={() => setEditingMovie(null)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
