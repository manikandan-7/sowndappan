import React from "react";
import DatePicker from "react-date-picker";

const Date_Picker = ({ name, onChange, value }) => {
  return <DatePicker name={name} onChange={onChange} value={value} />;
};
export default Date_Picker;
