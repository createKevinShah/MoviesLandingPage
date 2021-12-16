import React from 'react'
import '../App.css'

const PaginationComponent = (props) => {
  const { offset, setOffset, movieCount } = props

  const disablePreviousButton = () => offset === 1

  const disableNextButton = () => offset === parseInt(movieCount / 10 + 1)

  return (
    <div>
      <div className='pagination' style={{ display: 'flex', flexFlow: 'row', justifyContent: 'flex-end' }}>
        <button
          disabled={disablePreviousButton()}
          onClick={() => setOffset(offset - 1)}
        >Previous
        </button>

        <button
          disabled={disableNextButton()}
          onClick={() => setOffset(offset + 1)}
        >Next
        </button>
      </div>
    </div>

  )
}

export default PaginationComponent
