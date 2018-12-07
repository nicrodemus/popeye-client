import React, { Component } from "react";
import axios from "axios";
import { Redirect, NavLink } from "react-router-dom";
import "./LoginPage.css";

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      originalPassword: ""
    };
  }

  genericSync(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();

    axios
      .post("http://localhost:5555/api/login", this.state, {
        withCredentials: true
      })
      .then(response => {
        console.log("Login Page", response.data);
        const { userDoc } = response.data;
        // send "userDoc" to the App.js function that changes "currentUser"
        this.props.onUserChange(userDoc);
      })
      .catch(err => {
        console.log("Login Page ERROR", err);
        alert("Sorry! Something went wrong. Login");
      });
  }

  render() {
    // check currentUser (received from App.js)
    if (this.props.currentUser) {
      return <Redirect to="/" />;
    }
    return (
      <section className="LoginPage hei-100vh">
        <div>
          <div className="login-div">
            <h2>Log in to your account</h2>

            <form
              className="login-form pad-40"
              onSubmit={event => this.handleSubmit(event)}
            >
              <label>
                <input
                  value={this.state.email}
                  onChange={event => this.genericSync(event)}
                  type="email"
                  name="email"
                  placeholder="Email address:"
                />
              </label>

              <label>
                <input
                  className="margin-top-20"
                  value={this.state.originalPassword}
                  onChange={event => this.genericSync(event)}
                  type="password"
                  name="originalPassword"
                  placeholder="Password:"
                />
              </label>

              <button className="button-container margin-top-20">
                <p>Log In</p>
              </button>
            </form>

            <p>
              New to Popeye?
              <NavLink to="/signup-page"> Sign Up</NavLink>
            </p>
          </div>

          <div>
            <NavLink className="margin-top-20 flex j-cont-center white" to="/reset-password">
              Forgot your Password?
            </NavLink>
          </div>
        </div>
      </section>
    );
  }
}

export default LoginPage;