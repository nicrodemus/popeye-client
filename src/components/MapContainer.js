import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: true
    };
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    const { coordinates } = this.props;
    console.log("cooooooooooordinates", coordinates);
    const lng = coordinates[0];
    const lat = coordinates[1];
    return (
      <Map
        google={this.props.google}
        style={{ width: "40%", height: "60%", position: "relative" }}
        initialCenter={{
          lat: 48.864716,
          lng: 2.349014
        }}
        className={"map"}
        zoom={12}
      >
        <Marker
          title={"The marker`s title will appear as a tooltip."}
          name={"SOMA"}
          position={{ lat: lat, lng: lng }}
          onClick={this.onMarkerClick}
        />

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h1>{this.props.fullName}</h1>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyD-1NUeVhLhDSBXqsm7NfC-bq84d3Vnvlo"
})(MapContainer);
