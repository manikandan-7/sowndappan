import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getDataFromLocalStorage } from "../store/store";
import { logout } from "../actions/login.actions";
export default class DashBoardContainer extends Component {
  state = {
    logInfo: {}
  };
  componentDidMount = async () => {
    let user = await getDataFromLocalStorage("currentUserDetails");
    await this.setState({ logInfo: user });
  };
  onLogout = () => {
    let user = logout();
    this.setState({ logInfo: user });
  };
  render() {
    let { logInfo } = this.state;
    return (
      <div>
        <p>DashBoard</p>
        {Object.keys(logInfo).length ? (
          <div>
            <Link to="/book">Book</Link> <br></br>
            <Link to="" onClick={this.onLogout}>
              Logout
            </Link>
            <br></br>
          </div>
        ) : (
          <div>
            <Link to="/register">Register</Link>&nbsp;
            <Link to="/login">Login</Link>&nbsp;
          </div>
        )}
      </div>
    );
  }
}
