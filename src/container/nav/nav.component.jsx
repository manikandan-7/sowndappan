import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getDataFromLocalStorage } from "../../store/store";
import { logout } from "../../actions/login/login.actions";
class Nav extends Component {
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
      <div className="box-shadow">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand" href="#">
            Lets go
          </a>
          <div className="ml-auto">
            {Object.keys(logInfo).length ? (
              <ul className="navbar-nav">
                <li class="nav-item ">
                  <Link className="nav-link" to="/">
                    DashBoard
                  </Link>
                </li>
                <li class="nav-item ">
                  <Link className="nav-link" to="/book">
                    Book
                  </Link>
                </li>
                <li class="nav-item">
                  <Link className="nav-link" to="" onClick={this.onLogout}>
                    Logout
                  </Link>
                </li>
              </ul>
            ) : (
              <ul class="navbar-nav">
                <li class="nav-item ">
                  <Link className="nav-link" to="/">
                    DashBoard
                  </Link>
                </li>
                <li class="nav-item ">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
                <li class="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </nav>
      </div>
    );
  }
}

export default Nav;
