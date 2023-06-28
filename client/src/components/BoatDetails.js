import React, {useState} from 'react'
import { useEffect } from 'react'
import {useParams} from 'react-router-dom'


const BoatDetails = () => {
    const [newBoat, setNewBoat] = useState([])
    const {id} = useParams()
    

useEffect(() => {
    fetch(`/boats/${id}`)
    .then((resp) => resp.json())
    .then((boats) => setNewBoat(boats))
}, [id])

const {make, model, description, image, price} = newBoat

  return (
    <main>
    <div>BoatDetails</div>
    <div>Make: {make}</div>
    <div>Model: {model}</div>
    <div>Image: {image}</div>
    <div>Price: {price}</div>
    <div>Description: {description}</div>
    </main>
  )
}

export default BoatDetails