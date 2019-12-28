import React, { Component } from "react";
import DatePicker from "react-date-picker";

class FilterBus extends Component {
  state = {
    from: "chennai",
    to: "chennai",
    date: new Date()
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onDateChange = date => this.setState({ date });
  render() {
    let { date, from, to } = this.state,
      { filterBus, clear } = this.props;
    return (
      <div>
        <select className="custom-select m-1" name="from" onChange={this.onChange}>
          <option value="chennai">chennai</option>
          <option value="salem">salem</option>
          <option value="coimbatore">coimbatore</option>
        </select>
        <select className="custom-select m-1" name="to" onChange={this.onChange}>
          <option value="chennai">chennai</option>
          <option value="salem">salem</option>
          <option value="coimbatore">coimbatore</option>
        </select>
        <div className="m-1">
          <DatePicker name="date" onChange={this.onDateChange} value={date} />
        </div>
        <button className="btn-hover violate-bg" onClick={() => filterBus(date, from, to)}>
          Filter
        </button>
        <button className="btn-hover red-bg" onClick={() => clear()}>
          clear
        </button>
      </div>
    );
  }
}
export default FilterBus;
