import React, { Component } from "react";
import { login } from "../../actions/login/login.actions";
import { getDataFromLocalStorage } from "../../store/store";
import Textfield from "../../components/common/textfield.component";
import Button from "../../components/common/button.component";
export default class LoginContainer extends Component {
  state = {
    name: "",
    password: "",
    err: {}
  };
  componentDidMount() {
    let user = getDataFromLocalStorage("currentUserDetails");
    if (Object.keys(user).length) window.location.replace("/");
  }
  onChange = e => this.setState({ [e.target.name]: e.target.value });
  onSubmit = () => {
    this.setState({ err: {} });
    let { history } = this.props;
    let { password, name } = this.state;
    let err = login(name, password, history);
    if (err) this.setState({ err: err });
  };
  render() {
    let { err } = this.state;
    return (
      <div className="container margin-top col-sm-12 col-lg-6 text-center">
        <div class="card box-shadow">
          <div class="card-body padding-top">
            <h1>Login</h1>
            <div className="form-group text-left">
              <Textfield
                type="text"
                name="name"
                label="Name"
                className="form-control"
                placeholder="Enter Name"
                value={this.state.name}
                onChange={this.onChange}
                err={err.name}
              />
              <br></br>
              <Textfield
                type="text"
                name="password"
                label="Password"
                className="form-control"
                placeholder="Enter Password"
                value={this.state.password}
                onChange={this.onChange}
                err={err.password}
              />
              <div className="text-center">
                <Button className={"btn-hover color-3"} onClick={this.onSubmit} value={"Login"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
