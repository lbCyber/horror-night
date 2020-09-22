import React, { Component } from 'react';
import axios from 'axios';
import nl2br from 'react-newline-to-break';
import { Link } from "react-router-dom";

class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: "",
      video: "",
      hover: null,
      hoverReviewer: null
    }
  }

  blurbHover = (c, r = null) => {
    this.setState({
      hover: this.reviewBlurb[c],
      hoverReviewer: r
    })
  }

  reviewBlurb = [
    {
      criteria: "Enjoyable",
      criteriaShort: "enjoyable",
      keyName: "Enjoyable",
      blurb: `The simplest criteria there is: Did we like watching it? \n\nAn "enjoyable" rating means we enjoyed the overall experience the film offered. Even if the ending somehow sucked, it was still a good ride.`
    },
    {
      criteria: "Succeeds at what it intends to do",
      criteriaShort: "successful",
      keyName: "Successful",
      blurb: `A little more nuanced than the rest of the criteria: Was what the film tried to do or be clear, and did it succeed in doing or being that thing?\n\nA successful film doesn't have to be ambitious. Even a barebones slasher fic is a success if it can be a slasher fic without at any point falling flat.`
    },
    {
      criteria: "Memorable",
      criteriaShort: "memorable",
      keyName: "Memorable",
      blurb: `A film can do everything right, and it can be absolutely enjoyable from beginning to end... but how much of an impact does it have on its audience?\n\nThis is more or less a test of the film's ambition. How unique was it? How much of it can we actually remember after seeing it?\n\nA memorable film is one that for any reason has staying power.`
    },
    {
      criteria: "Easy to recommend",
      criteriaShort: "easy to recommend",
      keyName: "Recommendable",
      blurb: `A movie that's easy to recommend is one with at least somewhat of a strong sense of appeal to a general audience.\n\nHow comfortable would we be recommending this film to other friends? How sure are we that they'd like it, instead of it being a little too niche?`
    },
    {
      criteria: "Rewatchable",
      criteriaShort: "rewatchable",
      keyName: "Rewatchable",
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
      window.scrollTo(0, 0)
      // this.props.loading(false)
    })
  }

  render() {
    return (
        <article className="moviePage">
          <div>
            <Link to="/" className="goBack clickable" onMouseDown={() => {
              this.props.callback(null)
              this.props.backDrop(null)
              // window.scrollTo(0, 0)
            }}>&gt; Return to the main menu</Link>
          </div>
          <section className="moviePageInfo">
            <h2>{(this.props.moviePick.title === "زیر سایه") ? "Under the Shadow" : `${this.props.moviePick.title}`} ({this.props.moviePick.release_date.slice(0, 4)})</h2>
            <div className="movieInfoContainer">
              <img className="moviePagePoster" src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${this.props.moviePick.poster_path}`} alt={`Movie poster for ${this.props.moviePick.title}`} />
              <iframe className="trailer" title={`Trailer for ${this.props.moviePick.title}`} src={`https://www.youtube-nocookie.com/embed/${this.state.video}`} frameBorder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true} modestbranding="true"></iframe>
              <div className="movieDeets">
                <div className="deetTopInfo">
                  <p><span className="deetHeader">Language: </span> {this.state.language}</p>
                  <p><span className="deetHeader"><a href={`https://www.themoviedb.org/movie/${this.props.moviePick.id}`} target="_blank" rel="noopener noreferrer">TMDB Rating:</a> </span> {this.props.moviePick.vote_average} ({this.props.moviePick.vote_count} votes)</p>
                </div>
                <div className="movieOverview"><p className="deetHeader overviewHeader">Overview: </p> <p className="overviewText">{this.props.moviePick.overview}</p></div>
              </div>
            </div>
          </section>
          <section className="pkReviews">
            <div className="reviewChart">
              <div className="movieReviewChart">
                <h4>Paul:</h4>
                <ul>
                  <li onMouseOver={() => { this.blurbHover(0, "Paul") }} onMouseLeave={() => { this.blurbHover(null) }}>{(this.props.movieReviews.reviews.Paul.Enjoyable) ? <img src="./assets/yes.png" alt={`Paul found the movie enjoyable`} /> : <img src="./assets/no.png" alt={`Paul didn't find the movie enjoyable`} />}<h6>Enjoyable</h6></li>
                  <li onMouseOver={() => { this.blurbHover(1, "Paul") }} onMouseLeave={() => { this.blurbHover(null) }}>{(this.props.movieReviews.reviews.Paul.Successful) ? <img src="./assets/yes.png" alt={`Paul found the movie successful`} /> : <img src="./assets/no.png" alt={`Paul didn't find the movie successful`} />}<h6>Successful</h6></li>
                  <li onMouseOver={() => { this.blurbHover(2, "Paul") }} onMouseLeave={() => { this.blurbHover(null) }}>{(this.props.movieReviews.reviews.Paul.Memorable) ? <img src="./assets/yes.png" alt={`Paul found the movie memorable`} /> : <img src="./assets/no.png" alt={`Paul didn't find the movie memorable`} />}<h6>Memorable</h6></li>
                  <li onMouseOver={() => { this.blurbHover(3, "Paul") }} onMouseLeave={() => { this.blurbHover(null) }}>{(this.props.movieReviews.reviews.Paul.Recommendable) ? <img src="./assets/yes.png" alt={`Paul found the movie recommendable`} /> : <img src="./assets/no.png" alt={`Paul didn't find the movie recommendable`} />}<h6>Recommended</h6></li>
                  <li onMouseOver={() => { this.blurbHover(4, "Paul") }} onMouseLeave={() => { this.blurbHover(null) }}>{(this.props.movieReviews.reviews.Paul.Rewatchable) ? <img src="./assets/yes.png" alt={`Paul found the movie rewatchable`} /> : <img src="./assets/no.png" alt={`Paul didn't find the movie rewatchable`} />}<h6>Rewatchable</h6></li>
                </ul>
              </div>
              <div className="movieReviewChart">
                <h4>Kyle:</h4>
                <ul>
                  <li onMouseOver={() => { this.blurbHover(0, "Kyle") }} onMouseLeave={() => { this.blurbHover(null) }}>{(this.props.movieReviews.reviews.Kyle.Enjoyable) ? <img src="./assets/yes.png" alt={`Kyle found the movie enjoyable`} /> : <img src="./assets/no.png" alt={`Kyle didn't find the movie enjoyable`} />}<h6>Enjoyable</h6></li>
                  <li onMouseOver={() => { this.blurbHover(1, "Kyle") }} onMouseLeave={() => { this.blurbHover(null) }}>{(this.props.movieReviews.reviews.Kyle.Successful) ? <img src="./assets/yes.png" alt={`Kyle found the movie successful`} /> : <img src="./assets/no.png" alt={`Kyle didn't find the movie successful`} />}<h6>Successful</h6></li>
                  <li onMouseOver={() => { this.blurbHover(2, "Kyle") }} onMouseLeave={() => { this.blurbHover(null) }}>{(this.props.movieReviews.reviews.Kyle.Memorable) ? <img src="./assets/yes.png" alt={`Kyle found the movie memorable`} /> : <img src="./assets/no.png" alt={`Kyle didn't find the movie memorable`} />}<h6>Memorable</h6></li>
                  <li onMouseOver={() => { this.blurbHover(3, "Kyle") }} onMouseLeave={() => { this.blurbHover(null) }}>{(this.props.movieReviews.reviews.Kyle.Recommendable) ? <img src="./assets/yes.png" alt={`Kyle found the movie recommendable`} /> : <img src="./assets/no.png" alt={`Kyle didn't find the movie recommendable`} />}<h6>Recommended</h6></li>
                  <li onMouseOver={() => { this.blurbHover(4, "Kyle") }} onMouseLeave={() => { this.blurbHover(null) }}>{(this.props.movieReviews.reviews.Kyle.Rewatchable) ? <img src="./assets/yes.png" alt={`Kyle found the movie rewatchable`} /> : <img src="./assets/no.png" alt={`Kyle didn't find the movie rewatchable`} />}<h6>Rewatchable</h6></li>
                </ul>
              </div>
            </div>
            <div className="reviewToolTip">
              {(this.state.hover !== null && this.state.hover !== undefined) ?
                <div className="reviewToolTipContent hoverToolTip" aria-hidden>
                  <h5>{this.state.hover["criteria"]}</h5>
                  <p>{nl2br(this.state.hover["blurb"])}</p>
                  {(this.props.movieReviews.reviews[this.state.hoverReviewer][this.state.hover["keyName"]]) ?
                    <p className="green">{this.state.hoverReviewer} found {this.props.moviePick.title} {this.state.hover["criteriaShort"]}</p>
                    : <p className="red">{this.state.hoverReviewer} did not find {this.props.moviePick.title} {this.state.hover["criteriaShort"]}</p>
                  }
                </div>
                : null}
              <div className="reviewToolTipContent noHoverToolTip">
                <h2 className="legend">Legend</h2>
                {this.reviewBlurb.map((movieCriteria,key) => {
                  return (
                    <div className="noHoverCriteria" key={key}>
                      <h4>{movieCriteria["criteria"]}</h4>
                      <p>{nl2br(movieCriteria["blurb"])}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>
          <section className="movieChat">
            <h2>Discussion</h2>
            {(this.props.movieReviews.reviews.Chat.length > 0) ?
              <p className="chat">this.props.movieReviews.reviews.Chat</p>
              : <p className="comingSoon">Coming soon, promise!</p>
            }
          </section>
          <div>
            <Link to="/" className="goBack clickable" onMouseDown={() => {
              this.props.callback(null)
              this.props.backDrop(null)
              // window.scrollTo(0, 0)
            }}>&gt; Return to the main menu</Link>
          </div>
        </article>
    )
  }
}

export default Movie;