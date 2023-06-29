import {useState} from 'react'
// import {Link} from 'react-router-dom'

function SignIn({ onChange }){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e) => {
        const userObj = {username: username, password: password}
        
        e.preventDefault(e)
        fetch("/signin", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userObj)
        })
        .then((r) => {
            if(r.ok){
                r.json().then(onChange)
                // <Link to='/' > <Link/>
            } else {
                alert('Invalid Credentials')
            }
        })
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