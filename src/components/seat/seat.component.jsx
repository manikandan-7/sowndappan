import React from "react";

const Seat = ({ onClick, index, data }) => {
  return data === -1 ? (
    <button className="btn btn-secondary m-2" disabled>
      <i class="fas fa-chair"></i>
    </button>
  ) : (
    <button className={data ? "btn btn-primary m-2" : "btn btn-light m-2"} onClick={() => onClick(index)}>
      <i class="fas fa-chair"></i>
    </button>
  );
};
export default Seat;
