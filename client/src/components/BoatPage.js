import React from 'react'
import BoatCard from './BoatCard'
import LocationCard from './LocationCard'


const BoatPage = ({boats}) => {
  console.log(boats)
const mappedBoats = boats.map(boat => <BoatCard key={boat.id} boat={boat}/>)


  return (
    <main>
      <div>
      {mappedBoats}
      </div>
    </main>
  )
}

export default BoatPage
