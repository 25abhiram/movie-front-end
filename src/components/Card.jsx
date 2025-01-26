import { Link } from "react-router-dom";
import backup from "../assets/backup.jpg";
export const Card = () => {
  return (
    <div className="col">
      <div className="card shadow-sm">
      <img src={backup} alt="" className="card-img-top"/>

        <div className="card-body">
          <h5 className="card-title text-primary">Movie Title</h5>
          <p className="card-text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur similique laboriosam magni, distinctio dolores error!</p>
          <div className="d-flex justify-content-between align-items-center">
            <Link to="" className="btn btn-sm btn-outline-primary">Read More</Link>
            <small>
              <i className="bi bi-star-fill text-warning"></i>
              7.25 | 250 review
            </small>
          </div>
        </div>
      </div>
    </div>
  )
}

