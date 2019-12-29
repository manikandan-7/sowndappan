import React from "react";
import Table from "../common/table.component";
import ItemInfo from "./item-Info.compoent";
import SeatInfo from "../seat/seat-info.component";
import GenerateSeats from "../seat/generate-seats.component";

const Item = ({ item, show, seats, cancelItem, close, select, showSeatsBoolean, travelsItemBoolean, addtionalInfoBoolean }) => {
  return (
    <div className="card m-2 item">
      {travelsItemBoolean ? (
        <ItemInfo
          item={item}
          travelsItemBoolean={true}
          close={close}
          show={show}
          addtionalInfoBoolean={false}
          showSeatsBoolean={showSeatsBoolean}
        />
      ) : (
        <ItemInfo item={item} show={show} cancelItem={cancelItem} addtionalInfoBoolean={addtionalInfoBoolean} />
      )}
      {addtionalInfoBoolean ? (
        <div>
          <div className="m-3">
            <p>Passengers Info</p>
            <Table body={item.passengersInfo} />
          </div>
          <div class="text-center m-3">
            <button class="btn btn-outline-danger" onClick={() => close()}>
              Back
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
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
export default Item;
