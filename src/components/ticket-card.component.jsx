import React from "react";

const TicketCard = ({ bus, seeBus, cancelTicket }) => {
  let { bookedSeats } = bus;
  let seats = bookedSeats.join(" , ");
  return (
    <div className="card m-2 box-shadow-onhover">
      <div className="row">
        <div className="col-md-2 m-10 busIcon">
          <span>
            <i className="fas fa-bus-alt"></i>
          </span>
        </div>
        <div onClick={() => seeBus(bus.id, bus)} className="col-md-8 m-1 p-0">
          <div className="row">
            <div className="col-md-3 text-left" style={{ marginTop: "2%" }}>
              <h4>{bus.travelsName}</h4>
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
                <label htmlFor="date text-muted ">{bus.date}</label>
              </div>
              <div className="col-md-6">
                <label htmlFor="date text-muted ">Booked Seats - {seats}</label>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-1 trashIcon" onClick={() => cancelTicket(bus.id, bus)}>
          <span>
            <i className="fas fa-trash-alt" style={{ fontSize: "large" }}></i>
          </span>
        </div>
      </div>
    </div>
  );
};
export default TicketCard;
