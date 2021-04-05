import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class Logged extends Component {
  render() {
    if (!localStorage.getItem("logged")) {
      return <Redirect to="/" />;
    }
    return (
      <div className="logged">
        <h1>You are logged</h1>
      </div>
    );
  }
}

export default Logged;
