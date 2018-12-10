import React, { Component } from "react";
import axios from "axios";
import "./SignupPage.css";
import { Redirect, NavLink } from "react-router-dom";

class SignupPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      name: "",
      surname: "",
      originalPassword: "",
      confirmPassword: "",
      phoneNumber: "",
      currentUser: null
    };
  }

  genericSync(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    const { originalPassword, confirmPassword } = this.state;
    
    event.preventDefault();

    if (originalPassword !== confirmPassword) {

      alert("Passwords don't match.")
    } else {
      // make API call
 
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
        alert("Sorry! Something went wrong. Signup");
      });
    }
  }


  render() {
    if (this.props.currentUser) {
      return <Redirect to="/" />
      //   <section className="SignupPage">
      //     <h2>You are signed up!</h2>
      //     <p>Welcome, {this.props.currentUser.name}!</p>
      //   </section>
      // );
    }

    return (
      <section className="SignupPage">
        <div className="signup-div">
        <h2>Create an Account</h2>
        
          <form
            className="signup-form pad-40"
            onSubmit={event => this.handleSubmit(event)}
          >

            <label>
              <input
                className=""
                value={this.state.name}
                onChange={event => this.genericSync(event)}
                type="text"
                name="name"
                placeholder="Name"
              />
            </label>

            <label>
              <input
                className="margin-top-20"
                value={this.state.surname}
                onChange={event => this.genericSync(event)}
                type="text"
                name="surname"
                placeholder="Surname"
              />
            </label>

            <label>
              <input
                className="margin-top-20"
                value={this.state.phoneNumber}
                onChange={event => this.genericSync(event)}
                type="number"
                name="phoneNumber"
                placeholder="Phone Number"
              />
            </label>

            <label>
              <input
               className="margin-top-20"
                value={this.state.email}
                onChange={event => this.genericSync(event)}
                type="email"
                name="email"
                placeholder="Email Adress"
              />
            </label>

            <label>
              <input
                className="margin-top-20"
                value={this.state.originalPassword}
                onChange={event => this.genericSync(event)}
                type="password"
                name="originalPassword"
                placeholder="Password"
              />
            </label>

            <label>
              <input
                className="margin-top-20"
                value={this.state.confirmPassword}
                onChange={event => this.genericSync(event)}
                type="password"
                name="confirmPassword"
                placeholder="Repeat Password"
              />
            </label>

            <button className="margin-top-20">
              <p>Sign Up</p>
            </button>
          </form>

          <p>
            Already a client?
            <NavLink to="/login-page"> Log In</NavLink>
          </p>
        </div>
      </section>
    );
  }
}

export default SignupPage;
