import React, { Component } from "react";
import axios from "axios";
import "./TattoistList.css";
import { Switch, Route, Link } from "react-router-dom";

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
      .get("http://localhost:5555/api/tattoistList", { withCredentials: true })
      .then(response => {
        this.setState({ tattoistData: response.data });
      })
      .catch(err => {
        console.log("Tattolist Error", err);
        alert("Something went wrong with the tatoo list");
      });
  }
  render() {
    console.log(this.state);
    const { tattoistData } = this.state;
    return (
      <section className="TattoistList">
        <h1>this is the Tattoist list</h1>
        <ul>
          {tattoistData.map(oneTattoist => {
            return (
              <div key={oneTattoist._id} className="Tattoist-box">
                <ls>
                  <div className="tattoistImage">
                    <img src={oneTattoist.picture} alt={oneTattoist.fullName} />
                  </div>
                  <Link to={getTattoistUrl(oneTattoist)}>
                    <h1>{oneTattoist.fullName}</h1>
                  </Link>
                  <h3>{oneTattoist.adress}</h3>
                  <button className="appointmentList">
                    Take An Appointment
                  </button>
                </ls>
              </div>
            );
          })}
        </ul>
      </section>
    );
  }
}

export default TattoistList;
