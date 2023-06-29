import React from 'react'
import { Link } from 'react-router-dom'
import './index.css'

const BoatCard = ({boat}) => {
  // , location: {city, state}  and <div>Location: {city} {state}</div>
  //took out due to error need to put back in
  //after adding authorizations
const {id, make, model, image, price} = boat
  return (
    <div className='boat-card'>
        <img src={image} alt={make}/>
        <div>Make: {make}</div>
        <div>Model: {model}</div>
        <div>Price: {price}</div>
        {/* <div>Location: {city} {state}</div> */}
        <Link to={`/boats/${id}`}>All Details</Link>
    </div>
  )
}

export default BoatCard