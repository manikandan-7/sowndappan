import React from "react";
import BusCard from "./bus-card.component";
import TicketCard from "./ticket-card.component";

const Available = ({ list, seeBus, userInfo, cancelTicket }) => {
  return (
    <div className="removeScrollBar overflow card-body-custom">
      {list.length && list ? (
        list.map(bus => {
          return userInfo ? (
            <TicketCard key={bus.id} bus={bus} seeBus={seeBus} cancelTicket={cancelTicket} />
          ) : (
            <BusCard key={bus.id} bus={bus} seeBus={seeBus} />
          );
        })
      ) : (
        <p>Nothing To Show</p>
      )}
      <br></br>
      <p>--End--</p>
      <div className="AdjustScrollBottom"></div>
    </div>
  );
};
export default Available;
