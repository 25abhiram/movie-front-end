import notfound from "../assets/notfound.png"
import {Link} from "react-router-dom"
export const PageNotFound = () => {
  return (
    <div className="container">
      <img src={notfound} className="img-fluid" />
      <p className="text-center">
        <Link to="/" className="btn btn-danger">
        Goto Home Page
        </Link>
      </p>
    </div>
  )
}

