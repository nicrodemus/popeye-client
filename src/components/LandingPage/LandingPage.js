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
          <h2 className="white txt-align-center">
            Take an Appointment with your favourite Tattoist!
          </h2>
          <p className="white txt-align-center">It's simple, quick and free</p>
          <div className="search flex">
            <LocationSearchInput
              handleEvent={coordinates => this.handleEvent(coordinates)}
            />
          </div>
        </div>

        <div className="pad-top-50px pad-bttm-50pxn">
          <div className="flex j-cont-center">
            <h2>Are You a Tattoist?</h2>
          </div>
          <div className="flex j-cont-center">
            <p>Discover the new way of making an appointment.</p>
          </div>

          <div className="flex j-cont-center">
            <div className="padding-l-r-14 block ">
              <div className="flex j-cont-center">
                <img
                  className="w-h-100px"
                  src="/images/icons/geolocal.png"
                  alt=""
                />
              </div>
              <div className="txt-align-center">
                <p>Save 30% time of secretaryship</p>
              </div>
            </div>
            <div className="padding-l-r-14 block">
              <div className="flex j-cont-center">
                <img
                  className="w-h-100px"
                  src="/images/icons/clessidra.png"
                  alt=""
                />
              </div>
              <div className="txt-align-center">
                <p>Reduce the number of no-shows in your practice</p>
              </div>
            </div>
            <div className="padding-l-r-14 block">
              <div className="flex j-cont-center">
                <img
                  className="w-h-100px"
                  src="/images/icons/star.png"
                  alt=""
                />
              </div>
              <div className="txt-align-center">
                <p>Find clients more easily</p>
              </div>
            </div>
            <div className="padding-l-r-14 block ">
              <div className="flex j-cont-center">
                <img
                  className="w-h-100px"
                  src="/images/icons/lente.png"
                  alt=""
                />
              </div>
              <div className="txt-align-center">
                <p>Provide a new service to your costumers</p>
              </div>
            </div>
          </div>
        </div>

        <footer className="b-black">
          <p>footer</p>
        </footer>
      </section>
    );
  }
}

export default LandingPage;
