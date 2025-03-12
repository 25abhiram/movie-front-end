import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCirclePlay, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import "./MovieCard.css"; // CSS file for styling
import backup from "../assets/backup.jpg";
import { StoreContext } from "../context/StoreContext";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const MovieCard = ({ movie,setShowLogin }) => {

const {
  watchlistMovies,
  addToWatchlist,
  removeFromWatchlist,
  userDetails,
  token
} = useContext(StoreContext);

const handleAddToWatchlist = () => {
  if (!userDetails || !token) {
    setShowLogin(true); // Show login modal if user is not logged in
  } else {
    addToWatchlist(movie?.movieId);
  }
};


  return (
    <div className="movie-card">
      {/* Movie Poster */}
      <div className="poster-container">
      <Link to={`/movie/${movie?.movieId}`} className="hero-link">
        <img src={movie.poster_path || backup} alt={movie.title} className="movie-poster" />
      </Link>
        {/* Add to Watchlist Button */}
        {!watchlistMovies[movie?.movieId] ? (
            <button
              onClick={handleAddToWatchlist}
              className="watchlist-btn"
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          ) : (
            <button
              onClick={() => removeFromWatchlist(movie?.movieId)}
              className="remove-watchlist-btn"
            >
              <FontAwesomeIcon icon={faCheck} />
            </button>
          )}
      </div>

      {/* Movie Details */}
      <div className="movie-details">
        {/* Rating */}
        <div className="movie-rating">
          <span className="star-icon" > &#9733; </span>
          <span>{movie.averageRating || "N/A"}</span>
        </div>

        {/* Title */}
        <h4 className="movie-title">{movie.title}</h4>

        {/* Watchlist Button */}
        {!watchlistMovies[movie?.movieId] ? (
            <button
              onClick={handleAddToWatchlist}
              className="watchlist"
            >
              <FontAwesomeIcon icon={faPlus} /> Watchlist
            </button>
          ) : (
            <button
              onClick={() => removeFromWatchlist(movie?.movieId)}
              className="watchlist"
            >
              <FontAwesomeIcon icon={faMinus} /> Watchlist
            </button>
          )}

        {/* Trailer Button */}
        
        <Link to={`${movie.trailerLink}`} className="trailer-btn">
          <FontAwesomeIcon icon={faCirclePlay} /> Trailer
        </Link>
      </div>
    </div>
  );
};

