import React from "react";

const Table = ({ body }) => {
  return (
    <table class="table table-striped tableColor ">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Phone Number</th>
        </tr>
      </thead>
      <tbody>
        {body.map((i, index) => (
          <tr key={index}>
            <th scope="row">{index + 1}</th>
            <td>{i.name}</td>
            <td>{i.ph}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
