import React from "react";

const Select = ({ name, onChange }) => {
  return (
    <select className="custom-select m-1" name={name} onChange={onChange}>
      <option value="chennai">chennai</option>
      <option value="salem">salem</option>
      <option value="coimbatore">coimbatore</option>
    </select>
  );
};

export default Select;
