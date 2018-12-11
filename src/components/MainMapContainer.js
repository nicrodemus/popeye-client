import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

export class MainMapContainer extends Component {
  render() {
    return (
      <Map
        className="MainMap"
        google={this.props.google}
        zoom={14}
        style={{ width: "40%", height: "60%", position: "relative" }}
        initialCenter={{
          lat: 48.864716,
          lng: 2.349014
        }}
      >
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
})(MainMapContainer);
