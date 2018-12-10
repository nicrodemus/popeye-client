import React, { Component } from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import { withRouter } from "react-router";

import axios from "axios";
import "./App.css";

import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import HomePage from "./components/HomePage/HomePage.js";
import TattoistList from "./components/TattoistList/TattoistList.js";
// -------------------------------------------
import SignupPage from "./components/SignupPage/SignupPage.js";
import LoginPage from "./components/LoginPage/LoginPage.js";
import NotFound from "./components/NotFound.js";
import ResetPassword from "./components/ResetPassword/ResetPassword.js";

import TattoistSignupPage from "./components/TattoistSignupPage/TattoistSignupPage.js";
import TattoistLoginPage from "./components/TattoistLoginPage/TattoistLoginPage.js";
// -------------------------------------------
import LandingPage from "./components/LandingPage/LandingPage.js";
import MapContainer from "./components/MapContainer.js";
import GoogleApiWrapperCode from "./components/MapContainer.js";
import TattoistDetails from "./components/TattoistDetails.js";
import Dnd from "./components/CalendarPage/Calendar.js";
import ClientView from "./components/CalendarPage/ClientCalendar"
import PlacesAutocomplete from "react-places-autocomplete";
import SearchBar from "./components/SearchBar.js";
import SearchResult from "./components/SearchResult.js";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      citySearchQuery: ""
    };
  }

  //
  componentDidMount() {
    axios
      .get("http://localhost:5555/api/checkuser", { withCredentials: true })
      .then(response => {
        console.log("Check User", response.data);
        const { userDoc } = response.data;
        this.syncCurrentUser(userDoc);
      })
      .catch(err => {
        console.log("check user ERROR", err);
        alert("Sorry! Something went wrong");
      });
  }

  // this is the method for updating "currentUser"
  // (must be defined in App.js since it's the owner of "currentUser" now)
  syncCurrentUser(userDoc) {
    this.setState({ currentUser: userDoc });
  }

  syncSearchedLocation(locationSearchDoc) {
    this.setState({ citySearchQuery: locationSearchDoc }, () => {
      console.log(this.state);
    });
  }

  logoutClick() {
    axios
      .delete("http://localhost:5555/api/logout", { withCredentials: true })
      .then(() => {
        //make "currentUser" empty again (like it was at the start)
        this.syncCurrentUser(null);
      })
      .catch(err => {
        console.log("Logout ERROR", err);
        alert("Sorry! Something went wrong. Logout");
      });
  }

  render() {
    return (
      <section>
        <div className="App">
          {(this.props.location.pathname !== "/login-page" && this.props.location.pathname !== "/tattoist-login-page") && (
            <nav className="navbar-user-dropdown flex">

                <NavLink exact to="/">
                  <img src="/images/logo-header.svg" alt="logo" />
                </NavLink>


              {this.state.currentUser ? (
                <span className="flex">
                  <p className="padding-l-r-14">{this.state.currentUser.name}</p>
                  <p className="padding-l-r-14">Appointments</p>
                  <button className="extra-style"
                  onClick={() => this.logoutClick()}>Log Out</button>
                </span>
              ) : (
                
                <span className="flex">
                  <span className="flex ">
                    <p>Are you:</p>
                  </span>
                  {this.props.location.pathname !== "/tattoist-signup-page" && (
                  <NavLink
                    to="/tattoist-signup-page"
                    className="white extra-style">
                  Tattoist?
                  </NavLink>
                  
                  )}

                  {this.props.location.pathname !== "/signup-page" && (
                  <NavLink to="/signup-page" className="white extra-style">
                  Client?
                  </NavLink>
                  )}

                </span>
              )}
            </nav>
          )}

          {/* --------------------------------------------------- */}
          <Switch>
            {/* Route is important: allow you to define the URL in "path"*/}
            <Route exact path="/" component={LandingPage} />

            <Route path="/mapContainer" component={MapContainer} />
            <Route
              path="/tattoistList/:tattoistId"
              component={TattoistDetails}
            />
            {/* Use "render" instead of "component" to pass props */}

            <Route
              path="/tattoistlist"
              render={() => (
                <TattoistList
                  searchedLocation={this.state.citySearchQuery}
                  currentuser={this.state.currentUser}
                />
              )}
            />

            <Route path="/MapContainer" component={MapContainer} />
            {/* Use "render" instead of "component" to pass props */}

            {/* --------------------------- Signups ------------------------ */}

            <Route
              path="/signup-page"
              render={() => (
                <SignupPage
                  currentuser={this.state.currentUser}
                  onUserChange={userDoc => this.syncCurrentUser(userDoc)}
                />
              )}
            />

            <Route
              path="/tattoist-signup-page"
              render={() => (
                <TattoistSignupPage
                  currentuser={this.state.currentUser}
                  onUserChange={userDoc => this.syncCurrentUser(userDoc)}
                />
              )}
            />

            {/* --------------------------- Logins ------------------------- */}
            <Route
              path="/login-page"
              render={() => (
                <LoginPage
                  // CA CEST UNE PROP, INFORMATION DESCENDANTE
                  currentUser={this.state.currentUser}
                  // CA CEST UNE FONCTION POUR RECUPERER UNE INFO DE LA LOGIN PAGE
                  onUserChange={userDoc => this.syncCurrentUser(userDoc)}
                />
              )}
            />

            <Route
              path="/tattoist-login-page"
              render={() => (
                <TattoistLoginPage
                  // CA CEST UNE PROP, INFORMATION DESCENDANTE
                  currentUser={this.state.currentUser}
                  // CA CEST UNE FONCTION POUR RECUPERER UNE INFO DE LA LOGIN PAGE
                  onUserChange={userDoc => this.syncCurrentUser(userDoc)}
                />
              )}
            />

            <Route path="/reset-password" component={ResetPassword} />
            <Route
              path="/search"
              render={() => (
                <SearchBar
                  onUserInput={locationSearchDoc =>
                    this.syncSearchedLocation(locationSearchDoc)
                  }
                  currentuser={this.state.currentUser}
                  component={SearchBar}
                />
              )}
            />
            <Route path="/calendar" component={Dnd} />
            {/* Use "render" instead of "component" to pass props */}
            <Route
              path="/signup-page"
              render={() => (
                <SignupPage
                  currentuser={this.state.currentUser}
                  onUserChange={userDoc => this.syncCurrentUser(userDoc)}
                />
              )}
            />

            <Route path="/search-result" component={SearchResult} />
            <Route
              path="/search"
              render={() => (
                <SearchBar
                  currentuser={this.state.currentUser}
                  searchQuery={placeDoc => this.syncSearchQuery(placeDoc)}
                />
              )}
            />
            <Route path="/clientcalendar" component={ClientView} />
            {/* Use "render" instead of "component" to pass props */}
            <Route
              path="/signup-page"
              render={() => (
                <SignupPage
                  currentuser={this.state.currentUser}
                  onUserChange={userDoc => this.syncCurrentUser(userDoc)}
                />
              )}
            />

            {/* --------------------------- NotFound ------------------------- */}
            {/* 404 route LAST */}
            <Route component={NotFound} />
          </Switch>
        </div>
      </section>
    );
  }
}

export default withRouter(App);
