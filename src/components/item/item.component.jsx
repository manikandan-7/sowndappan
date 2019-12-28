import React from "react";
import Table from "../common/table.component";
import ItemInfo from "./item-Info.compoent";

const Item = ({ item, show, cancelItem, close, addtionalInfoBoolean }) => {
  return (
    <div className="card m-2">
      <ItemInfo item={item} show={show} cancelItem={cancelItem} addtionalInfoBoolean={addtionalInfoBoolean} />
      {addtionalInfoBoolean ? (
        <div>
          <div className="m-3">
            <p>Passengers Info</p>
            <Table bodyVal={item.passengersInfo} />
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
    </div>
  );
};
export default Item;
