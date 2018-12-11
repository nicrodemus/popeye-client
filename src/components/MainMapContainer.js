// import React, { Component } from "react";
// import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
// onMarkerClick = (props, marker, e) =>
//   this.setState({
//     selectedPlace: props,
//     activeMarker: marker,
//     showingInfoWindow: true
//   });
// onClose = props => {
//   if (this.state.showingInfoWindow) {
//     this.setState({
//       showingInfoWindow: false,
//       activeMarker: null
//     });
//   }
// };

// export class MainMapContainer extends Component {
//   render() {
//     const { tattoistData } = this.props;

//     return (
//       <Map
//         className="MainMap"
//         google={this.props.google}
//         zoom={14}
//         style={{ width: "40%", height: "60%", position: "relative" }}
//         initialCenter={{
//           lat: 48.864716,
//           lng: 2.349014
//         }}
//       >
//         <ul>
//           {tattoistData.map(oneMarker, index => {
//             return (
//               <li>
//                 <Marker
//                   key={oneMarker._id}
//                   onClick={this.onMarkerClick}
//                   position={{
//                     lat: oneMarker.geometry.coordinates[1],
//                     lng: oneMarker.geometry.coordinates[0]
//                   }}
//                 />

//                 <InfoWindow onClose={this.onInfoWindowClose}>
//                   <div>
//                     <h1>{oneMarker.fullName}</h1>
//                   </div>
//                 </InfoWindow>
//               </li>
//             );
//           })}
//         </ul>
//       </Map>
//     );
//   }
// }

// export default GoogleApiWrapper({
//   apiKey: "AIzaSyD-1NUeVhLhDSBXqsm7NfC-bq84d3Vnvlo"
// })(MainMapContainer);
