import React, { Component } from 'react';
import LoadingModal from './local/loadingModal'
import Swal from 'sweetalert2'
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      apiData: {}
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

  componentDidMount() {
    axios({
      url: 'https://api.themoviedb.org/3/list/124382',
      method: 'GET',
      dataType: 'json',
      params: {
        'api_key': '9c167d58adbd031f02b8a3cbcf7273c1'
      }
    }).then(response => {
      this.setState({apiData: response.data.items})
    }).catch(error => {  // If nothing matched, something went wrong on your end!
      console.log(error)
      this.warningFire(`Something went wrong on our end! Please wait a moment, and try your search again!`)
    }).finally(()=> {
      this.setState({loading:false})
    })
  }
  render() {
    return (
      <React.Fragment>
        {this.state.loading ?
          <LoadingModal />
          : null
        }
      </React.Fragment>
    )
  }
}

export default App;