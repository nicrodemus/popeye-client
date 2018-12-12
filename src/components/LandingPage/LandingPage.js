import React, { Component } from "react";
import "./LandingPage.css";
import LocationSearchInput from "../SearchBar.js";

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <section>
        <div className="top flex">
          <h3 className="white">Take an Appointment with your favourite Tattoist!</h3>
          <p className="white">It's simple, quick and free</p>
          <div className="search">
            <LocationSearchInput />
          </div>
        </div>

        <div className="flex j-cont-center">
          <h2>Are You a Tattoist?</h2>
        </div>
        <div className="flex j-cont-center">
          <p>Discover the new way of making an appointment.</p>
        </div>

        <div className="flex">
          <div className="padding-l-r-14">
            <img src="" alt="" />
            <p>Save 30% time of secretaryship</p>
          </div>
          <div className="padding-l-r-14">
            <img src="" alt="" />
            <p>Reduce the number of no-shows in your practice</p>
          </div>
          <div className="padding-l-r-14">
            <img src="" alt="" />
            <p>Find clients more easily</p>
          </div>
          <div className="padding-l-r-14">
            <img src="" alt="" />
            <p>Provide a new service to your costumers</p>
          </div>
        </div>
      </section>
    );
  }
}

export default LandingPage;
