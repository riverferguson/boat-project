import {useState} from 'react'

function SignIn({ onSignIn, user }){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault(e)
        fetch("/signin", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username, password})
        })
        .then((r) => r.json())
        .then((user) => onSignIn(user))
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username'/>
            <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
            <button type='submit'>Sign In</button>
        </form>
    )
}
export default SignIn