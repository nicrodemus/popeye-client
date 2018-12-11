import React, { Component } from "react";
import axios from "axios";
import MapContainer from "./MapContainer.js";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
class TattoistPersonalPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //we need the portfolio array to avoid error with  ".map()"
      portfolio: [],
      coordinates: []
    };
  }
  componentDidMount() {
    const { params } = this.props.match;
    console.log(params.tattoistId);
    axios
      .get(`http://localhost:5555/api/tattoistList/${params.tattoistId}`, {
        withCredentials: true
      })
      .then(response => {
        console.log("Tattoist details", response.data);
        const {
          portfolio,
          picture,
          fullName,
          adress,
          description,
          geometry
        } = response.data;
        this.setState(
          {
            portfolio,
            picture,
            fullName,
            adress,
            description,
            coordinates: geometry.coordinates
          },
          () => console.log("thistate", this.state)
        );
      })
      .catch(err => {
        console.log("Tattoist details", err);
        alert("Something wrong with the Tattoist details");
      });
  }
  render() {
    console.log("ggggggggggg", this.state);

    const {
      _id,
      picture,
      fullName,
      adress,
      description,
      portfolio,
      coordinates
    } = this.state;

    console.log(coordinates);
    return (
      <section className="TattoistDetails">
        <h2>TattoistDetails</h2>
        <h3>{fullName}</h3>
        <h4>{adress}</h4>
        <h4>{description}</h4>
        <MapContainer
          coordinates={this.state.coordinates}
          fullName={this.state.fullName}
        />
      </section>
    );
  }
}

export default TattoistPersonalPage;
