import React, { Component } from "react";
import axios from "axios";

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
        <h2>Sign Up</h2>

        <form onSubmit={event => this.handleSubmit(event)}>
          <label>
            Email:
            <input
              value={this.state.email}
              onChange={event => this.genericSync(event)}
              type="email"
              name="email"
              placeholder="Rey@jedi.com"
            />
          </label>

          <label>
            Name:
            <input
              value={this.state.name}
              onChange={event => this.genericSync(event)}
              type="text"
              name="name"
              placeholder="Rey"
            />
          </label>

          <label>
            Surname:
            <input
              value={this.state.surname}
              onChange={event => this.genericSync(event)}
              type="text"
              name="surname"
              placeholder="Rey"
            />
          </label>

          <label>
            Password:
            <input
              value={this.state.originalPassword}
              onChange={event => this.genericSync(event)}
              type="password"
              name="originalPassword"
              placeholder="****"
            />
          </label>

          <label>
            PhoneNumber:
            <input
              value={this.state.phoneNumber}
              onChange={event => this.genericSync(event)}
              type="number"
              name="phoneNumber"
              placeholder="type your number"
            />
          </label>

          <button>Sign Up</button>
        </form>
      </section>
    );
  }
}

export default SignupPage;
