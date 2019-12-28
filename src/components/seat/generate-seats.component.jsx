import React from "react";
import Seat from "./seat.component";
export default function GenerateSeats({ seats, onClick }) {
  return (
    <div className="col-md-6">
      <rb></rb>
      {seats.map((i, index) => {
        if (index % 4 === 0 && index !== 0)
          return (
            <span key={index}>
              <br></br>
              <Seat onClick={onClick} index={index} data={i} />
            </span>
          );
        return (
          <span key={index}>
            <Seat onClick={onClick} index={index} data={i} />
          </span>
        );
      })}
    </div>
  );
}
