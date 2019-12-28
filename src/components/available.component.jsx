import React from "react";
import Item from "./item/item.component";
import Bus from "./bus/bus.component";

const Available = ({ list, seeBus, userInfo, cancelTicket }) => {
  return (
    <div className="removeScrollBar overflow card-body-custom">
      {list.length && list ? (
        list.map(bus => {
          return userInfo ? (
            <Item key={bus.id} item={bus} show={seeBus} cancelItem={cancelTicket} />
          ) : (
            <Bus key={bus.id} item={bus} show={seeBus} />
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
