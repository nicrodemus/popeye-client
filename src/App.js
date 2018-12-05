import React, { Component } from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import axios from "axios";

import HomePage from "./components/HomePage.js";
import SignupPage from "./components/SignupPage.js";
import LoginPage from "./components/LoginPage.js";
import NotFound from "./components/NotFound.js";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null
    };
  }

  //
  componentDidMount() {
    axios
      .get("http://localhost:5555/api/checkuser", { withCredentials: true })
      .then(response => {
        console.log("Check User", response.data);
        const { userDoc } = response.data;
        this.syncCurrentUser(userDoc);
      })
      .catch(err => {
        console.log("check user ERROR", err);
        alert("Sorry! Something went wrong");
      });
  }

  // this is the method for updating "currentUser"
  // (must be defined in App.js since it's the owner of "currentUser" now)
  syncCurrentUser(userDoc) {
    this.setState({ currentUser: userDoc });
  }

  logoutClick() {
    axios
      .delete("http://localhost:5555/api/logout", { withCredentials: true })
      .then(() => {
        //make "currentUser" empty again (like it was at the start)
        this.syncCurrentUser(null);
      })
      .catch(err => {
        console.log("Logout ERROR", err);
        alert("Sorry! Something went wrong.");
      });
  }

  render() {
    return (
      <div className="App">
        <header className="">
          <h1>Popeye</h1>

          <nav>
            <NavLink exact to="/">
              Home
            </NavLink>
            <NavLink to="/phone-list">Our Phones</NavLink>
            {this.state.currentUser ? (
              <span>
                <b>{this.state.currentUser.email}</b>
                <button onClick={() => this.logoutClick()}>Log Out</button>
              </span>
            ) : (
              <span>
                <NavLink to="/signup-page">Sign Up</NavLink>
                <NavLink to="/login-page">Log In</NavLink>
              </span>
            )}
          </nav>
        </header>

        <Switch>
          <Route exact path="/" component={HomePage} />
          {/* Use "render" instead of "component" to pass props */}
          <Route
            path="/signup-page"
            render={() => (
              <SignupPage
                currentuser={this.state.currentUser}
                onUserChange={userDoc => this.syncCurrentUser(userDoc)}
              />
            )}
          />
          <Route
            path="/login-page"
            render={() => (
              <LoginPage
                currentUser={this.state.currentUser}
                onUserChange={userDoc => this.syncCurrentUser(userDoc)}
              />
            )}
          />

          {/* 404 route LAST */}
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
