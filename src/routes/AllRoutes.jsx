import { Route, Routes } from "react-router-dom";
import { MovieDetails, MovieList, Search } from "../pages";

const AllRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<MovieList title="Your Guide to Great Movies" apiPath="movie/now_playing"/>} />
                <Route path="movies/all" element={<MovieList title="All Movies" apiPath="movie/popular"/>} />
                <Route path="movies/upcoming" element={<MovieList title="Upcoming Movies" apiPath="movie/upcoming"/>} />
                <Route path="movies/recommended" element={<MovieList title="Recommended movies" apiPath="movie/top_rated"/>} />
                <Route path="movies/theatre" element={<MovieList title="Theatre Availability" />} />
                <Route path="movie/:id" element={<MovieDetails/>}/>
                <Route path="search" element={<Search apiPath="search/movie"/>}/>
            </Routes>
        </>
    );
};

export default AllRoutes