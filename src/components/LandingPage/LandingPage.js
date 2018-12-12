import React, { Component } from "react";
import "./LandingPage.css";
import LocationSearchInput from "../SearchBar.js";
class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      adresseToCoordinates: "",
      isSubmitSuccessful: false
    };
  }

  handleEvent(coordinates) {
    this.props.onUserInput(coordinates);
  }

  render() {
    console.log(this.state);
    return (
      <section>
        <div className="top">
          <h3>Take an Appointment with your favourite Tattoist!</h3>
          <p>It's simple, quick and free</p>
          <div className="search">
            <LocationSearchInput
              handleEvent={coordinates => this.handleEvent(coordinates)}
            />
          </div>
        </div>
      </section>
    );
  }
}

export default LandingPage;
