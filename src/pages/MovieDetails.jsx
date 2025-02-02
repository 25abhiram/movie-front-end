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
  const url = `http://localhost:8080/api/v1/movies/${params.id}`;
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

  const handleSubmitReview = async () => {
    if (rating > 0 && reviewText.trim() !== "") {
      try {
        // Prepare request payload
        const reviewData = {
          movieId: params.id, // Get movie ID from URL params
          rating: rating,
          reviewText: reviewText,
        };

        // Send POST request using fetch
        const response = await fetch(
          "http://localhost:8080/api/v1/reviews/create",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(reviewData), // Convert JavaScript object to JSON
          }
        );

        // Check response status
        if (response.ok) {
          alert("Review submitted successfully!");
        } else {
          alert("Failed to submit review.");
        }

        // Reset the form after submission
        setRating(0);
        setReviewText("");
      } catch (error) {
        console.error("Error submitting review:", error);
        alert("An error occurred while submitting your review.");
      }
    } else {
      alert("Please provide a rating and a review!");
    }
  };

  return (
    <main className="container">
      <h5 className="text-danger py-2 border-bottom mb-3">{movie.title}</h5>
      <div className="row">
        <div className="col-md-4">
          <img src={image} className="img-fluid img-thumbnail" />
        </div>
        <div className="col-md-8">
          <h3 className="text-primary">{movie.title}</h3>
          <p className="mt-3">{movie.description}</p>
          {movie.genres ? (
            <p className="d-flex gap-3">
              {movie.genres.map((genre,index) => (
                <span key={index} className="badge bg-danger">
                  {genre}
                </span>
              ))}
            </p>
          ) : (
            ""
          )}
          <p className="mt-2">
            <i className="bi bi-star-fill text-warning"></i>{" "}
            {movie.averageRating} |{" "}
            <i className="bi bi-people-fill text-success"></i>{" "}
            {movie.reviewIds.length} reviews
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
                <td>{movie.releaseDate}</td>
              </tr>
            </tbody>
          </table>
          <a
            className="btn btn-warning"
            target="_blank"
            href={`${movie.trailerLink}`}
          >
            View Trailer
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
                onClick={handleSubmitReview}
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
