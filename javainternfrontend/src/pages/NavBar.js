import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function NavBar() {

    const handleLogout = ()=>{
        if(window.confirm("Are you sure you want to logout?")){
            <Link to={"/"}>
            </Link>
        }else{
            <Link to={"/getAll"}>
            </Link>

        }
    }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/getAll">
          Pharmaceutical Inventory
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/getAll">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/services">
                All Users
              </Link>
            </li>
            
          </ul>
        </div>
      </div>
      <div> 
        <Link to={"/"}> 
        <button class="btn btn-outline-dark" onClick={handleLogout} style={{marginRight: 15}}>Logout</button>
        </Link>
      </div>
    </nav>
  );
}
