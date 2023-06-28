import React from 'react'

const OwnerCard = ({owner}) => {
const {first_name, last_name, bio, boats} = owner


  return (
    <div className='owner-card'>
        <div>Name: {first_name} {last_name} </div>
        <div>Bio: {bio}</div>
    </div>
  )
}

export default OwnerCard