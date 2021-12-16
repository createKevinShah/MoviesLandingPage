import React, { useEffect } from 'react'

const ToggleButton = () => {
  const theme = window.localStorage.getItem('theme')

  useEffect(() => {
    theme === 'dark'
      ? document.documentElement.setAttribute('data-theme', 'dark')
      : document.documentElement.setAttribute('data-theme', 'light')
  }, [theme])

  const applytransition = () => {
    document.documentElement.classList.add('transition')
    window.setTimeout(() => {
      document.documentElement.classList.remove('transition')
    }, 1000)
  }

  const handleChange = (event) => {
    const isDarkThemeApplied = event.target.checked
    if (isDarkThemeApplied) {
      applytransition()
      window.localStorage.setItem('theme', 'dark')
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      applytransition()
      window.localStorage.setItem('theme', 'light')
      document.documentElement.setAttribute('data-theme', 'light')
    }
  }

  return (
    <div className='container'>
      <div className='toggle-container'>
        <input
          type='checkbox' id='switch' name='theme'
          defaultChecked={theme === 'dark'}
          onChange={(e) => handleChange(e)}
        />
        <label htmlFor='switch'>Toggle</label>
      </div>
    </div>
  )
}

export default ToggleButton
