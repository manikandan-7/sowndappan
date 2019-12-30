import React from "react";
import { Link } from "react-router-dom";
const DashBoard = () => {
  return (
    <div className="dashboard row">
      <div className="col-md-7 background-img p-0"></div>
      <div className="col-md-5 p ">
        <p>Let's Go</p>
        <Link to="/book" className="btn btn-primary">
          Book
        </Link>
      </div>
    </div>
  );
};

export default DashBoard;
