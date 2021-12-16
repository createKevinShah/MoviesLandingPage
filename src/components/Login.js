import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../App.css'

const Login = () => {
  const navigate = useNavigate()

  const [usernameError, setUsernameError] = useState(undefined)
  const [finalUsername, setFinalUsername] = useState(undefined)
  const [passwordError, setPasswordError] = useState(undefined)
  const [finalPassword, setFinalPassword] = useState(undefined)

  const validateUsername = (e) => {
    const username = e.target.value
    if (username === '') {
      setUsernameError('Username cannot be empty')
    } else {
      setUsernameError('')
      setFinalUsername(username)
    }
  }

  const validatePassword = (e) => {
    const password = e.target.value
    if (password === '') {
      setPasswordError('Password cannot be empty')
    } else if (password.length < 8) {
      setPasswordError('Password cannot be less than 8 characters')
    } else {
      setPasswordError('')
      setFinalPassword(password)
    }
  }

  const disableButton = () => {
    if ((usernameError === '') && (passwordError === '')) {
      return false
    }
    return true
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleOnSubmit()
    }
  }

  const handleOnSubmit = (event) => {
    event.preventDefault()
    axios.post('https://demo.credy.in/api/v1/usermodule/login/', {
      username: finalUsername,
      password: finalPassword
    })
      .then(({ data }) => {
        localStorage.setItem('token', data.data.token) //eslint-disable-line
        onSubmitted()
      })
      .catch(({ response }) => {
        if (!response.data.is_success) {
          if (response.data.error.code === 'invalid_login_credentials') {
            alert('Invalid login credentials. Please enter valid username and password.') //eslint-disable-line
          } else {
            alert('Please enter valid username and password.') //eslint-disable-line
          }
        }
      })
  }

  const onSubmitted = () => {
    navigate('/movies')
  }

  return (
    <div>
      <form className='loginForm'>
        <h3 className='h3login'>Login</h3>
        <hr style={{ color: '#fca311', height: '3px' }} />
        <div className='form-group'>
          <p style={{ color: '#fca311' }}>Username</p>
          <input
            type='text' className='form-control' placeholder='Enter username'
            onChange={(e) => validateUsername(e)}
          />
        </div>

        <span className='Error'>{usernameError}</span>

        <div className='form-group'>
          <p style={{ color: '#fca311' }}>Password</p>
          <input
            type='password' className='form-control' placeholder='Enter password'
            onChange={(e) => validatePassword(e)}
          />
        </div>

        <span className='Error'>{passwordError} </span>

        <button
          style={{ backgroundColor: '#fca311' }}
          type='submit' className='btn btn-dark btn-lg btn-block'
          disabled={disableButton()}
          onKeyPress={(e) => handleKeyPress(e)}
          onClick={(e) => handleOnSubmit(e)}
        >
          Sign in
        </button>

      </form>
    </div>
  )
}

export default Login
