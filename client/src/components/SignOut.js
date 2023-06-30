import { useHistory } from 'react-router-dom'

function SignOut({ onSign }){

    const history = useHistory()

    const handleSignOut = () => {
        fetch('/signout', {
            method: "DELETE",
        }).then((r) => {
            if(r.ok){
                onSign(null)
                alert('Sign out successful, returning to home....')
                history.push('/boats')
            } else {
                alert('Something went wrong. Please try again')
            }
        });
    }

    return (
        <li >
            <h2>Would you like to Sign Out?</h2>
            <button onClick={handleSignOut}>Sign Out</button>
        </li>
    )
}

export default SignOut