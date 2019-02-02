import React from 'react';

const People = ({persons, newFilter, handlePersonDelete}) => {
  return (
    <ul>
      {persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
        .map(person => 
        <li key={person.name} >
          {person.name} {person.number}
          <button value={person.id} onClick={handlePersonDelete(person.name)}>Delete</button>
        </li>
      )}
    </ul>
  )
}

export default People;