import React from 'react'
import ToggleButton from './ToggleButton'
import '../App.css'

const SearchBar = (props) => {
  const { setQuery } = props

  const handleRefresh = () => {
    window.location.reload(false)
  }

  const setFieldValue = (e) => {
    setQuery(e.target.value)
  }

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>
              <div className='searchbar-input-group'>

                <input
                  type='search' className='form-control rounded' placeholder='Search' aria-label='Search'
                  aria-describedby='search-addon'
                  onChange={e => setFieldValue(e)}
                />
                                &nbsp;
                                &nbsp;
                <button type='button' className='btn btn-light search-button'>
                  <i className='fas fa-search' />
                </button>
                                &nbsp;
                                &nbsp;

                <button type='button' className='btn btn-light refresh-button' onClick={handleRefresh}>
                  <i className='fa fa-refresh' />
                </button>

                                &nbsp;
                                &nbsp;
                                &nbsp;

              </div>
            </th>

            <th>
              <ToggleButton />
            </th>
          </tr>
        </tbody>
      </table>

    </div>
  )
}

export default SearchBar
