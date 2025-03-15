import { useContext } from "react";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom"
import { StoreContext } from "../context/StoreContext";
import { FaSearch } from "react-icons/fa"; // Import FontAwesome Search Icon
import './Header.css'

export const Header = ({setShowLogin}) => {
const {token,setToken,userDetails,setUserDetails}=useContext(StoreContext);

  const navigator = useNavigate();
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState(""); // Search Type Selection

  const logout=()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("userDetails");
    setToken("");
    setUserDetails(null);
    navigator("/");
  }

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() && searchType) {
      navigator(`/search?type=${searchType}&q=${query}`);
      setQuery(""); // Reset input field
      //setSearchType(""); // Reset search type
    }
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
            <li className="nav-item"><NavLink to="/theatre" className="nav-link">Theatre</NavLink></li>
            <li className="nav-item"><NavLink to="/about-us" className="nav-link">About us</NavLink></li>
          </ul>
          {/* Search Form with Dropdown */}
          <form onSubmit={handleSearch} className="search-form">
            <select
              className="search-select"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
            >
              <option value="">select</option>
              <option value="title">Title</option>
              <option value="genre">Genre</option>
              <option value="averageRating">Rating</option>
            </select>
            <input
              type="search"
              className="form-control search-input"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={!searchType}
            />
            <button type="submit" className={`search-button ${query.trim() && searchType ? "active" : ""}`} disabled={!query.trim() || !searchType}>
              <FaSearch />
            </button>
          </form>
         
          {/* Show Admin Panel if user is admin*/}
          {token && userDetails?.roles.includes("ROLE_ADMIN") && (
            <NavLink to="/admin" className="btn btn-warning ms-3">Admin</NavLink>
          )} 

          {!token?<button className="btn ms-3 btn-outline-light" onClick={()=>setShowLogin(true)}>sign in</button>
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

