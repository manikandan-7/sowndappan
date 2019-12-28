import React from "react";

const TicketInfo = ({ ticket, cancelTicket, close }) => {
  let { bookedSeats } = ticket;
  let seats = bookedSeats.join(" , ");
  return (
    <div className="card m-2">
      <div className="row">
        <div className="col-md-2 m-10 busIcon">
          <span>
            <i className="fas fa-bus-alt"></i>
          </span>
        </div>
        <div className="col-md-8 m-1 p-0">
          <div className="row">
            <div className="col-md-3 text-left" style={{ marginTop: "2%" }}>
              <h4>{ticket.travelsName}</h4>
            </div>
            <div className="col-md-9 text-right" style={{ marginTop: "1%" }}>
              <h2>
                {ticket.from} - {ticket.to}
              </h2>
            </div>
          </div>
          <hr></hr>
          <div className="text-left fontSmall">
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="date text-muted ">{ticket.date}</label>
              </div>
              <div className="col-md-6">
                <label htmlFor="date text-muted ">Booked Seats - {seats}</label>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-1 trashIcon" onClick={() => cancelTicket(ticket.id, ticket)}>
          <span>
            <i className="fas fa-trash-alt" style={{ fontSize: "large" }}></i>
          </span>
        </div>
      </div>
      <div className="m-3">
        <p>Passengers Info</p>
        <table class="table table-striped tableColor ">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {ticket.passengersInfo.map((i, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{i.name}</td>
                <td>{i.ph}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div class="text-center m-3">
        <button class="btn btn-outline-danger" onClick={() => close()}>
          Back
        </button>
      </div>
    </div>
  );
};
export default TicketInfo;
