import React from 'react'

const LocationCard = ({location}) => {
const {city, state, country, address} = location

  return (
    <div className='location-card'>
        <div>City: {city}</div>
        <div>State: {state}</div>
        <div>Country: {country}</div>
        <div>Address: {address}</div>
    </div>
  )
}

export default LocationCard