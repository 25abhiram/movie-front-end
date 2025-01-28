import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import backup from "../assets/backup.jpg";
import { FaStar } from "react-icons/fa"; // Import for star icons

export const MovieDetails = () => {
  const params = useParams();
  const [movie, setMovie] = useState([]);
  const [rating, setRating] = useState(0); // State for the star rating
  const [hover, setHover] = useState(0); // State for hover effect on stars
  const [reviewText, setReviewText] = useState(""); // State for review input
  const key = import.meta.env.VITE_API_KEY;
  const url = `https://api.themoviedb.org/3/movie/${params.id}?api_key=${key}`;
  const image = movie.poster_path
    ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
    : backup;

  useEffect(() => {
    async function fetchMovies() {
      fetch(url)
        .then((res) => res.json())
        .then((jsonData) => setMovie(jsonData));
    }
    fetchMovies();
  }, []);

  useEffect(() => {
    document.title = `${movie.title}`;
  });
  return (
    <main className="container">
      <h5 className="text-danger py-2 border-bottom mb-3">{movie.title}</h5>
      <div className="row">
        <div className="col-md-4">
          <img src={image} className="img-fluid img-thumbnail" />
        </div>
        <div className="col-md-8">
          <h3 className="text-primary">{movie.title}</h3>
          <p className="mt-3">{movie.overview}</p>
          {movie.genres ? (
            <p className="d-flex gap-3">
              {movie.genres.map((genre) => (
                <span key={genre.id} className="badge bg-danger">
                  {genre.name}
                </span>
              ))}
            </p>
          ) : (
            ""
          )}
          <p className="mt-2">
            <i className="bi bi-star-fill text-warning"></i>{" "}
            {movie.vote_average} |{" "}
            <i className="bi bi-people-fill text-success"></i>{" "}
            {movie.vote_count} reviews
          </p>
          <table className="table table-bordered w-50 met-2">
            <tbody>
              <tr>
                <th>Runtime</th>
                <td>{movie.runtime}</td>
              </tr>
              <tr>
                <th>Budget</th>
                <td>{movie.budget}</td>
              </tr>
              <tr>
                <th>Revenue</th>
                <td>{movie.revenue}</td>
              </tr>
              <tr>
                <th>Release Date</th>
                <td>{movie.release_date}</td>
              </tr>
            </tbody>
          </table>
          <a
            className="btn btn-warning"
            target="_blank"
            href={`https://www.imdb.com/title/${movie.imdb_id}/`}
          >
            View in IMDB
          </a>

          {/* Rating and Review Section */}
          <div className="mt-4">
            <h5>Rate this Movie:</h5>
            <div>
              {[...Array(5)].map((_, index) => {
                const starValue = index + 1;
                return (
                  <FaStar
                    key={index}
                    size={30}
                    color={
                      starValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                    }
                    style={{ cursor: "pointer" }}
                    onClick={() => setRating(starValue)}
                    onMouseEnter={() => setHover(starValue)}
                    onMouseLeave={() => setHover(0)}
                  />
                );
              })}
            </div>
            <textarea
              className="form-control mt-3"
              rows="3"
              placeholder="Write your review..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            ></textarea>

            {/* Reset and Submit Buttons */}
            <div>
              <button
                className="btn btn-secondary mt-3 me-2" // Reset Button
                onClick={() => {
                  setRating(0);
                  setReviewText("");
                }}
              >
                Reset
              </button>
              <button
                className="btn btn-primary mt-3"
                onClick={() => {
                  if (rating > 0 && reviewText.trim() !== "") {
                    alert(`Rating: ${rating}\nReview: ${reviewText}`);
                    setRating(0);
                    setReviewText("");
                  } else {
                    alert("Please provide a rating and a review!");
                  }
                }}
                disabled={rating === 0 || reviewText.trim() === ""}
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
