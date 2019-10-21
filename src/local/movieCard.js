import React, { Component } from 'react';

class MovieCard extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div className="card">
        <img src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${this.props.moviePick.poster_path}`} alt="" />
        <h4>{`${this.props.moviePick.title} (${this.props.moviePick.release_date.slice(0, 4)})`}</h4>
        <h5>Language: {this.props.language}</h5>
        <h6>Rating: {this.props.moviePick.vote_average}/10</h6>
      </div>
    )
  }
}

export default MovieCard;