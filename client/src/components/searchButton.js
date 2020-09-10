import React from 'react'

function SearchSubmit (props) {
  return (
    <div>
      <button
        type='button'
        className='btn btn-primary'
        onClick={props.handleFormSubmit}
      >
        Search
      </button>
    </div>
  )
}
export default SearchSubmit
