import React, { Component } from 'react';
import LoadingModal from './local/loadingModal'
import Swal from 'sweetalert2'
import axios from 'axios'
import MovieCard from './local/movieCard'
import Languages from './local/languages'
import './css/style.css'
import { CSSTransition } from 'react-transition-group'
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Movie from './local/movie'
import Footer from './local/footer'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      apiData: [],
      languages: Languages,
      back: null,
      backFadeOut: false
    }
  }

  warningFire = (warning) => {
    Swal.fire({
      title: 'Oops!',
      text: warning,
      type: 'error',
      confirmButtonText: 'Okay'
    })
  }

  bgCallBack = (bg) => {
    if (bg === null) {
      this.setState({ backFadeOut: true })
      setTimeout(() => {
        this.setState({
          back: bg,
          backFadeOut: false
        })
      }, 1000)
    } else {
      this.setState({
        back: bg
      })
      setTimeout(() => {
        this.setState({
          backFadeOut: false
        })
      }, 1000)
    }
  }

  pickLanguage = function (lang) {
    //Return true/false if language exists in json file
    const langCompare = function (language) {
      return language.iso_639_1 === lang;
    }
    const output = this.state.languages.find(langCompare); //Find the language
    return `${output["english_name"]}` //Return English name
  }

  componentDidMount() {
    axios({
      url: 'https://api.themoviedb.org/3/list/124441',
      method: 'GET',
      dataType: 'json',
      params: {
        'api_key': '9c167d58adbd031f02b8a3cbcf7273c1'
      }
    }).then(response => {
      this.setState({ apiData: response.data.items })
    }).catch(error => {  // If nothing matched, something went wrong on your end!
      this.warningFire(`Something went wrong on our end! Please wait a moment, and try your search again!`)
    }).finally(() => {
      this.setState({
        loading: false
      })
    })
  }

  render() {
    return (
      <Router>
        <main>
          <Switch>
            <Route exact path="/">
              <header>
              <h1>PAUL AND KYLE'S HORROR MOVIE LIST</h1>
              </header>
              <CSSTransition
                in={this.state.back !== null && this.state.backFadeOut === false}
                timeout={1000}
                classNames="loadBGFade"
                unmountOnExit>
                <div className="backDrop" style={{ backgroundImage: `radial-gradient(transparent, #000), url("${this.state.back}")` }}></div>
              </CSSTransition>
              <CSSTransition
                in={this.state.loading}
                timeout={500}
                classNames="loadFade"
                unmountOnExit>
                <LoadingModal />
              </CSSTransition>
              <div className="wrapper">
                {this.state.loading === false ?
                  <div className="movieGrid">
                    {
                      this.state.apiData.map((movie, key) => {
                        return (
                          <Link to={`/movie/${movie.id}`} className='cardBox' key={key}>
                            <MovieCard moviePick={movie} language={this.pickLanguage(movie.original_language)} cardNumber={key} backDrop={this.bgCallBack} ready={this.state.backFadeOut === false && this.state.back === null} />
                          </Link>
                        )
                      })
                    }
                  </div>
                  : null
                }
              </div>
            </Route>
            <Route path={`/movie/:movieId`}>
              <Movie movieData={this.state.apiData} />
            </Route>
          </Switch>
        <Footer />
        </main>
      </Router>
    )
  }
}

export default App;