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
      loadWatchlistData();
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

  useEffect(() => {
    console.log(watchlistMovies);
    console.log(movie_list);
    console.log(userDetails);
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
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
