import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom"
import { StoreContext } from "../context/StoreContext";
import './Header.css'

export const Header = ({setShowLogin}) => {
const {token,setToken,userDetails,setUserDetails}=useContext(StoreContext);

  const navigator = useNavigate();

  const logout=()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("userDetails");
    setToken("");
    setUserDetails(null);
    navigator("/");
  }

  const handleSearch = (e) => {
    e.preventDefault();
    const queryTerm = e.target.search.value;
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
            <li className="nav-item"><NavLink to="/theatre" className="nav-link">Theatre</NavLink></li>
          </ul>
          <form onSubmit={handleSearch}>
            <input type="search" className="form-control" placeholder="search" name="search" />
          </form>
         
          {/* Show Admin Panel if user is admin */}
          {token && userDetails?.roles.includes("ROLE_ADMIN") && (
            <NavLink to="/admin" className="btn btn-warning ms-3">Admin</NavLink>
          )}

          {!token?<button className="btn ms-3 btn-outline-light stretched-link" onClick={()=>setShowLogin(true)}>sign in</button>
          :<div className="navbar-profile">
            <i className="navbar-profile bi bi-person-circle fs-3 text-light ms-3"></i>
            <ul className="nav-profile-dropdown">
              <li><NavLink to="/profile" className="nav-link"><i className="bi bi-person-circle fs-6"></i> My Profile</NavLink></li>
              <hr />
              <li><NavLink to="/watchlist" className="nav-link"><i className="bi bi-bag fs-6"></i> My Watchlist</NavLink></li>
              <hr />
              <li onClick={logout}><i className="bi bi-box-arrow-right fs-6"></i>Logout</li>
            </ul>
            </div>}
          
        </div>
      </div>
    </nav>
  )
}

