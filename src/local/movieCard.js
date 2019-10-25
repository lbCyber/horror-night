import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group'
import './../css/style.css'
import axios from 'axios'

class MovieCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      hover: false,
      review: {},
      Paul: "",
      Kyle: ""
    }
  }

  componentWillMount() {
    const img = new Image();
    img.src = `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${this.props.moviePick.poster_path}`
  }

  componentDidMount() {
    axios({
      url: './json/reviews.json',
      method: 'GET',
      dataType: 'json'
    }).then(response => {
      const movies = response.data
      const findMovie = (r) => {
        return r.id === this.props.moviePick.id
      }
      this.setState({ review: movies.find(findMovie) })
    }).then(() => {
      this.sumReview("Paul")
      this.sumReview("Kyle")
      setTimeout(() => {
        this.setState({
          loaded: true
        })
      },
        this.props.cardNumber * 75
      )
    })
  }

  sumReview = function (r) {
    const result = (
      this.state.review.reviews[r]["Enjoyable"] +
      this.state.review.reviews[r]["Memorable"] +
      this.state.review.reviews[r]["Recommendable"] +
      this.state.review.reviews[r]["Rewatchable"] +
      this.state.review.reviews[r]["Successful"]
    )
    const reviewer = r
    this.setState({
      [reviewer]: result
    })
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
          <figure className="card" id={`card${this.props.cardNumber}`} onMouseEnter={() => {
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
              <h4>{`${this.props.moviePick.title}`}</h4>
              <h5>{`(${this.props.moviePick.release_date.slice(0, 4)})`}</h5>
            </div>
            <div className="imageContainer">
              <img src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${this.props.moviePick.poster_path}`} alt={`Movie poster for ${this.props.moviePick.title}`} />
              <figcaption>
                <h4>{`Rating: ${this.state.Paul + this.state.Kyle}/10`}</h4>
                <h5>Click for review</h5>
              </figcaption>
            </div>
            <div className="pkRatings">
              <h5>{`Paul: ${this.state.Paul}/5`}</h5>
              <h5>{`Kyle: ${this.state.Kyle}/5`}</h5>
            </div>
            <h6>Language: {this.props.language}</h6>
            <h6>TMDB Rating: {this.props.moviePick.vote_average}/10</h6>
          </figure>
        </CSSTransition>
      </React.Fragment>
    )
  }
}

export default MovieCard;