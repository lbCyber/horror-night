import React, { Component } from 'react';
import LoadingModal from './local/loadingModal'
import Swal from 'sweetalert2'
import axios from 'axios'
import MovieCard from './local/movieCard'
import Languages from './local/languages'
import './css/style.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      apiData: [],
      languages: Languages
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

  pickLanguage = function (lang) {
    //Return true/false if language exists in json file
    const langCompare = function (language) {
      return language.iso_639_1 === lang;
    }
    const output = this.state.languages.find(langCompare); //Find the language
    if ((output["name"] === '') || (output["name"] === output["english_name"])) {
      return `${output["english_name"]}` //Return English name if 'name' is blank or if 'name' and 'english_name' match
    } else {
      return `${output["english_name"]} (${output["name"]})` //Return English name
    }
  }

  componentDidMount() {
    axios({
      url: 'https://api.themoviedb.org/3/list/124382',
      method: 'GET',
      dataType: 'json',
      params: {
        'api_key': '9c167d58adbd031f02b8a3cbcf7273c1'
      }
    }).then(response => {
      this.setState({ apiData: response.data.items })
    }).catch(error => {  // If nothing matched, something went wrong on your end!
      console.log(error)
      this.warningFire(`Something went wrong on our end! Please wait a moment, and try your search again!`)
    }).finally(() => {
      this.setState({ loading: false })
    })
  }
  render() {
    return (
      <React.Fragment>
        {this.state.loading ?
          <LoadingModal />
          : null
        }
        <div className="movieGrid">
          {
            this.state.apiData.map((movie, key) => {
              return (
                <MovieCard moviePick={movie} language={this.pickLanguage(movie.original_language)} key={key} />
              )
            })
          }
        </div>
      </React.Fragment>
    )
  }
}

export default App;