import React, { Component } from 'react';
import '../css/components/moviePage.css';
import axios from 'axios';
import nl2br from 'react-newline-to-break';

class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: "",
      video: "",
      hover: null
    }
  }

  blurbHover = (e) => {
    this.setState({ hover: e })
  }

  reviewBlurb = [
    {
      criteria: "Enjoyable",
      blurb: `The simplest criteria there is: Did we like watching it? \n\nAn "enjoyable" rating means we liked watching it overall. Even if the ending somehow sucked, it was still a good ride.`
    },
    {
      criteria: "Succeeds at what it intends to do",
      blurb: `A little more nuanced than the rest of the criteria: Was what the film tried to do or be clear, and did it succeed in doing or being that thing?\n\nA successful film doesn't have to be ambitious. Even a barebones slasher fic is a success if it can be a slasher fic without at any point falling flat.`
    },
    {
      criteria: "Memorable",
      blurb: `A film can do everything right, and it can be absolutely enjoyable from beginning to end... but how much of an impact does it have on its audience?\n\nThis is more or less a test of the film's ambition. How unique was it? How much of it can we actually remember after seeing it?\n\nA memorable film is one that for any reason has staying power.`
    },
    {
      criteria: "Easy to recommend",
      blurb: `A movie that's easy to recommend is one with at least somewhat of a strong sense of appeal to a general audience.\n\nHow comfortable would we be recommending this film to other friends? How sure are we that they'd like it, instead of it being a little too niche?`
    },
    {
      criteria: "Rewatchable",
      blurb: `A little self-explanatory. A rewatchable film is one we'd have no qualms about watching again. Or maybe we've already watched it hundreds of times and are still good for another.\n\nNote: A film can still be good even if it isn't considered rewatchable. Some are even fantastic, but are so neatly-wrapped up that there wouldn't be much to gain from watching it again.`
    },
  ]

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
    }).finally(() => {
      setTimeout(() => {
        this.props.backDrop(`https://image.tmdb.org/t/p/w1280${this.props.moviePick.backdrop_path}`)
      }, 1100)
      // this.props.loading(false)
    })
  }

  render() {
    return (
      <React.Fragment>
        <article className="moviePage">
          <p className="clickable" onMouseDown={() => {
            this.props.callback(null)
            this.props.backDrop(null)
          }}>Go Back</p>
          <section className="moviePageInfo">
            <div className="titleAndPoster">
              <h2>{(this.props.moviePick.title === "زیر سایه") ? "Under the Shadow" : `${this.props.moviePick.title}`} ({this.props.moviePick.release_date.slice(0, 4)})</h2>
              <img className="moviePagePoster" src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${this.props.moviePick.poster_path}`} alt={`Movie poster for ${this.props.moviePick.title}`} />
            </div>
            <div className="movieDeets">
              <div className="trailerContainer">
                <iframe title={`Trailer for ${this.props.moviePick.title}`} src={`https://www.youtube-nocookie.com/embed/${this.state.video}`} frameBorder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true} modestbranding="true"></iframe>
              </div>
              <p>Overview: {this.props.moviePick.overview}</p>
              <p>Language: {this.state.language}</p>
              <p>TMDB Rating: {this.props.moviePick.vote_average} ({this.props.moviePick.vote_count} votes)</p>
            </div>
          </section>
          <section className="pkReviews">
            <div className="reviewChart">
              <div className="movieReviewChart">
                <h4>Paul:</h4>
                <ul>
                  <li onMouseOver={() => { this.blurbHover(0) }} onMouseLeave={() => { this.blurbHover(null) }}>{(this.props.movieReviews.reviews.Paul.Enjoyable) ? <img src="./assets/yes.png" alt={`Yes, the movie was enjoyable`} /> : <img src="./assets/no.png" alt={`No, the movie wasn't enjoyable`} />}<h6>Enjoyable</h6></li>
                  <li onMouseOver={() => { this.blurbHover(1) }} onMouseLeave={() => { this.blurbHover(null) }}>{(this.props.movieReviews.reviews.Paul.Successful) ? <img src="./assets/yes.png" alt={`Yes, the movie is successful`} /> : <img src="./assets/no.png" alt={`No, the movie isn't successful`} />}<h6>Successful</h6></li>
                  <li onMouseOver={() => { this.blurbHover(2) }} onMouseLeave={() => { this.blurbHover(null) }}>{(this.props.movieReviews.reviews.Paul.Memorable) ? <img src="./assets/yes.png" alt={`Yes, the movie was memorable`} /> : <img src="./assets/no.png" alt={`No, the movie wasn't memorable`} />}<h6>Memorable</h6></li>
                  <li onMouseOver={() => { this.blurbHover(3) }} onMouseLeave={() => { this.blurbHover(null) }}>{(this.props.movieReviews.reviews.Paul.Recommendable) ? <img src="./assets/yes.png" alt={`Yes, the movie is recommendable`} /> : <img src="./assets/no.png" alt={`No, the movie isn't recommendable`} />}<h6>Recommended</h6></li>
                  <li onMouseOver={() => { this.blurbHover(4) }} onMouseLeave={() => { this.blurbHover(null) }}>{(this.props.movieReviews.reviews.Paul.Rewatchable) ? <img src="./assets/yes.png" alt={`Yes, the movie is rewatchable`} /> : <img src="./assets/no.png" alt={`No, the movie isn't rewatchable`} />}<h6>Rewatchable</h6></li>
                </ul>
              </div>
              <div className="movieReviewChart">
                <h4>Kyle:</h4>
                <ul>
                  <li onMouseOver={() => { this.blurbHover(0) }} onMouseLeave={() => { this.blurbHover(null) }}>{(this.props.movieReviews.reviews.Kyle.Enjoyable) ? <img src="./assets/yes.png" alt={`Yes, the movie was enjoyable`} /> : <img src="./assets/no.png" alt={`No, the movie wasn't enjoyable`} />}<h6>Enjoyable</h6></li>
                  <li onMouseOver={() => { this.blurbHover(1) }} onMouseLeave={() => { this.blurbHover(null) }}>{(this.props.movieReviews.reviews.Kyle.Successful) ? <img src="./assets/yes.png" alt={`Yes, the movie is successful`} /> : <img src="./assets/no.png" alt={`No, the movie isn't successful`} />}<h6>Successful</h6></li>
                  <li onMouseOver={() => { this.blurbHover(2) }} onMouseLeave={() => { this.blurbHover(null) }}>{(this.props.movieReviews.reviews.Kyle.Memorable) ? <img src="./assets/yes.png" alt={`Yes, the movie was memorable`} /> : <img src="./assets/no.png" alt={`No, the movie wasn't memorable`} />}<h6>Memorable</h6></li>
                  <li onMouseOver={() => { this.blurbHover(3) }} onMouseLeave={() => { this.blurbHover(null) }}>{(this.props.movieReviews.reviews.Kyle.Recommendable) ? <img src="./assets/yes.png" alt={`Yes, the movie is recommendable`} /> : <img src="./assets/no.png" alt={`No, the movie isn't recommendable`} />}<h6>Recommended</h6></li>
                  <li onMouseOver={() => { this.blurbHover(4) }} onMouseLeave={() => { this.blurbHover(null) }}>{(this.props.movieReviews.reviews.Kyle.Rewatchable) ? <img src="./assets/yes.png" alt={`Yes, the movie is rewatchable`} /> : <img src="./assets/no.png" alt={`No, the movie isn't rewatchable`} />}<h6>Rewatchable</h6></li>
                </ul>
              </div>
            </div>
            <div className="reviewToolTip">
              {(this.state.hover !== null) ?
                <h5>{this.reviewBlurb[this.state.hover]["criteria"]}</h5>
                : null}

              {(this.state.hover !== null) ?
                <p>{nl2br(this.reviewBlurb[this.state.hover]["blurb"])}</p>
                : null}
            </div>
          </section>
          <section className="movieChat">
            <p>{this.props.movieReviews.reviews.Chat}</p>
          </section>
        </article >
      </React.Fragment >
    )
  }
}

export default Movie;