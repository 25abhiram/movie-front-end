import React, { createContext, useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [token, setToken] = useState("");
  const [watchlistMovies, setWatchlistMovies] = useState({});
  const url = "http://localhost:8080";
  const [movie_list, setMovieList] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const [preferences, setPreferences] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);

  const fetchMovieList = async () => {
    const response = await axios.get(url + "/api/v1/movies/all");
    setMovieList(response.data);
  };
  //   const { data: movie_list } = useFetch("movies/all");

  const loadWatchlistData = async () => {
    if (!token || !userDetails?.userId) return; // Ensure user is logged in

    try {
      const response = await axios.get(
        `${url}/api/users/${userDetails?.userId}/watchlist`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send JWT Token
            "Content-Type": "application/json",
          },
        }
      );

      setWatchlistMovies(
        response.data.reduce((acc, movie) => {
          acc[movie.movieId] = true;
          return acc;
        }, {})
      );
      console.log("Watchlist loaded from backend:", response.data);
    } catch (error) {
      console.error("Error fetching watchlist:", error);
    }
  };

  const loadUserPreferences = async () => {
    if (!token || !userDetails?.userId) return; // Ensure user is logged in

    try {
      const response = await axios.get(
        `${url}/api/users/${userDetails?.userId}/preferences`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setPreferences(response.data || []); // Load preferences
    } catch (error) {
      console.error("Error fetching user preferences:", error);
      setPreferences([]); // Default to an empty array if an error occurs
    }
  };

  const loadRecommendedMovies = async () => {
    if (!token || !userDetails?.userId) return; // Ensure user is logged in

    try {
      const response = await axios.get(
        `${url}/api/recommendations/${userDetails?.userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setRecommendedMovies(response.data || []); // Load recommended movies
    } catch (error) {
      console.error("Error fetching recommended movies:", error);
      setRecommendedMovies([]); // Default to an empty array if an error occurs
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchMovieList();

      // Load token from localStorage
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
      }

      // Load user details
      if (localStorage.getItem("userDetails")) {
        setUserDetails(JSON.parse(localStorage.getItem("userDetails")));
      }

      // Load watchlist data
      // if (token && userDetails) {
      //   await loadWatchlistData();
      // }

      // if (localStorage.getItem("watchlistMovies")) {
      //   setWatchlistMovies(JSON.parse(localStorage.getItem("watchlistMovies")));
      // }
    }
    loadData();
  }, []);

  useEffect(() => {
    if (token && userDetails?.userId) {
      loadUserPreferences(); // Load preferences when user logs in
      loadWatchlistData(); // Load watchlist when user logs in
      loadRecommendedMovies(); // Load recommended movies when user logs in
    }
  }, [token, userDetails]);

  const addToWatchlist = async (movieId) => {
    setWatchlistMovies((prev) => ({ ...prev, [movieId]: true }));
    localStorage.setItem(
      "watchlistMovies",
      JSON.stringify({ ...watchlistMovies, [movieId]: true })
    );
    if (token) {
      // await axios.put(url + `/api/users/${userDetails?.userId}/watchlist/${movieId}`);
      try {
        await axios.put(
          `${url}/api/users/${userDetails?.userId}/watchlist/${movieId}`,
          {}, // Empty request body
          {
            headers: {
              Authorization: `Bearer ${token}`, // Send JWT Token
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Movie added to watchlist!");
      } catch (error) {
        console.error("Error adding movie to watchlist:", error);
      }
    }
  };

  const removeFromWatchlist = async (movieId) => {
    const updatedWatchlist = { ...watchlistMovies };
    delete updatedWatchlist[movieId]; // Remove the movie from watchlist

    setWatchlistMovies(updatedWatchlist);
    localStorage.setItem("watchlistMovies", JSON.stringify(updatedWatchlist));

    if (token) {
      try {
        await axios.delete(
          `${url}/api/users/${userDetails?.userId}/watchlist/${movieId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Send JWT Token
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Movie removed from watchlist!");
      } catch (error) {
        console.error("Error removing movie from watchlist:", error);
      }
    }
  };

  const updatePreferences = async (newPreferences) => {
    try {
      const response = await axios.put(
        `${url}/api/users/${userDetails?.userId}/preferences`,
        newPreferences, // Send new preferences
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setPreferences(response.data.preferences); // Update preferences
    } catch (error) {
      console.error("Error updating preferences:", error);
    }
  };

  useEffect(() => {
    console.log(watchlistMovies);
    console.log(movie_list);
    console.log(userDetails);
    console.log(preferences);
  }, [watchlistMovies, movie_list, userDetails]);

  const contextValue = {
    token,
    setToken,
    watchlistMovies,
    setWatchlistMovies,
    addToWatchlist,
    removeFromWatchlist,
    movie_list,
    setMovieList,
    userDetails,
    setUserDetails,
    fetchMovieList,
    preferences,
    setPreferences,
    loadUserPreferences,
    updatePreferences,
    recommendedMovies,
    loadRecommendedMovies,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
