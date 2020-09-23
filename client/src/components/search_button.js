import React from 'react'
import { Search } from 'react-bootstrap-icons'

const SearchButton = props => (
  <button
    type='button'
    className='btn btn-lg btn-primary'
    onClick={props.handleFormSubmit}
  >
    <Search className='mr-2' />
    Search
  </button>
)

export default SearchButton
