import React, { useState, useEffect } from 'react'
import axios from 'axios';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import People from './components/People';
import peopleService from './services/People';

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newFilter, setNewFilter ] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  useEffect(() => {
    peopleService
      .getAll()
        .then(people => {
          setPersons(people)
        })
        .catch(error => {
          console.log(error)
        })
  }, [])

  const handleFilterChange = event => {
    setNewFilter(event.target.value);
  }

  const handleNameChange = event => {
    setNewName(event.target.value);
  }

  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  }

  const handlePersonDelete = name => event => {
    event.preventDefault();
    const confirm = window.confirm(`Do you want to delete ${name} ?`)
    const personId = event.target.value;
    if (confirm) {
      peopleService
        .remove(event.target.value)
          .then(person => {
            setPersons(persons.filter(person => person.id != personId))
          })
          .catch(error => {
            console.log(error)
          })
    }
  }

  const handleUpdateNumber = person => {
    peopleService
      .update(person.id, person)
        .then(updatedPerson => {
          setPersons(persons.map(person => 
            person.id === updatedPerson.id ? updatedPerson : person
          ))
        })
  }

  const handleAddName = event => {
    event.preventDefault();
    const match = persons.find(x => x.name === newName);
    if (match) {
      const confirm = window.confirm(`${match.name} on jo luettelossa, korvataanko vanha numero uudella?`);
      if (confirm) {
        handleUpdateNumber({...match, number: newNumber});
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      }
      peopleService
        .create(newPerson)
          .then(person => {
            setPersons(persons.concat(person))
          })
          .catch(error => {
            console.log(error);
          })
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
      <People
        persons={persons}
        newFilter={newFilter}
        handlePersonDelete={handlePersonDelete}
      />
    </div>
  )

}

export default App