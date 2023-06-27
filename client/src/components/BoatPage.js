
import React from 'react'
import BoatCard from './BoatCard'


const BoatPage = ({boats}) => {
const mappedBoats = boats.map(boat => <BoatCard key={boat.id} boat={boat}/>)

  return (
    <div>
      {mappedBoats}
    </div>
  )
}

export default BoatPage