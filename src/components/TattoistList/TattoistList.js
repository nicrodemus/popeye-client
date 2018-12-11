import React, { Component } from "react";
import axios from "axios";
import "./TattoistList.css";
import { Switch, Route, Link } from "react-router-dom";
import MainMapContainer from "../MainMapContainer.js";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import CustomView from "../CalendarPage/ClientCalendar"


function getTattoistUrl(oneTattoist) {
  return `/tattoistList/${oneTattoist._id}`;
}

class TattoistList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tattoistData: []
    };
  }

  componentDidMount() {
    axios
      .post(
        "http://localhost:5555/api/tattoistlist",
        this.props.searchedLocation,
        { withCredentials: true }
      )
      .then(response => {
        this.setState({ tattoistData: response.data });
      })
      .catch(err => {
        console.log("Tattolist Error", err);
        alert("Something went wrong with the tatoo list");
      });
  }

  render() {
    console.log("THESE ARE MY PROPS", this.props);
    console.log(this.state);
    const { tattoistData } = this.state;

    return (
      <section className="TattoistList">
        {/* <h1>this is the Tattoist list</h1> */}
        <div className="Tattoist">
          <ul>
            {tattoistData.map(oneTattoist => {
              return (
                <li key={oneTattoist._id} className="Tattoist-box">
                  <div className="tattoistImage">
                    <img src={oneTattoist.picture} alt={oneTattoist.fullName} />
                  </div>
                  <Link to={getTattoistUrl(oneTattoist)}>
                    <h1>{oneTattoist.fullName}</h1>
                  </Link>
                  <h3>{oneTattoist.adress}</h3>
                  {/* <h4>{oneTattoist.geometry.coordinates[0]}</h4> */}
                  <button className="appointmentList">
                    Take An Appointment
                  </button>
                  
                  <CustomView className="calendar-client"/>
                </li>
              );
            })}
          </ul>
        </div>
        <div onscroll="myScript" className="MapContainer">
          <MainMapContainer />
        </div>
      </section>
    );
  }
}

export default TattoistList;
