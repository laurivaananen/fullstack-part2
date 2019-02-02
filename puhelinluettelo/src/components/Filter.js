import React from 'react';

const Filter = ({newFilter, handleFilterChange}) => {
  return (
    <form onSubmit={event => event.preventDefault()}>
      <label htmlFor='filter-input'>Rajaa näytettäviä: </label>
      <input id='filter-input' type='text' value={newFilter} onChange={handleFilterChange} />
    </form>
  )
}

export default Filter;