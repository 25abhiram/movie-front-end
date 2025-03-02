import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Theatre = () => {
    const [theatres, setTheatres] = useState([]);
    const navigate = useNavigate();

    // Fetch theatre details from API
    useEffect(() => {
        axios.get("http://localhost:8080/api/theatres")
            .then((response) => setTheatres(response.data))
            .catch((error) => console.error("Error fetching theatres:", error));
    }, []);

    return (
        <div className="container mt-4">
            <h2 className="text-center">Theatre Available</h2>
            {theatres.length === 0 ? (
                <p className="text-center">No theatres available.</p>
            ) : (
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3 py-2">
                    {theatres.map((theatre) => (
                        <div key={theatre.theatreId} className="col-md-6 mb-4">
                            <div className="card shadow p-3">
                                <h5 className="card-title">{theatre.theatreName}</h5>
                                <p className="card-text"><strong>Location:</strong>
                                <a href={theatre.location} target="_blank">
                                <i class="bi bi-geo-alt-fill text-danger fs-3"></i>
                                    </a>
                                 </p>
                                <p className="card-text"><strong>Showtimes:</strong> {theatre.showtimes.join(", ")}</p>
                                <button 
                                    className="btn btn-primary"
                                    onClick={() => navigate(`/movie/${theatre.movieId}`)}
                                >
                                    View Movie
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};


