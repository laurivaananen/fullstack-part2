import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Filter = ({ filter, setFilter }) => {
  return (
    <form onSubmit={event => event.preventDefault}>
      <label>Find countries</label>
      <input value={filter} onChange={setFilter} type="text" />
    </form>
  )
}

const Countries = ({ countries, filter, setFilter }) => {
  const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))
  if (filteredCountries.length > 10) {
    return (<p>Too many matches</p>)
  } else if (filteredCountries.length > 1) {
    return (
      filteredCountries.map(country =>
        <div key={country.numericCode}>
          <p>{country.name}</p><button onClick={setFilter} value={country.name}>show</button>
        </div>
      )
    )
  } else if (filteredCountries.length === 1) {
    return (
      filteredCountries.map(country =>
        <div key={country.numericCode} >
          <h2>{country.name}</h2>
          <p>Capital {country.capital}</p>
          <p>Population {country.population}</p>
          <h3>Languages: </h3>
          <ul>
            {country.languages.map(language => 
              <li key={language.name}>{language.name}</li>
            )}
          </ul>
          <img src={country.flag} width="128" alt={country.name} />
          <h3>Weather in {country.capital}</h3>
          <Weather capital={country.capital} />
        </div>
      )
    )
  } else {
    return (
      <p>No matches</p>
    )
  }
}

const Weather = ({ capital }) => {
  const [weather, setWeather ] = useState(undefined)

  useEffect(() => {
    axios
      .get(`https://api.apixu.com/v1/current.json?key=22e4984eb09a4fbeb89143756190202&q=${capital}`)
      .then(res => {
        setWeather(res.data);
      })
      .catch(err => {
        console.log("ERROR, ", err);
      })
  }, [])

  return (
    <div>
      {weather ? 
        <div>
          <p><strong>Temperature: </strong>{weather.current.temp_c} C</p>
          <img src={"https:" + weather.current.condition.icon} alt={weather.current.condition.text} width="64" height="64" />
          <p><strong>Wind: {weather.current.wind_kph}</strong> kph direction {weather.current.wind_dir}</p>
        </div>
        : <p>Loading Weather</p>
      }
    </div>
  )
}

const App = () => {
  const [ countries, setCountries ] = useState([]) 
  const [ filter, setFilter ] = useState('')

  const handleFilterChange = event => {
    event.preventDefault()
    setFilter(event.target.value);
  }

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(res => {
        setCountries(res.data);
      })
      .catch(err => {
        console.log('ERROR! ' , err)
      })
  }, [])

  return (
    <div>
      <Filter filter={filter} setFilter={handleFilterChange} />
      <Countries filter={filter} countries={countries} setFilter={handleFilterChange} />
    </div>
  )
}

export default App;
