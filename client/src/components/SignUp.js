import { useState } from 'react'

function SignUp({ onChange }){
    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [bio, setBio] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e) => {
        const newUserObj = {
            first_name: first_name,
            last_name: last_name,
            bio: bio,
            email: email,
            username: username,
            password: password
        }
        e.preventDefault()
        fetch('/signup', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUserObj)
        })
        .then((r) => {
            if(r.ok){
                r.json().then(onChange)
            } else {
                alert('Something went wrong. Please try again')
            }
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={first_name} onChange={(e) => setFirstName(e.target.value)} placeholder='First Name'/>
            <input type="text" value={last_name} onChange={(e) => setLastName(e.target.value)} placeholder='Last Name'/>
            <input type="text" value={bio} onChange={(e) => setBio(e.target.value)} placeholder='Bio this can be changed later'/>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email'/>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username'/>
            <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
            <button type='submit'>Sign Up</button>
        </form>
    )
}
export default SignUp