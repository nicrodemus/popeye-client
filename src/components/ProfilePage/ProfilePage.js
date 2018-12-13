import React, { Component } from "react";
import "./ProfilePage.css";
import Dnd from "../CalendarPage/Calendar.js";
import axios from "axios";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    console.log(this.state);
  }

  // componentDidMount() {
  //   if (this.props.currentUser) {
  //     const { _id } = this.props.currentUser;
  //     axios
  //       .get(`http://localhost:5555/api/tattoist/${_id}`, {
  //         withCredentials: true
  //       })
  //       .then(response => {
  //         console.log("Tattoist details", response.data);
  //         const { fullName, adress } = response.data;
  //         this.setState(
  //           {
  //             fullName,
  //             adress
  //           },
  //           () => console.log("blah AFTER API", this.state)
  //         );
  //       })
  //       .catch(err => {
  //         console.log("Tattoist details", err);
  //         alert("Something wrong with the Tattoist details");
  //       });
  //   }
  // }

  render() {
    const { fullName } = this.props.currentuser;
    return (
      <section className="profile-section">
        <h4> hello Tatooist: {fullName}</h4>;
        <Dnd />
      </section>
    );
  }
}

export default Profile;
