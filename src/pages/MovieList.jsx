import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

export const MovieList = ({ title }) => {
  useEffect(() => {
    document.title = title;
  });
  const navigator=useNavigate();
  return (
    <div>
      <main className="container">
        {title == "Your Guide to Great Movies" ?
          (<div className="bg-body-tertiary p-5 border mb-5">
            <h3 className="text-primary">Welcome to CineHolic</h3>
            <p className="lead">Discover movies you&apos;ll love with personalized suggestions, curated collections, and quick searches - your guide to finding great films</p>
            <button className="btn btn-primary" onClick={()=>{navigator("/movies/upcoming")}}>Explore Now</button>
          </div>) : ("")}
        <h5 className="text-danger py-2 border-bottom">{title}</h5>
      </main>
    </div>
  )
}

