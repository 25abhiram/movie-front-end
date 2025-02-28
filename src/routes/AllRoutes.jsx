import { Route, Routes } from "react-router-dom";
import { AdminPage, AllMovies, MovieDetails, MovieList, PageNotFound, Search, Watchlist } from "../pages";

const AllRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<MovieList title="Your Guide to Great Movies" apiPath="movie/now_playing" />} />
                <Route path="movies/all" element={<AllMovies title="All Movies" apiPath="movies/all" />} />
                <Route path="movies/upcoming" element={<MovieList title="Upcoming Movies" apiPath="movie/upcoming" />} />
                <Route path="movies/recommended" element={<MovieList title="Recommended movies" apiPath="movie/top_rated" />} />
                <Route path="movies/theatre" element={<MovieList title="Theatre Availability" />} />
                <Route path="movie/:id" element={<MovieDetails />} />
                <Route path="search" element={<Search apiPath="search/movie" />} />
                <Route path="watchlist" element={<Watchlist/>}/>
                <Route path="admin" element={<AdminPage/>}/>
                <Route path="*" element={<PageNotFound />} title="page not found" />
            </Routes>
        </>
    );
};

export default AllRoutes