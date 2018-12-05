import React, { Component } from "react";
import axios from "axios";
import "./SignupPage.css";

class SignupPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      name: "",
      surname: "",
      originalPassword: "",
      phoneNumber: "",
      currentUser: null
    };
  }

  genericSync(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();

    axios
      .post("http://localhost:5555/api/signup", this.state, {
        withCredentials: true
      })
      .then(response => {
        console.log("Signup Page", response.data);
        const { userDoc } = response.data;
        // send "userDoc" to the App.js function that changes "currentUser"
        this.props.onUserChange(userDoc);
      })
      .catch(err => {
        console.log("Signup Page Error", err);
        alert("Sorry! Something went wrong.");
      });
  }

  render() {
    if (this.props.currentUser) {
      return (
        <section className="SignupPage">
          <h2>You are signed up!</h2>
          <p>Welcome, {this.props.currentUser.name}!</p>
        </section>
      );
    }

    return (
      <section className="SignupPage">
        <h2>Create an Account</h2>
        <div className="SignupDiv">
          <form
            className="SignupForm"
            onSubmit={event => this.handleSubmit(event)}
          >
            <label>
              <input
                size="50"
                value={this.state.email}
                onChange={event => this.genericSync(event)}
                type="email"
                name="email"
                placeholder="Email Adress"
              />
            </label>

            <label>
              <input
                value={this.state.name}
                onChange={event => this.genericSync(event)}
                type="text"
                name="name"
                placeholder="Name"
              />
            </label>

            <label>
              <input
                value={this.state.surname}
                onChange={event => this.genericSync(event)}
                type="text"
                name="surname"
                placeholder="Surname"
              />
            </label>

            <label>
              <input
                value={this.state.originalPassword}
                onChange={event => this.genericSync(event)}
                type="password"
                name="originalPassword"
                placeholder="Password"
              />
            </label>

            <label>
              <input
                value={this.state.phoneNumber}
                onChange={event => this.genericSync(event)}
                type="number"
                name="phoneNumber"
                placeholder="Phone Number"
              />
            </label>

            <button>Sign Up</button>
          </form>
        </div>
      </section>
    );
  }
}

export default SignupPage;
