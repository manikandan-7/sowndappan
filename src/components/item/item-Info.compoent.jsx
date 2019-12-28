import React from "react";

export default function ItemInfo({ item, show, cancelItem, addtionalInfoBoolean }) {
  let { bookedSeats } = item;
  let seats = bookedSeats.join(" , ");
  return (
    <div className="row">
      <div className="col-md-2 m-10 busIcon">
        <span>
          <i className="fas fa-bus-alt"></i>
        </span>
      </div>
      <div onClick={addtionalInfoBoolean ? () => {} : () => show(item.id, item)} className="col-md-8 m-1 p-0">
        <div className="row">
          <div className="col-md-3 text-left" style={{ marginTop: "2%" }}>
            <h4>{item.travelsName}</h4>
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
              <label htmlFor="date text-muted ">{item.date}</label>
            </div>
            <div className="col-md-6">
              <label htmlFor="date text-muted ">Booked Seats - {item.seats}</label>
            </div>
          </div>
        </div>
      </div>
      {cancelItem ? (
        <div className="col-md-1 trashIcon" onClick={() => cancelItem(item.id, item)}>
          <span>
            <i className="fas fa-trash-alt" style={{ fontSize: "large" }}></i>
          </span>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
