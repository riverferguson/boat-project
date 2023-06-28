import React from 'react'
import { Link } from 'react-router-dom'
import './index.css'

const BoatCard = ({boat}) => {
const {id, make, model, image, price, location: {city, state}} = boat
  return (
    <div className='boat-card'>
        <img src={image} alt={make}/>
        <div>Make: {make}</div>
        <div>Model: {model}</div>
        <div>Price: {price}</div>
        <div>Location: {city} {state}</div>
        <Link to={`/boats/${id}`}>All Details</Link>
    </div>
  )
}

export default BoatCard