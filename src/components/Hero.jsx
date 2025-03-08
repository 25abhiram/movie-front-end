import { Link } from "react-router-dom";
import { FaPlay } from "react-icons/fa"; // Import the play icon
import backup from "../assets/backup.jpg";
import "./Hero.css";

export const Hero = ({ movie }) => {
  const playTrailer = () => {
    // Logic to play the trailer
    console.log("Playing trailer for movie:", movie?.title);
    if (movie?.trailerLink) {
      window.open(movie.trailerLink, "_blank");
    }
  };

  return (
    <div>
      <div
        className="hero-section"
        style={{
          backgroundImage: `url(${movie?.poster_path || backup})`,
        }}
      >
        <div
          className="hero-movie-card"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Link to={`/movie/${movie?.movieId}`} className="hero-link">
            {/* 🎬 Hero Movie Card Component */}
            <div className="hero-movie-poster">
              <img
                src={movie?.poster_path || backup}
                alt={movie?.title}
                className="hero-movie-poster-img"
              />
            </div>
          </Link>
          {/* Play Button Inside Poster */}
          <div className="hero-play">
            <button className="play-trailer-btn" onClick={playTrailer}>
              <FaPlay className="play-icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
