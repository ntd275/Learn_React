import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import UserApi from "../api/UserApi";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      alert: "",
    };
  }

  mySubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let res = await UserApi.login(this.state.username, this.state.password);
      localStorage.setItem("logged", true);
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      this.forceUpdate();
    } catch (e) {
      this.setState({ alert: e.response.data.message });
    }
  };

  myChangeHandler = (event) => {
    let name = event.target.name;
    let val = event.target.value;
    this.setState({ [name]: val });
  };
  render() {
    if (localStorage.getItem("logged")) {
      return <Redirect to="/logged" />;
    }
    return (
      <div className="login">
        <form onSubmit={this.mySubmitHandler}>
          <div>{this.state.alert}</div>
          <div>
            <label> Username </label>
            <input
              type="text"
              name="username"
              onChange={this.myChangeHandler}
            />
          </div>
          <div>
            <label> Password </label>
            <input
              type="text"
              name="password"
              onChange={this.myChangeHandler}
            />
          </div>
          <input type="submit" value="Login" />
        </form>
      </div>
    );
  }
}

export default Login;
