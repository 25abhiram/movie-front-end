import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import { Link } from "react-router-dom";

export const Watchlist = () => {
  const { watchlistMovies, movie_list, removeFromWatchlist } =
    useContext(StoreContext);

  // useEffect(()=>{

  // },[watchlistMovies]);

  return (
    <div className="container mt-4">
      <h2 className="text-center text-primary mb-4">My Watchlist</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th scope="col" className="text-center">
                Movie
              </th>
              <th scope="col" className="text-center">
                Title
              </th>
              <th scope="col" className="text-center">
                Trailer
              </th>
              <th scope="col" className="text-center">
                Read More
              </th>
              <th scope="col" className="text-center">
                Remove
              </th>
            </tr>
          </thead>
          <tbody>
            {movie_list
              .filter((movie) => watchlistMovies[movie.movieId]) // Only show movies in the watchlist
              .map((movie) => (
                <tr key={movie.movieId}>
                  {/* Small Movie Poster */}
                  <td className="text-center align-middle">
                    <img
                      className="img-thumbnail"
                      src={movie.poster_path}
                      alt={movie.title}
                      style={{ width: "80px", height: "120px" }} // Adjust size
                    />
                  </td>
                  {/* Movie Title */}
                  <td className="text-start align-middle">{movie.title}</td>
                  {/* Trailer Link */}
                  <td className="text-center align-middle">
                    <Link
                      className="btn btn-sm btn-outline-success"
                      target="_blank"
                      to={movie.trailerLink}
                    >
                      <i className="bi bi-youtube  fs-5"></i>
                    </Link>
                  </td>
                  {/* Read More Link */}
                  <td className="text-center align-middle">
                    <Link
                      to={`/movie/${movie.movieId}`}
                      className="btn btn-sm btn-outline-primary"
                    >
                      <i className="bi bi-arrow-right-square fs-5"></i>
                    </Link>
                  </td>
                  {/* Remove from Watchlist */}
                  <td className="text-center align-middle">
                    <button
                      className="btn btn-sm btn-outline-danger fs-5"
                      onClick={() => removeFromWatchlist(movie.movieId)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
