import React from 'react'
import BoatCard from './BoatCard'


const BoatPage = ({boats, owners}) => {
const mappedBoats = boats.map(boat => <BoatCard key={boat.id} boat={boat} owners={owners}/>)


  return (
    <main>
      <div>
      {mappedBoats}
      </div>
    </main>
  )
}

export default BoatPage
