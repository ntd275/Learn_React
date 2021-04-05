import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
  logout = () => {
    localStorage.removeItem("logged");
    this.forceUpdate();
  };
  render() {
    let option;
    if (localStorage.getItem("logged")) {
      option = <button onClick={this.logout}>Logout</button>;
    } else {
      option = <Link to="/login">Login</Link>;
    }
    return (
      <div className="home">
        <h1>Home</h1>
        {option}
      </div>
    );
  }
}

export default Home;
