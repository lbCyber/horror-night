import React, { Component } from 'react';
import Header from './header'
import Footer from './footer'
import './../css/style.css'
import { CSSTransition } from 'react-transition-group'
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <main>
          <p>blep</p>
        </main>
        <Footer />
      </React.Fragment>
    )
  }
}

export default Movie;