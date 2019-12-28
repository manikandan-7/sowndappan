import React from "react";

const BusCard = ({ bus, seeBus }) => {
  return (
    <div onClick={() => seeBus(bus.id)} className="card m-2 box-shadow-onhover">
      <div className="row">
        <div className="col-md-2 m-10 busIcon">
          <span>
            <i className="fas fa-bus-alt"></i>
          </span>
        </div>
        <div className="col-md-8 m-1 p-0">
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
      </div>
    </div>
  );
};

export default BusCard;
