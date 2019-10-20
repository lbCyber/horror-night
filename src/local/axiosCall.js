import React from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

const MakeCall = () => {
  // creating a variable for sweet alert
  const warningFire = (warning) => {
    Swal.fire({
      title: 'Oops!',
      text: warning,
      type: 'error',
      confirmButtonText: 'Okay'
    })
  }
  return (
    axios({
      url: 'https://api.themoviedb.org/3/list/124382',
      method: 'GET',
      dataType: 'json',
      params: {
        'api_key': '9c167d58adbd031f02b8a3cbcf7273c1'
      }
    }).then(response => {
      return response.data
    }).catch(error => {  // If nothing matched, something went wrong on your end!
      console.log(error)
      warningFire(`Something went wrong on our end! Please wait a moment, and try your search again!`)
    })
  )
}

export default MakeCall;