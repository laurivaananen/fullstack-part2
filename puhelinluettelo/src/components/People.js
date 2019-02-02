import React from 'react';

const People = ({persons, newFilter}) => {
  return (
    <ul>
      {persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
        .map(person => 
        <li key={person.name} >{person.name} {person.number}</li>
      )}
    </ul>
  )
}

export default People;