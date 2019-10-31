import React, { Component } from 'react';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    return (
      <header>
        <h1 className="clickable" onMouseDown={() => {
          this.props.callback(null)
          this.props.backDrop(null)
          window.scrollTo(0, 0)
        }}>PAUL AND KYLE'S <wbr />HORROR MOVIE LIST</h1>
        {(this.props.moviePageActive) ?
          <div className="headerBlurb">
            <h4>For every month for over five years, two best friends have gotten together to find a new horror-themed movie to review, with an eye for overlooked gems or overrated trash.</h4>
            <h4>Explore the site to discover movies that might interest you! Everything is rated based on five criteria: Enjoyability, Success, Memorability, Recommendability, and Rewatchability. We'll also provide our post-movie discussion on what we thought of the film.</h4>
            <h4>This is a work in progress (especially the style), so expect major changes and additions soon!</h4>
            <h4>And of course, Happy Halloween!</h4>
          </div>
          : null}
      </header>
    )
  }
}

export default Header;