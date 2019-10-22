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

  setBackDrop = (img) => {
    this.props.backDrop(img)
    console.log(`set bg to ${img}`)
  }

  render() {
    return (
      <React.Fragment>
        <CSSTransition
          in={this.state.loaded}
          timeout={100}
          classNames="cardLoadFade">
          <figure className="card" id={`card${this.props.cardNumber}`} onMouseOver={() => {
            if (this.props.ready) {
              this.setBackDrop(`https://image.tmdb.org/t/p/w1280${this.props.moviePick.backdrop_path}`)
            } else {
              setTimeout(() => {
                if (this.props.ready) {
                  this.setBackDrop(`https://image.tmdb.org/t/p/w1280${this.props.moviePick.backdrop_path}`)
                }
              }, 1000)
            }
          }} onMouseLeave={() => { this.setBackDrop(null) }}>
            <div className="cardTitle">
              <h4>{`${this.props.moviePick.title}`}</h4>
              <h4>{`(${this.props.moviePick.release_date.slice(0, 4)})`}</h4>
            </div>
            <div className="imageContainer">
              <img src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${this.props.moviePick.poster_path}`} alt={`Movie poster for ${this.props.moviePick.title}`} />
              <figcaption>
                <h4>Rating</h4>
                <h5>Click for review</h5>
              </figcaption>
            </div>
            <h5>{`P & K RATING: ___`}</h5>
            <h6>Language: {this.props.language}</h6>
            <h6><a href={`https://www.themoviedb.org/movie/${this.props.moviePick.id}`} target="_blank" rel="noopener noreferrer">TMDB Rating:</a> {this.props.moviePick.vote_average}/10</h6>
          </figure>
        </CSSTransition>
      </React.Fragment>
    )
  }
}

export default MovieCard;