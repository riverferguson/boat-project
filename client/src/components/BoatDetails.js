import React, {useState} from 'react'
import { useEffect } from 'react'
import {useParams} from 'react-router-dom'
import { useHistory } from 'react-router-dom'


const BoatDetails = ({deleteBoat}) => {
    const [newBoat, setNewBoat] = useState([])
    const {id} = useParams()
    const history = useHistory()
    const [error, setError] = useState(null)
    const {make, model, description, image, price} = newBoat
    

useEffect(() => {
    fetch(`/boats/${id}`)
    .then((resp) => resp.json())
    .then((boats) => setNewBoat(boats))
}, [id])



const handleDelete = (e) => {
  fetch(`/boats/${id}`, {
    method: "DELETE"
  })
  .then(resp => {
    if (resp.ok) {
      deleteBoat(newBoat)
      history.push("/")
    } else {
      resp.json().then(error => setError(error.message))
    }
  })
  .catch(console.error)
}

  return (
    <main className='detail-card'>
    <div>BoatDetails</div>
    <div>Make: {make}</div>
    <div>Model: {model}</div>
    <img src={image} alt={make}/>
    <div>Price: {price}</div>
    <div>Description: {description}</div>
    <button className='trash-button' onClick={handleDelete}>🗑️</button>
    </main>
  )
}

export default BoatDetails