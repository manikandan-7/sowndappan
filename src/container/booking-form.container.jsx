import React from "react";
import Textfield from "../components/common/textfield.component";
const BookingForm = ({ err, name, ph, onChange, index }) => {
  let nameVal = "name" + index;
  let phVal = "ph" + index;
  return (
    <div>
      <Textfield type="text" name={nameVal} value={name} onChange={onChange} placeholder="Enter the name" label="Name" err={err.name} />
      <Textfield
        type="text"
        name={phVal}
        value={ph}
        onChange={onChange}
        placeholder="Enter the Phone Number"
        label="Phone Number"
        err={err.ph}
      />
    </div>
  );
};
export default BookingForm;
