import React from 'react'
import './index.css'

const BoatCard = ({boat}) => {
const {make, model, image, price, description} = boat
  return (
    <div className='boat-card'>
        <img src={image} alt={make}/>
        <div>Make: {make}</div>
        <div>Model: {model}</div>
        <div>Description: {description}</div>
        <div>Price: {price}</div>
    </div>
  )
}

export default BoatCard