import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group'
import './../css/style.css'

class MovieCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    }
  }

  componentWillMount() {
    const img = new Image();
    img.src = `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${this.props.moviePick.poster_path}`
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        loaded: true
      })
    },
      this.props.cardNumber * 75
    )
  }

  render() {
    return (
      <React.Fragment>
          {this.props.ready ?
            <CSSTransition
              in={this.state.loaded}
              timeout={100}
              classNames="cardLoadFade">
              <div className="card" id={`card${this.props.cardNumber}`}>
                <div className="cardTitle">
                  <h4>{`${this.props.moviePick.title}`}</h4>
                  <h4>{`(${this.props.moviePick.release_date.slice(0, 4)})`}</h4>
                </div>
                <img src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${this.props.moviePick.poster_path}`} alt={`Movie poster for ${this.props.moviePick.title}`} />
                <h5>Language: {this.props.language}</h5>
                <h6><a href={`https://www.themoviedb.org/movie/${this.props.moviePick.id}`} target="_blank" rel="noopener noreferrer">TMDB Rating:</a> {this.props.moviePick.vote_average}/10</h6>
              </div>
            </CSSTransition>
            : null
          }
      </React.Fragment>
    )
  }
}

export default MovieCard;