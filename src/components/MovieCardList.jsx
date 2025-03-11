import React from "react";
import {MovieCard} from "./MovieCard";
import "./MovieCardList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

export const MovieCardList = ({ movies,setShowLogin }) => {
  const scrollLeft = () => {
    document.getElementById("movie-container").scrollLeft -= 300;
  };

  const scrollRight = () => {
    document.getElementById("movie-container").scrollLeft += 300;
  };

  return (
    <div className="movie-list">
      {/* Scroll Left Button */}
      <button className="scroll-btn left" onClick={scrollLeft}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>

      {/* Movie Cards Container */}
      <div className="movie-container" id="movie-container">
        {movies.map((movie) => (
          <MovieCard key={movie.movieId} movie={movie} setShowLogin={setShowLogin} />
        ))}
      </div>

      {/* Scroll Right Button */}
      <button className="scroll-btn right" onClick={scrollRight}>
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
};


