import './App.css';
import { Link } from "react-router-dom";

function Navbar(props){
    return (
      <div className="Navbar">
        <Link to="/" className="NavLink" href="#" underline="none">Home</Link>
        <Link to="#mint" className="NavLink" href="#" underline="none">Mint</Link>
        <Link to="/viewer" className="NavLink" href="#" underline="none">View</Link>
        <Link to="#about" className="NavLink" href="#" underline="none">About</Link>
      </div>
    )
  }
export default Navbar;