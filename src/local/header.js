import React, { Component } from 'react';
import {Link} from 'react-router-dom';

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
          // window.scrollTo(0, 0)
        }}>
          <Link to="/">PAUL AND KYLE'S <wbr />HORROR MOVIE LIST</Link>
        </h1>
      </header>
    )
  }
}

export default Header;