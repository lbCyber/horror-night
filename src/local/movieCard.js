import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group'

class MovieCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      hover: false,
      Paul: 0,
      Kyle: 0
    }
  }

  componentDidMount() {
    const reviewsum = (arr) => {
      return Object.values(arr).reduce((a,b) => a + b, 0)
    }
    this.setState({
      Paul: reviewsum(this.props.reviewData.reviews["Paul"]),
      Kyle: reviewsum(this.props.reviewData.reviews["Kyle"])
    })
    const img = new Image();
    img.src = `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${this.props.moviePick.poster_path}`
    setTimeout(() => {
      this.setState({ loaded: true })
    },
      this.props.cardNumber * 75
    )
  }

  setBackDrop = (img) => {
    this.props.backDrop(img)
  }

  setHover = (s) => {
    this.setState({
      hover: s
    })
    this.props.backDrop(null)
  }

  render() {
    return (
      <React.Fragment>
        <CSSTransition
          in={this.state.loaded}
          timeout={100}
          classNames="cardLoadFade">
          <figure className="card" tabIndex={this.props.cardNumber + 2} id={`card${this.props.cardNumber}`} onMouseEnter={() => {
            this.setHover(true)
            setTimeout(() => {
              if (this.props.ready && this.state.hover) {
                this.setBackDrop(`https://image.tmdb.org/t/p/w1280${this.props.moviePick.backdrop_path}`)
              }
            }, 1000)
          }} onMouseLeave={() => {
            this.setHover(false)
          }}>
            <div className="cardTitle">
              <h4>{(this.props.moviePick.title === "زیر سایه")?"Under the Shadow":`${this.props.moviePick.title}`}</h4>
              <h5>{`(${this.props.moviePick.release_date.slice(0, 4)})`}</h5>
            </div>
            <div className="imageContainer">
              <img src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${this.props.moviePick.poster_path}`} alt={`Movie poster for ${this.props.moviePick.title}`} />
              <figcaption onMouseDown={() => {
                // this.props.loading(true)
                this.props.callback(this.props.moviePick.id)
                window.scrollTo(0, 0)
              }}>
                <div className="clickReviewBox" >
                  {(this.state.Paul + this.state.Kyle > 5) ?
                  <h4 className="green">{`Rating: ${this.state.Paul + this.state.Kyle}/10`}</h4>
                    : <h4 className="red">{`Rating: ${this.state.Paul + this.state.Kyle}/10`}</h4>
                  }
                  <h5>Click for review</h5>
                </div>
              </figcaption>
            </div>
            <div className="pkRatings">
              {(this.state.Paul > 2) ?
              <h5 className="ratingNumber green">{`Paul: ${this.state.Paul}/5`}</h5>
                : <h5 className="ratingNumber red">{`Paul: ${this.state.Paul}/5`}</h5>}
              {(this.state.Kyle > 2) ?
                <h5 className="ratingNumber green">{`Kyle: ${this.state.Kyle}/5`}</h5>
                : <h5 className="ratingNumber red">{`Kyle: ${this.state.Kyle}/5`}</h5>}
            </div>
            <h6>Language: {this.props.language}</h6>
            <h6><a href={`https://www.themoviedb.org/movie/${this.props.moviePick.id}`} target="_blank" rel="noopener noreferrer">TMDB Rating:</a> {this.props.moviePick.vote_average}/10</h6>
          </figure>
        </CSSTransition>
      </React.Fragment>
    )
  }
}

export default MovieCard;