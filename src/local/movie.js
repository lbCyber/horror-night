import React, { Component } from 'react';
import '../css/components/moviePage.css';
import axios from 'axios'

class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: "",
      video: ""
    }
  }

  componentDidMount() {
    const langCompare = (language) => {
      return language.iso_639_1 === this.props.moviePick.original_language;
    }
    const output = this.props.languages.find(langCompare);
    this.setState({ language: output["english_name"] })
    axios({
      url: `https://api.themoviedb.org/3/movie/${this.props.moviePick.id}/videos`,
      method: 'GET',
      dataType: 'json',
      params: { 'api_key': '9c167d58adbd031f02b8a3cbcf7273c1' },
      language: `"${this.props.moviePick.original_language}"`
    }).then(response => {
      const findYouTube = (v) => {
        return (v.site === "YouTube" && v.type === "Trailer")
      }
      const youTubeTrailer = response.data.results.find(findYouTube)
      this.setState({ video: youTubeTrailer.key })
    }).then(() => {
      if (this.state.video === "6qCqrODw1nM") { // Babysitter
        this.setState({ video: "CQTEUd-5JMQ" })
      }
    })
  }

  render() {
    return (
      <React.Fragment>
        <article className="moviePage">
          <p className="clickable" onMouseDown={() => {
            this.props.callback(null)
            this.props.backgroundCB(null)
          }}>Go Back</p>
          <section className="moviePageInfo">
            <div className="titleAndPoster">
              <h2>{this.props.moviePick.title} ({this.props.moviePick.release_date.slice(0, 4)})</h2>
              <img className="moviePagePoster" src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${this.props.moviePick.poster_path}`} alt={`Movie poster for ${this.props.moviePick.title}`} />
            </div>
            <div className="movieDeets">
              <div className="trailerContainer">
                <iframe title={`Trailer for ${this.props.moviePick.title}`} src={`https://www.youtube-nocookie.com/embed/${this.state.video}`} frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen modestbranding></iframe>
              </div>
              <p>Overview: {this.props.moviePick.overview}</p>
              <p>Language: {this.state.language}</p>
              <p>TMDB Rating: {this.props.moviePick.vote_average} ({this.props.moviePick.vote_count} votes)</p>
            </div>
          </section>
          <section className="pkReviews">
            <div className="movieReviewChart">
              <h4>Paul:</h4>
              <ul>
                <li>{(this.props.movieReviews.reviews.Paul.Enjoyable) ? <img src="./assets/yes.png" alt={`Yes, the movie was enjoyable`} /> : <img src="./assets/no.png" alt={`No, the movie wasn't enjoyable`} />}<h6>Enjoyable</h6></li>
                <li>{(this.props.movieReviews.reviews.Paul.Successful) ? <img src="./assets/yes.png" alt={`Yes, the movie is successful`} /> : <img src="./assets/no.png" alt={`No, the movie isn't successful`} />}<h6>Successful</h6></li>
                <li>{(this.props.movieReviews.reviews.Paul.Memorable) ? <img src="./assets/yes.png" alt={`Yes, the movie was memorable`} /> : <img src="./assets/no.png" alt={`No, the movie wasn't memorable`} />}<h6>Memorable</h6></li>
                <li>{(this.props.movieReviews.reviews.Paul.Recommendable) ? <img src="./assets/yes.png" alt={`Yes, the movie is recommendable`} /> : <img src="./assets/no.png" alt={`No, the movie isn't recommendable`} />}<h6>Recommendable</h6></li>
                <li>{(this.props.movieReviews.reviews.Paul.Rewatchable) ? <img src="./assets/yes.png" alt={`Yes, the movie is rewatchable`} /> : <img src="./assets/no.png" alt={`No, the movie isn't rewatchable`} />}<h6>Rewatchable</h6></li>
              </ul>
            </div>
            <div className="movieReviewChart">
              <h4>Kyle:</h4>
              <ul>
                <li>{(this.props.movieReviews.reviews.Kyle.Enjoyable) ? <img src="./assets/yes.png" alt={`Yes, the movie was enjoyable`} /> : <img src="./assets/no.png" alt={`No, the movie wasn't enjoyable`} />}<h6>Enjoyable</h6></li>
                <li>{(this.props.movieReviews.reviews.Kyle.Successful) ? <img src="./assets/yes.png" alt={`Yes, the movie is successful`} /> : <img src="./assets/no.png" alt={`No, the movie isn't successful`} />}<h6>Successful</h6></li>
                <li>{(this.props.movieReviews.reviews.Kyle.Memorable) ? <img src="./assets/yes.png" alt={`Yes, the movie was memorable`} /> : <img src="./assets/no.png" alt={`No, the movie wasn't memorable`} />}<h6>Memorable</h6></li>
                <li>{(this.props.movieReviews.reviews.Kyle.Recommendable) ? <img src="./assets/yes.png" alt={`Yes, the movie is recommendable`} /> : <img src="./assets/no.png" alt={`No, the movie isn't recommendable`} />}<h6>Recommendable</h6></li>
                <li>{(this.props.movieReviews.reviews.Kyle.Rewatchable) ? <img src="./assets/yes.png" alt={`Yes, the movie is rewatchable`} /> : <img src="./assets/no.png" alt={`No, the movie isn't rewatchable`} />}<h6>Rewatchable</h6></li>
              </ul>
            </div>
          </section>
        </article>
        <article className="movieChat">
          <p>{this.props.movieReviews.reviews.Chat}</p>
        </article>
      </React.Fragment>
    )
  }
}

export default Movie;