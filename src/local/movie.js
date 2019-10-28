import React, { Component } from 'react';
import './../css/style.css'

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
        <main class="moviePage">
          <p className="clickable" onMouseDown={()=>{
            this.props.callback(null)
            this.props.backgroundCB(null)
            }}>Go Back</p>
        </main>
      </React.Fragment>
    )
  }
}

export default Movie;