import React from 'react';

const PersonForm = ({newName, handleNameChange, newNumber, handleNumberChange, handleAddName}) => {
  return (
    <form onSubmit={handleAddName} >
      <div>
        <label htmlFor="name-input">Nimi: </label>
        <input id='name-input' type='text' value={newName} onChange={handleNameChange} />
      </div>
      <div>
        <label htmlFor="number-input">Numero: </label>
        <input id='number-input' type='text' value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">lisää</button>
      </div>
    </form>
  )
}

export default PersonForm;