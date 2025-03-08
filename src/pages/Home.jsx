import "./Home.css";
import { MovieCardList } from "../components/MovieCardList";
import useMovies from "../context/useMovies";
import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Hero } from "../components/Hero";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

export const Home = () => {
  const { movies, recentMovies, topMovies, loading, error } = useMovies();
  const { recommendedMovies, userDetails, preferences } = useContext(StoreContext);
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (movies.length === 0) return;
    const interval = setInterval(() => {
      nextMovie();
    }, 3000);
    return () => clearInterval(interval);
  }, [movies, index]);

  // Function to go to the next movie (slide right)
  const nextMovie = () => {
    setIndex((prevIndex) => (prevIndex + 1) % movies.length);
  };

  // Function to go to the previous movie (slide left)
  const prevMovie = () => {
    setIndex((prevIndex) => (prevIndex - 1 + movies.length) % movies.length);
  };

  // Function to navigate directly via dots
  const goToMovie = (movieIndex) => {
    setIndex(movieIndex);
  };

  // Function to handle recommendation section logic
  const handleRecommendationSection = () => {
    if (!userDetails) {
      // User is not logged in
      return (
        <div className="text-center text-white p-4">
          <p>To get recommendations, sign in.</p>
        </div>
      );
    } else if (preferences.length === 0) {
      // User is logged in but has not selected preferences
      return (
        <div className="text-center text-white p-4">
          <p>Please select your preferences to get recommendations.</p>
          <button className="btn btn-dark" onClick={() => navigate("profile")}>
        Select Preferences
          </button>
        </div>
      );
    } else {
      // User is logged in and has selected preferences
      return <MovieCardList movies={recommendedMovies} />;
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="home">
      {/* 🎬 HERO SECTION */}
      <div className="hero-container">
        <div className="slider-container">
          <div className="slider" style={{ transform: `translateX(-${index * 100}%)` }}>
            {movies.map((movie, movieIndex) => (
              <Hero key={movie.movieId} movie={movie} isActive={movieIndex === index} />
            ))}
          </div>
        </div>

        {/* Manual Navigation Buttons */}
        <button className="arrow-btn left-arrow" onClick={prevMovie}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button className="arrow-btn right-arrow" onClick={nextMovie}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>

        {/* Navigation Dots */}
        <div className="nav-dots">
          {movies.map((_, movieIndex) => (
            <span
              key={movieIndex}
              className={`dot ${movieIndex === index ? "active-dot" : ""}`}
              onClick={() => goToMovie(movieIndex)}
            ></span>
          ))}
        </div>
      </div>

      {/* RECENTLY RELEASED SECTION */}
      <div className="top-movies">
        <h2 className="section-title">
          <span className="top-picks">| Recently Released </span>
        </h2>
        <p className="section-subtitle">Recently Released Movies just for you</p>
        <MovieCardList movies={recentMovies} />
      </div>

      {/* TOP PICKS SECTION */}
      <div className="top-movies">
        <h2 className="section-title">
          <span className="top-picks">| Top Picks </span>
        </h2>
        <p className="section-subtitle">Top Movies just for you</p>
        <MovieCardList movies={topMovies} />
      </div>

      {/* RECOMMENDED MOVIES SECTION */}
      <div className="recommended-movies">
        <h2 className="section-title">
          <span className="top-picks">| Recommended Movies </span>
        </h2>
        <p className="section-subtitle">Recommended Movies just for you</p>
        {handleRecommendationSection()}
      </div>
    </div>
  );
};