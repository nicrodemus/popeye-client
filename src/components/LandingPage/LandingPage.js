import React, { Component } from "react";
import { Link } from "react-router-dom";
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
        <div className="top height-80vh">
          <h2 className="white txt-align-center size-50px pad-top-50px">
            Take an Appointment with your favourite Tattoist!
          </h2>
          <p className="white txt-align-center">It's simple, quick and free</p>
          <div className="search flex">
            <LocationSearchInput
              handleEvent={coordinates => this.handleEvent(coordinates)}
            />
            <button className="searchButton margin-top-20">
              <Link className="white" to="/tattoistlist">
                {" "}
                Search your tatooist{" "}
              </Link>
            </button>
          </div>
        </div>

        <div className="pad-top-50px pad-bttm-50px b-white height-80vh">
          <div className="flex j-cont-center">
            <h2 className="size-50px">Are You a Tattoist?</h2>
          </div>
          <div className="flex j-cont-center">
            <p className="size-20px">Discover the new way of making an appointment.</p>
          </div>

          <div className="flex j-cont-center pad-top-50px pad-r-200px pad-l-200px">
            <div className="padding-l-r-14 block width-25x">
              <div className="flex j-cont-center">
                <img
                  className="w-h-100px"
                  src="/images/icons/clessidra.png"
                  alt=""
                />
              </div>
              <div className="txt-align-center">
                <p className="size-20px">Save 30% time of secretaryship</p>
              </div>
            </div>
            <div className="padding-l-r-14 block width-25x">
              <div className="flex j-cont-center">
                <img
                  className="w-h-100px"
                  src="/images/icons/geolocal.png"
                  alt=""
                />
              </div>
              <div className="txt-align-center">
                <p className="size-20px">Reduce the number of no-shows in your practice</p>
              </div>
            </div>
            <div className="padding-l-r-14 block width-25x">
              <div className="flex j-cont-center">
                <img
                  className="w-h-100px"
                  src="/images/icons/lente.png"
                  alt=""
                />
              </div>
              <div className="txt-align-center">
                <p className="size-20px">Find clients more easily</p>
              </div>
            </div>
            <div className="padding-l-r-14 block width-25x">
              <div className="flex j-cont-center">
                <img
                  className="w-h-100px"
                  src="/images/icons/star.png"
                  alt=""
                />
              </div>
              <div className="txt-align-center">
                <p className="size-20px">Provide a new service to your costumers</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default LandingPage;
