import React, { Component } from "react";
import { Link } from "react-router-dom";

class NotFound extends Component {

    render() { 
        return ( 
        <section className="NotFound">
        <h2>404 Not Found</h2>
        <p>Sorry, the page you are looking for doesn't exist.</p>

        <p>
            <Link to="/">Return to Home</Link>
        </p>
        </section> 
        );
    }
}
 
export default NotFound;