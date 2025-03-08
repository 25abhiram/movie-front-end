import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";

export const TheatreManagement = () => {
  const { token } = useContext(StoreContext);
  const [theatreList, setTheatreList] = useState([]);
  const [editingTheatre, setEditingTheatre] = useState(null); // Store the theatre being edited
  const [updatedTheatre, setUpdatedTheatre] = useState({}); // Store updated theatre details

  const url = "http://localhost:8080/api/theatres";

  // Fetch theatres on component mount
  useEffect(() => {
    fetchTheatreList();
  }, []);

  const fetchTheatreList = async () => {
    try {
      const response = await axios.get(url);
      setTheatreList(response.data);
    } catch (error) {
      console.error("Error fetching theatres:", error);
    }
  };

  // Handle input change for editing
  const handleEditChange = (e) => {
    setUpdatedTheatre({ ...updatedTheatre, [e.target.name]: e.target.value });
  };

  // Handle delete theatre
  const handleDelete = async (theatreId, e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete this theatre?")) {
      try {
        await axios.delete(`${url}/${theatreId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        fetchTheatreList(); // Refresh list after deletion
      } catch (error) {
        console.error("Error deleting theatre:", error);
      }
    }
  };

  // Handle save after editing
  const handleSave = async (theatreId, e) => {
    e.preventDefault();
    try {
      const theatreToUpdate = {
        ...editingTheatre, // Preserve original fields
        ...updatedTheatre, // Merge with updated fields
      };

      await axios.put(`${url}/${theatreId}`, theatreToUpdate, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
         },
      });

      fetchTheatreList(); // Refresh list after updating
      setEditingTheatre(null);
      setUpdatedTheatre({});
    } catch (error) {
      console.error("Error updating theatre:", error);
    }
  };

  return (
    <div className="p-4 border rounded">
      <h3 className="text-primary">Manage Theatres</h3>

      {/* Theatre List Table */}
      <table className="table table-bordered mt-3">
        <thead className="table-dark">
          <tr>
            <th className="text-center">Name</th>
            <th className="text-center">Location</th>
            <th className="text-center">Movie ID</th>
            <th className="text-center">Showtimes</th>
            <th className="text-center">Start Date</th>
            <th className="text-center">End Date</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {theatreList.map((theatre) => (
            <tr key={theatre.theatreId}>
              <td className="align-middle">{theatre.theatreName}</td>
              <td className="text-center align-middle">
                <a
                  href={theatre.location}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="View Location on Map"
                >
                  <i className="bi bi-geo-alt-fill text-primary fs-4"></i>
                </a>
              </td>
              <td className="text-center align-middle">{theatre.movieId}</td>
              <td className="text-center align-middle">
                <ul className="list-unstyled m-0">
                  {theatre.showtimes.map((time, index) => (
                    <li key={index}>{time}</li>
                  ))}
                </ul>
              </td>
              <td className="text-center align-middle">{theatre.startDate}</td>
              <td className="text-center align-middle">{theatre.endDate}</td>
              <td className="text-center align-middle">
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => setEditingTheatre(theatre)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={(e) => handleDelete(theatre.theatreId, e)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Theatre Form (Shows When Edit is Clicked) */}
      {editingTheatre && (
        <div className="mt-4 p-3 border rounded bg-light">
          <h4>Edit Theatre</h4>
          <form>
            <input
              type="text"
              name="theatreName"
              className="form-control mt-2"
              placeholder="Theatre Name"
              defaultValue={editingTheatre.theatreName}
              onChange={handleEditChange}
            />
            <input
              type="text"
              name="location"
              className="form-control mt-2"
              placeholder="Location"
              defaultValue={editingTheatre.location}
              onChange={handleEditChange}
            />
            <input
              type="text"
              name="movieId"
              className="form-control mt-2"
              placeholder="Movie ID"
              defaultValue={editingTheatre.movieId}
              onChange={handleEditChange}
            />
            <input
              type="text"
              name="showtimes"
              className="form-control mt-2"
              placeholder="Showtimes (comma-separated)"
              defaultValue={editingTheatre.showtimes.join(", ")}
              onChange={(e) =>
                setUpdatedTheatre({
                  ...updatedTheatre,
                  showtimes: e.target.value.split(",").map((g) => g.trim()),
                })
              }
            />
            <input
              type="date"
              name="startDate"
              className="form-control mt-2"
              defaultValue={editingTheatre.startDate}
              onChange={handleEditChange}
            />
            <input
              type="date"
              name="endDate"
              className="form-control mt-2"
              defaultValue={editingTheatre.endDate}
              onChange={handleEditChange}
            />

            {/* Save & Cancel Buttons */}
            <div className="mt-3">
              <button
                className="btn btn-success me-2"
                onClick={(e) => handleSave(editingTheatre.theatreId, e)}
              >
                Save
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setEditingTheatre(null)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
