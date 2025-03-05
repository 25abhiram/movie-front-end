import { Link } from "react-router-dom";
import backup from "../assets/backup.jpg";
import "./Hero.css";

export const Hero = ({ movie }) => {
  return (
    <div>
      <div
        className="hero-section"
        style={{
          backgroundImage: `url(${movie?.poster_path || backup})`,
        }}
      >
        
        <div className="container">
        <div
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
         <Link to={`/movie/${movie?.movieId}`} className="hero-link">

          {/* 🎬 Hero Movie Card Component */}
          <div className="hero-movie-card">
            <img
              src={movie?.poster_path || backup}
              alt={movie?.title}
              className="hero-movie-poster"
            />
          </div>
          </Link>
        </div>
        </div>
      </div>
      </div>
  );
};
