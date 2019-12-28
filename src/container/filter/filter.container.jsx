import React, { Component } from "react";
import Button from "../../components/common/button.component";
import Select from "../../components/common/select.cmponent";
import Date_Picker from "../../components/common/date-picker.component";
class Filter extends Component {
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
        <Select name={"from"} onChange={this.onChange} />
        <Select name={"to"} onChange={this.onChange} />
        <div className="m-1">
          <Date_Picker name={"date"} onChange={this.onDateChange} value={date} />
        </div>
        <Button className={"btn-hover violate-bg"} onClick={() => filterBus(date, from, to)} value={"Filter"} />
        <Button className="btn-hover red-bg" onClick={() => clear()} value={"clear"} />
      </div>
    );
  }
}
export default Filter;
