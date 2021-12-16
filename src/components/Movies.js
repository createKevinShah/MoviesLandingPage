import React, { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import PaginationComponent from './PaginationComponent'
import ErrorComponent from './ErrorComponent'
import SearchBar from './SearchBar'
import { isEmpty, filter, includes } from 'lodash'

const Movies = () => {
  const navigate = useNavigate()

  const [movieDetails, setMovieDetails] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [query, setQuery] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [offset, setOffset] = useState(1)
  const [movieCount, setMovieCount] = useState(null)
  const [expandedMovies, setExpandedMovies] = useState({})

  const isUserLoggedIn = localStorage.getItem('token') //eslint-disable-line

  const getMovieDetails = useCallback(() => {
    axios.get(`https://demo.credy.in/api/v1/maya/movies/?page=${offset}`,
      {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}` //eslint-disable-line
        }
      }
    ).then(async (res) => {
      setErrorMessage('')
      setMovieCount(res.data.count)
      const movies = res.data.results
      const expandedMovieDetails = {}
      const promises = []
      for (const value of movies) {
        const name = value.title
        const finalName = name.replace(/ /g, '+')
        promises.push(axios.get(`https://ui-avatars.com/api/?background=fca311&name=${finalName}`,
          {
            responseType: 'arraybuffer'
          }).then(res => Buffer.from(res.data, 'binary').toString('base64')))
      }
      const movieIcons = await Promise.all(promises)
      movies.forEach((movie, index) => {
        movie.image = movieIcons[index]
        expandedMovieDetails[movie.uuid] = {
          expanded: false
        }
      })
      setMovieDetails(movies)
      setExpandedMovies(expandedMovieDetails)
    })
      .catch((err) => {
        setErrorMessage('Oops! Something went wrong. Please try again.')
        console.log(err)
      }
      )
  }, [offset])

  useEffect(() => {
    getMovieDetails()
  }, [getMovieDetails])

  const handleClick = (event, data) => {
    event.preventDefault()
    const updatedExpandedMovie = {}
    updatedExpandedMovie[data.uuid] = {
      expanded: !expandedMovies[data.uuid].expanded
    }
    setExpandedMovies({ ...expandedMovies, ...updatedExpandedMovie })
  }

  useEffect(() => {
    const data = !isEmpty(query)
      ? filter(movieDetails, title => includes(title.title.toLowerCase(), query.toLowerCase()))
      : movieDetails
    setFilteredData(data)
  }, [query, movieDetails])

  return (
    <div>
      {isUserLoggedIn
        ? <div>
          <h1 style={{ color: '#fca311', textAlign: 'center', marginTop: '30px' }}>Movies list </h1>
          <br />
          <SearchBar
            setQuery={setQuery}
          />
          <br />
          <div>
            <div className='card-deck'>
              {filteredData.map((data) => (
                <div className='card' key={data.uuid}>
                  <div className='card-front'>
                    <div className='card-image-container'>
                      <img className='card-image mx-auto d-block' src={`data:image/png;base64,${data.image}`} alt={data.title} />
                    </div>
                    <br />
                    <div className='card-body'>
                      <h5>{data.title}</h5>
                      <br />
                      <p className='card-description'>
                        {
                          data.description.length > 100
                            ? `${data.description.substring(0, 100)}...`
                            : data.description
                        }
                      </p>
                      <p><small className='text-muted' style={{ color: 'white' }}>{data.genres}</small></p>
                      <button
                        type='button' className='btn btn-light front-button' data-toggle='modal'
                        data-target='#exampleModal'
                        onClick={(e) =>
                          handleClick(e, data)}
                      >
                        Read full description
                      </button>
                    </div>

                    <div className='modal-container'>
                      {expandedMovies[data.uuid] && expandedMovies[data.uuid].expanded
                        ? <div className='modal fade' id='exampleModal' tabIndex='-1' role='dialog' aria-labelledby='exampleModalLabel' aria-hidden='true'>
                          <div className='modal-dialog' role='document'>
                            <div className='modal-content'>
                              <div className='modal-header'>
                                <div className='modal-title ' id='exampleModalLabel'>
                                  <img className='modal-image' src={`data:image/png;base64,${data.image}`} alt={data.title} />
                                </div>
                                <button type='button' className='close' data-dismiss='modal' aria-label='Close' onClick={(e) => handleClick(e, data)}>
                                  <span aria-hidden='true'>&times;</span>
                                </button>
                              </div>
                              <div className='modal-body'>
                                <h4>{data.title}</h4>
                                <br />
                                <p className='text-justify'>{data.description}</p>
                                <br />
                                <p className='text-center'>{data.genres}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            {isEmpty(movieDetails) && !isEmpty(errorMessage) && <ErrorComponent errorMessage={errorMessage} />}
          </div>

          <div>
            {!isEmpty(movieDetails) &&
              <PaginationComponent
                offset={offset}
                setOffset={setOffset}
                movieCount={movieCount}
              />}
          </div>
        </div>
        : navigate('/')}
    </div>
  )
}

export default Movies
