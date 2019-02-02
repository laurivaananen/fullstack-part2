import React, { useState } from 'react'

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import People from './components/People';

const App = () => {
  const [ persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '000-0000000',
    }
  ]) 
  const [ newFilter, setNewFilter ] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const handleFilterChange = event => {
    setNewFilter(event.target.value);
  }

  const handleNameChange = event => {
    setNewName(event.target.value);
  }

  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  }

  const handleAddName = event => {
    event.preventDefault();
    const match = persons.find(x => x.name === newName);
    if (match) {
      alert(`${newName} on jo luettelossa`);
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      }
      setPersons(persons.concat(newPerson));
      setNewName('');
      setNewNumber('');
    }
  }
  
  return (
    <div>
      <h1>Puhelinluettelo</h1>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>Lisää uusi</h2>
      <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        handleAddName={handleAddName}
      />
      <h2>Numerot</h2>
      <People persons={persons} newFilter={newFilter} />
    </div>
  )

}

export default App