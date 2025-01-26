import { Route, Routes } from "react-router-dom";
import { MovieList } from "../pages";

const AllRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<MovieList/>} />
            </Routes>
        </>
    );
};

export default AllRoutes