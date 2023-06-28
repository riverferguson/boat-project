import { useState } from 'react'

function SignUp({ onSignUp }){
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [bio, setBio] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('/signup', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({firstName, lastName, bio, email, username, password})
        })
        .then((r) => r.json())
        .then((newOwner) => onSignUp(newOwner))
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder='First Name'/>
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder='Last Name'/>
            <input type="text" value={bio} onChange={(e) => setBio(e.target.value)} placeholder='Bio this can be changed later'/>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email'/>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username'/>
            <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
            <button type='submit'>Sign Up</button>
        </form>
    )
}
export default SignUp