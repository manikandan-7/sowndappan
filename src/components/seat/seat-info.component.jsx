import React from "react";

export default function SeatInfo() {
  return (
    <div className="col-md-6 text-left">
      <button type="button" class="btn btn-primary">
        <i class="fas fa-chair"></i>
      </button>
      {"   "}
      <label htmlFor="Selected Seats">Selected Seats</label>
      <br></br>
      <br></br>
      <button type="button" class="btn btn-secondary">
        <i class="fas fa-chair"></i>
      </button>
      {"   "}
      <label htmlFor="Booked">Booked</label>
      <br></br>
      <br></br>
      <button type="button" class="btn btn-light">
        <i class="fas fa-chair"></i>
      </button>
      {"   "}
      <label htmlFor="unBooked">unBooked</label>
    </div>
  );
}
