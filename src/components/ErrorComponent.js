import React from 'react'
import ErrorImage from './../images/errorImage.jpg'
import '../App.css'

const ErrorComponent = (props) => {
  const { errorMessage } = props

  return (
    <div className='errorClass'>
      <img src={ErrorImage} alt='error' />
      <h6 style={{ textAlign: 'center' }}>{errorMessage}</h6>
    </div>
  )
}

export default ErrorComponent
