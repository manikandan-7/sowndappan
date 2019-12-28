import React from "react";
import DashBoardContainer from "../container/dashboard.container";
const DashBoard = () => {
  return (
    <div className="background-img">
      <div class="banner-text">
        <p>Let's Go</p>
      </div>
      <div class="centered">
        <DashBoardContainer />
      </div>
    </div>
  );
};

export default DashBoard;
