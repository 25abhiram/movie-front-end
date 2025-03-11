import { NavLink, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import backup from "../assets/backup.jpg";
import { FaStar } from "react-icons/fa"; // Import for star icons
import { StoreContext } from "../context/StoreContext";
import axios from "axios";

export const MovieDetails = ({setShowLogin}) => {
  const params = useParams();
  const [movie, setMovie] = useState([]);
  const [rating, setRating] = useState(0); // State for the star rating
  const [hover, setHover] = useState(0); // State for hover effect on stars
  const [reviewText, setReviewText] = useState(""); // State for review input
  const [userReview, setUserReview] = useState(null); // Store user review if exists
  const [isEditing, setIsEditing] = useState(false);
  const [reviews, setReviews] = useState([]); // Store all reviews
  const url = `http://localhost:8080/api/v1/movies/${params.id}`;
  const image = movie.poster_path
    ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
    : backup;

  const {
    watchlistMovies,
    addToWatchlist,
    removeFromWatchlist,
    userDetails,
    token,
  } = useContext(StoreContext);

  // Fetch movie details
  // useEffect(() => {
  //   async function fetchMovies() {
  //     fetch(url)
  //       .then((res) => res.json())
  //       .then((jsonData) => setMovie(jsonData));
  //   }
  //   fetchMovies();
  // }, []);
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

  useEffect(() => {
    document.title = `${movie.title}`;
  });

  // Fetch user review if exists
  useEffect(() => {
    if (userDetails?.userId && token) {
      axios
        .get(
          `http://localhost:8080/api/v1/reviews/${params.id}/${userDetails.userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include JWT token
            },
          }
        )
        .then((response) => {
          setUserReview(response.data);
          setRating(response.data.rating);
          setReviewText(response.data.reviewText);
        })
        .catch(() => {
          setUserReview(null);
        });
    }
  }, [userDetails, params.id, token]);

  // fetch all reviews
  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/reviews/movie/${params.id}`
        );
        setReviews(response.data); //  Store reviews in state
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setReviews([]); // If no reviews, set an empty array
      }
    }
    fetchReviews();
  }, [params.id]); // Fetch when movie ID changes

  // Handle Review Submission (Create or Update)
  const handleSubmitReview = async () => {
    if (rating > 0 && reviewText.trim() !== "") {
      try {
        // Prepare request payload
        const reviewData = {
          movieId: params.id, // Get movie ID from URL params
          userId: userDetails?.userId,
          username: userDetails?.username,
          rating: rating,
          reviewText: reviewText,
        };

        // Send POST request using fetch
        // const response = await fetch(
        //   "http://localhost:8080/api/v1/reviews/create",
        //   {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(reviewData), // Convert JavaScript object to JSON
        //   }
        // );
        const endpoint = userReview
          ? `http://localhost:8080/api/v1/reviews/${userReview.reviewId}`
          : "http://localhost:8080/api/v1/reviews/create";

        const method = userReview ? "PUT" : "POST";

        const response = await axios({
          method: method,
          url: endpoint,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          data: reviewData,
        });

        // Check response status
        // if (response.ok) {
        //   alert("Review submitted successfully!");
        // } else {
        //   alert("Failed to submit review.");
        // }
        alert(
          userReview
            ? "Review updated successfully!"
            : "Review submitted successfully!"
        );
        setUserReview(response.data);
        setIsEditing(false);
        fetchMovies();

        // Update reviews state dynamically without reloading
        setReviews((prevReviews) => {
          if (userReview) {
            return prevReviews.map((review) =>
              review.reviewId === response.data.reviewId
                ? response.data
                : review
            );
          } else {
            return [...prevReviews, response.data];
          }
        });
      } catch (error) {
        console.error("Error submitting review:", error);
        alert("An error occurred while submitting your review.");
      }
    } else {
      alert("Please provide a rating and a review!");
    }
  };

  // Handle Review Deletion
  const handleDeleteReview = async () => {
    try {
      await axios.delete(
        `http://localhost:8080/api/v1/reviews/${userReview.reviewId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Review deleted successfully!");
      // Remove deleted review from state
      setReviews((prevReviews) =>
        prevReviews.filter((review) => review.reviewId !== userReview.reviewId)
      );
      setUserReview(null);
      setRating(0);
      setReviewText("");
      fetchMovies();
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  // Handle Review Deletion by Admin
  const handleAdminDeleteReview = async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      await axios.delete(`http://localhost:8080/api/v1/reviews/${reviewId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Review deleted successfully!");
      // Remove deleted review from state
      setReviews((prevReviews) =>
        prevReviews.filter((review) => review.reviewId !== reviewId)
      );

      fetchMovies(); // Refresh movie details
    } catch (error) {
      console.error("Error deleting review:", error);
      alert("Error deleting review.");
    }
  };

  return (
    <main className="container">
      <h5 className="text-danger mt-3 mb-3 fs-3 border-bottom">{movie.title}</h5>
      <div className="row">
        <div className="col-md-4">
          <img src={image} className="img-fluid img-thumbnail" />
        </div>
        <div className="col-md-8">
          <h3 className="text-primary">{movie.title}</h3>
          <p className="mt-3">{movie.description}</p>
          {movie.genres ? (
            <p className="d-flex gap-3">
              {movie.genres.map((genre, index) => (
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
            {movie.reviewIds ? movie.reviewIds.length : 0} reviews
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

          {!userDetails?(
            <button
            className="btn btn-success ms-3"
            onClick={() => setShowLogin(true)} // Show login modal
          >
            Add to Watchlist
          </button>
          ):
          !watchlistMovies[params.id] ? (
            <button
              onClick={() => addToWatchlist(params.id)}
              className="btn btn-success ms-3"
            >
              Add to Watchlist
            </button>
          ) : (
            <button
              onClick={() => removeFromWatchlist(params.id)}
              className="btn btn-danger ms-3"
            >
              Remove from Watchlist
            </button>
          )}

          {/* Rating and Review Section */}
          <div className="mt-4">
            <h5>Rate this Movie:</h5>

            {!userDetails?(
              <div className="alert alert-warning">
              Please <button className="btn btn-link p-0" onClick={() => setShowLogin(true)}>sign in</button> to rate and review this movie.
            </div>
            ):
            userReview && !isEditing ? (
              <div className="bg-light p-3 rounded">
                <h6>Your Review</h6>
                <p>
                  <i className="bi bi-star-fill text-warning"></i>{" "}
                  {userReview.rating}
                </p>
                <p>{userReview.reviewText}</p>
                <button
                  className="btn btn-outline-primary me-2"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-outline-danger"
                  onClick={handleDeleteReview}
                >
                  Delete
                </button>
              </div>
            ) : (
              // Show review form when isEditing is true OR if the user has NOT posted a review yet
              <>
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

                {/* Show Reset Button if it's a new review, Cancel if editing */}
                <div>
                  {userReview ? (
                    <button
                      className="btn btn-secondary mt-3 me-2"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </button>
                  ) : (
                    <button
                      className="btn btn-secondary mt-3 me-2"
                      onClick={() => {
                        setRating(0);
                        setReviewText("");
                      }}
                    >
                      Reset
                    </button>
                  )}
                  <button
                    className="btn btn-primary mt-3"
                    onClick={handleSubmitReview}
                    disabled={rating === 0 || reviewText.trim() === ""}
                  >
                    {userReview ? "Update Review" : "Submit Review"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {/* Reviews Section */}
      <div className="mt-5">
        <h4 className="text-primary border-bottom pb-2">User Reviews</h4>

        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review.reviewId}
              className="card shadow-sm border-0 rounded-3 my-3"
            >
              <div className="card-body">
                {/* Header: User Info and Date */}
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-person-circle fs-3 text-secondary me-2"></i>
                    <div>
                      <h6 className="mb-0 text-primary">{review.username}</h6>
                      <small className="text-muted">
                        {new Date(review.timeStamp).toLocaleDateString()}
                      </small>
                    </div>
                  </div>
                  <div className="text-warning">
                    {[...Array(5)].map((_, index) => (
                      <FaStar
                        key={index}
                        size={18}
                        color={index < review.rating ? "#ffc107" : "#e4e5e9"}
                      />
                    ))}
                  </div>
                </div>

                {/* Review Text */}
                <p className="mt-3 text-dark">{review.reviewText}</p>
                {/* DELETE BUTTON (ONLY FOR ADMIN) */}
                {userDetails?.roles.includes("ROLE_ADMIN") && (
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleAdminDeleteReview(review.reviewId)}
                  >
                    Delete Review
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="alert alert-info mt-3">
            No reviews yet. Be the first to review this movie!
          </div>
        )}
      </div>
    </main>
  );
};
