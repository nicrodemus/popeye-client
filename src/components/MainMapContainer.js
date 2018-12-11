import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

export class MainMapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: true
    };
  }

  onMarkerClick = (markerId, props, marker) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      markerId
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
    const { tattoistData } = this.props;
    const { markerId } = this.state;

    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={{ width: "40%", height: "60%", position: "relative" }}
        initialCenter={{
          lat: 48.864716,
          lng: 2.349014
        }}
      >
        {tattoistData.map((oneMarker, index) => {
          return [
            <Marker
              key={oneMarker._id}
              onClick={(props, marker) =>
                this.onMarkerClick(oneMarker._id, props, marker)
              }
              position={{
                lat: oneMarker.geometry.coordinates[1],
                lng: oneMarker.geometry.coordinates[0]
              }}
            />,
            <InfoWindow
              marker={this.state.activeMarker}
              visible={
                markerId === oneMarker._id && this.state.showingInfoWindow
              }
              onClose={this.onClose}
            >
              <div>
                <h1>{oneMarker.fullName}</h1>
              </div>
            </InfoWindow>
          ];
        })}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyD-1NUeVhLhDSBXqsm7NfC-bq84d3Vnvlo"
})(MainMapContainer);
