import { NavLink, useNavigate } from "react-router-dom"

export const Header = () => {
  const navigator=useNavigate();
  const handleSearch=(e)=>{
    e.preventDefault();
    const queryTerm=e.target.search.value;
    e.target.reset();
    return navigator(`/search?q=${queryTerm}`);
  };
  return (
    <nav className="navbar navbar-expand-md fixed-top bg-primary navbar-dark">
      <div className="container-fluid">
        <NavLink to="/" className="navbar-brand">
          <i className="bi bi-film"></i> CineHolic
        </NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menu">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="menu">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item"><NavLink to="/" className="nav-link">Home</NavLink></li>
            <li className="nav-item"><NavLink to="/movies/all" className="nav-link">Movies</NavLink></li>
            <li className="nav-item"><NavLink to="/movies/upcoming" className="nav-link">Upcoming</NavLink></li>
            <li className="nav-item"><NavLink to="/movies/recommended" className="nav-link">Recommended
            </NavLink></li>
            <li className="nav-item"><NavLink to="/movies/theatre" className="nav-link">Theatre</NavLink></li>
          </ul>
          <form onSubmit={handleSearch}>
            <input type="search" className="form-control" placeholder="search" name="search"/>
          </form>
        </div>
      </div>
    </nav>
  )
}

