import React from "react";
import SeatInfo from "../seat/seat-info.component";
import GenerateSeats from "../seat/generate-seats.component";

const Bus = ({ item, show, seats, select, close, showSeatsBoolean }) => {
  console.log(seats);
  return (
    <div onClick={showSeatsBoolean ? () => {} : () => show(item.id)}>
      <div className="row">
        <div className="col-md-2 m-10 busIcon">
          <span>
            <i className="fas fa-bus-alt"></i>
          </span>
        </div>
        <div className="col-md-7 m-1 p-0">
          <div className="row">
            <div className="col-md-3 text-left" style={{ marginTop: "2%" }}>
              <h4>{item.name}</h4>
            </div>
            <div className="col-md-9 text-right" style={{ marginTop: "1%" }}>
              <h2>
                {item.from} - {item.to}
              </h2>
            </div>
          </div>
          <hr></hr>
          <div className="text-left fontSmall">
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="date text-muted ">Number Of Seats - {item.noOfSeats}</label>
              </div>
            </div>
          </div>
        </div>
        {showSeatsBoolean ? (
          <div className="col-md-2 p-0 trashIcon">
            <button className="btn btn-outline-danger" onClick={() => close()}>
              Back
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
      {showSeatsBoolean ? (
        <div className="row">
          <GenerateSeats seats={seats} onClick={select} />
          <SeatInfo />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default Bus;
