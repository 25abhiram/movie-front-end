import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay, faPlus } from "@fortawesome/free-solid-svg-icons";
import "./MovieCard.css"; // CSS file for styling
import backup from "../assets/backup.jpg";
import { StoreContext } from "../context/StoreContext";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  const params = useParams();
  const url = `http://localhost:8080/api/v1/movies/${params.id}`;

const {
    watchlistMovies,
    addToWatchlist,
    removeFromWatchlist,
  } = useContext(StoreContext);
  const fetchMovies = async () => {
    try {
      const response = await axios.get(url);
      setMovie(response.data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);


  return (
    <div className="movie-card">
      {/* Movie Poster */}
      <div className="poster-container">
      <Link to={`/movie/${movie?.movieId}`} className="hero-link">
        <img src={movie.poster_path || backup} alt={movie.title} className="movie-poster" />
      </Link>
        {/* Add to Watchlist Button */}
        <button className="watchlist-btn">
          <FontAwesomeIcon icon={faPlus} />
        </button>
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
        <button className="watchlist">
          <FontAwesomeIcon icon={faPlus} /> Watchlist
        </button>


        {/* {!watchlistMovies[params.id] ? (
            <button className="watchlist"
              onClick={() => addToWatchlist(params.id)}
            >
              <FontAwesomeIcon icon={faPlus} /> Add Watchlist
            </button>
          ) : (
            <button
              onClick={() => removeFromWatchlist(params.id)}
              className="watchlist"
            >
              Remove Watchlist
            </button>
          )} */}

        {/* Trailer Button */}
        
        <Link to={`${movie.trailerLink}`} className="trailer-btn">
          <FontAwesomeIcon icon={faCirclePlay} /> Trailer
        </Link>
      </div>
    </div>
  );
};

