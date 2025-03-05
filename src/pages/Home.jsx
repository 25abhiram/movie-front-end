import "./Home.css"; // Import CSS for animations
import useMovies from "../context/useMovies"; // Import custom hook
import { useContext } from "react";
import { StoreContext } from "../context/StoreContext"; // Import StoreContext
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import { Hero } from "../components/Hero";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";



export const Home = () => {
  const { movies, recentMovies, topMovies, loading, error } = useMovies();
  const { recommendedMovies } = useContext(StoreContext); // Access recommendedMovies from StoreContext
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);


  useEffect(() => {
    if (movies.length === 0) return;
    const interval = setInterval(() => {
      nextMovie();
    }, 3000);
    return () => clearInterval(interval);
  }, [movies, index]);

  // ✅ Function to go to the next movie (slide right)
  const nextMovie = () => {
    setIndex((prevIndex) => (prevIndex + 1) % movies.length);
  };

  // ✅ Function to go to the previous movie (slide left)
  const prevMovie = () => {
    setIndex((prevIndex) => (prevIndex - 1 + movies.length) % movies.length);
  };

  // ✅ Function to navigate directly via dots
  const goToMovie = (movieIndex) => {
    setIndex(movieIndex);
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



     
    </div>
  );
};
