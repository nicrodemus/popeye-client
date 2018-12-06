import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

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
      <section className="LoginPage">
        <h2>Log In</h2>

        <div className="login-div">
          <form
            className="login-form"
            onSubmit={event => this.handleSubmit(event)}
            >
            
            <label>
              <input
                value={this.state.email}
                onChange={event => this.genericSync(event)}
                type="email"
                name="email"
                placeholder="rey@jedi.com"
              />
            </label>

            <label>
              <input
                value={this.state.originalPassword}
                onChange={event => this.genericSync(event)}
                type="password"
                name="originalPassword"
                placeholder="rey@jedi.com"
              />
            </label>
            <button lassName="button-container">Log In</button>
          </form>
        </div>
      </section>
    );
  }
}

export default LoginPage;
