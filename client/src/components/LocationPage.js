import React from 'react'
import LocationCard from './LocationCard'

const LocationPage = ({locations}) => {
const mappedLocations = locations.map(location => <LocationCard key={location.id} location={location}/>)

  return (
    <main>
    <h2>Locations</h2>
    <div>{mappedLocations}</div>
    </main>
  )
}

export default LocationPage