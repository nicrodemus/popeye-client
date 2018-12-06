import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";


class SearchBar extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          city: "",
          isSubmitSuccessful: false,
        };
      }
    
      genericSync(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
      }

    
      handleSubmit(event) {
        // stop the page refresh
        event.preventDefault();
    
        // PUT and POST requests receive a 2nd argument: the info to submit
        // (we are submitting the state we've gathered from the form)
        axios.get(
          "http://localhost:5555/api/search-result",
          this.state,
          { withCredentials: true }, // FORCE axios to send cookies across domains
        )
          .then(response => {
            console.log("Search city", response.data);
            this.setState({ isSubmitSuccessful: true });
          })
          .catch(err => {
            console.log("Add Phone ERROR", err);
            alert("Sorry! Something went wrong.");
          });
      }

  render() {
    if (this.state.isSubmitSuccessful) {
        // redirect back to the phone list page if the form submission worked
        return <Redirect to="/search-result" />;
      }
    return (
      <section className="SearchBar">
        <h2>Search Bar</h2>
        <p>Welcome to Popeye platform!</p>
         <form onSubmit={event => this.handleSubmit(event)}>
          <label>
            <input value={this.state.city}
                onChange={event => this.genericSync(event)}
                type="text" name="city" placeholder="Type your city"/>
          </label>

          <button>Search</button>
        </form>
      </section>
      
    );
  }
}

export default SearchBar;
