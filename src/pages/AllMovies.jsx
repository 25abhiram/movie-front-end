import { useContext, useEffect } from "react"
import { Card } from "../components/Card";
import { useFetch } from "../hooks/useFetch";
import { StoreContext } from "../context/StoreContext";

export const AllMovies = ({ title, apiPath }) => {
  const {movie_list}=useContext(StoreContext)

  // const { data: movies } = useFetch(apiPath);

  useEffect(() => {
    document.title = title;
  });
  return (
    <div>
      <main className="container">
        <h5 className="text-danger py-2 border-bottom">{title}</h5>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3 py-2">
          {movie_list.map((movie) => {
            return <Card key={movie.movieId} movie={movie} />;
          })}
        </div>
      </main>
    </div>
  )
}

