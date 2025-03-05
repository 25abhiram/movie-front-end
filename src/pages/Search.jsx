import { useSearchParams } from "react-router-dom";
import { searchUseFetch } from "../hooks/searchUseFetch";
import { useEffect } from "react";
import { Card } from "../components/Card";

export const Search = ({ apiBasePath }) => { // Correct parameter name (apiBasePath)
  const [searchParams] = useSearchParams();
  const queryTerm = searchParams.get("q");
  const searchType = searchParams.get("type"); // Get search type (title, genre, rating)

  // Fetch movies based on search type and query
  const { data: movies, loading } = searchUseFetch(apiBasePath, searchType, queryTerm);

  useEffect(() => {
    document.title = queryTerm ? `Search results for ${queryTerm}` : "Search Movies";
  }, [queryTerm]);

  return (
    <main className="container">
      <h5 className="text-danger py-2 border-bottom">
        {loading
          ? "Loading..."
          : !queryTerm || !searchType
          ? "Please select a search type and enter a query."
          : movies.length === 0
          ? `No results found for "${queryTerm}"`
          : `Results for "${queryTerm}" (${searchType})`}
      </h5>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3 py-2">
        {movies.length > 0 ? (
          movies.map((movie) => <Card key={movie.id} movie={movie} />)
        ) : (
          !loading && <p className="text-center text-muted">Try a different search term.</p>
        )}
      </div>
    </main>
  );
};
