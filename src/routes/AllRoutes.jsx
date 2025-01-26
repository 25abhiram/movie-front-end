import { Route, Routes } from "react-router-dom";
import { MovieList } from "../pages";

const AllRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<MovieList title="Your Guide to Great Movies" />} />
                <Route path="movies/all" element={<MovieList title="All Movies" />} />
                <Route path="movies/upcoming" element={<MovieList title="Upcoming Movies" />} />
                <Route path="movies/recommended" element={<MovieList title="Recommended movies" />} />
                <Route path="movies/theatre" element={<MovieList title="Theatre Availability" />} />
            </Routes>
        </>
    );
};

export default AllRoutes