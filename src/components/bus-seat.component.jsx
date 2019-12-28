import React from "react";
import Seat from "./seat.component";

const BusSeat = ({ bus, seats, selectSeat, close, confrim }) => {
  return (
    <div>
      <div className="row">
        <div className="col-md-2 m-10 busIcon">
          <span>
            <i className="fas fa-bus-alt"></i>
          </span>
        </div>
        <div className="col-md-7 m-1 p-0">
          <div className="row">
            <div className="col-md-3 text-left" style={{ marginTop: "2%" }}>
              <h4>{bus.name}</h4>
            </div>
            <div className="col-md-9 text-right" style={{ marginTop: "1%" }}>
              <h2>
                {bus.from} - {bus.to}
              </h2>
            </div>
          </div>
          <hr></hr>
          <div className="text-left fontSmall">
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="date text-muted ">Number Of Seats - {bus.noOfSeats}</label>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-2 p-0 trashIcon">
          <button className="btn btn-outline-danger" onClick={() => close()}>
            Back
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <rb></rb>
          {seats.map((i, index) => {
            if (index % 4 === 0 && index !== 0)
              return (
                <span key={index}>
                  <br></br>
                  <Seat onClick={selectSeat} index={index} data={i} />
                </span>
              );
            return (
              <span key={index}>
                <Seat onClick={selectSeat} index={index} data={i} />
              </span>
            );
          })}
        </div>
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
      </div>
    </div>
  );
};
export default BusSeat;
