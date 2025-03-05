import { useState, useEffect } from "react";
import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: "http://localhost:8080", // Replace with your actual API base URL
    // 5 seconds timeout
  headers: { "Content-Type": "application/json" },
});

// Custom hook to fetch all movies, recent movies, and top movies
const useMovies = () => {
  const [movies, setMovies] = useState([]);
  const [recentMovies, setRecentMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [recommendedMovie, setRecommendedMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [allMoviesRes, recentMoviesRes, topMoviesRes] = await axios.all([
          api.get("/api/v1/movies/all"),
          api.get("/api/v1/movies/recent"),
          api.get("/api/v1/movies/top10"),
        
        ]);

        setMovies(allMoviesRes.data);
        setRecentMovies(recentMoviesRes.data);
        setTopMovies(topMoviesRes.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return { movies, recentMovies, topMovies, loading, error };
};

export default useMovies;
