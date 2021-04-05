import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./component/Home";
import AfterLogin from "./component/Logged";
import Login from "./component/Login";

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/logged">
            <AfterLogin />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
