import React from "react";
import { Link } from "react-router-dom";
export default function Nav() {
  return (
    <div className="box-shadow">
      <nav className="navbar navbar-light nav-light">
        <Link className="navbar-brand" to="/">
          Let's Go
        </Link>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item text-dark">
            <Link className="nav-link active" to="/">
              DashBoard
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
