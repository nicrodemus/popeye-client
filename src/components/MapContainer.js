import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

export class MapContainer extends Component {
  render() {
    const { coordinates } = this.props;
    return (
      <Map
        google={this.props.google}
        style={{ width: "60%", height: "60%", position: "relative" }}
        initialCenter={{
          lat: 48.856614,
          lng: 2.3522219000000177
        }}
        className={"map"}
        zoom={12}
      >
        <Marker
          title={"Jean-Michel Apeuprès"}
          name={"SOMA"}
          position={{ lat: coordinates[0], lng: coordinates[1] }}
        />
        {/* <Marker onClick={this.onMarkerClick} name={"Current location"} /> */}

        <InfoWindow onClose={this.onInfoWindowClose}>
          {/* <div>
            <h1>{this.state.selectedPlace.name}</h1>
          </div> */}
        </InfoWindow>
      </Map>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyD-1NUeVhLhDSBXqsm7NfC-bq84d3Vnvlo"
})(MapContainer);
