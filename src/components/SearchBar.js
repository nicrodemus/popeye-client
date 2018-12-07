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
        // Get the function onUserInput given by app.js to send the search query to app.js
        const { onUserInput } = this.props;
        onUserInput(this.state.city);

        
        this.setState({isSubmitSuccessful: true})
    
        // PUT and POST requests receive a 2nd argument: the info to submit
        // (we are submitting the state we've gathered from the form)
      
      }

  render() {

    console.log(this.props)

    if (this.state.isSubmitSuccessful) {
        // redirect back to the phone list page if the form submission worked
        return <Redirect to="/tattoistlist" />;
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
