

function SignOut({ onSignOut }){

    const handleSignOut = () => {
        fetch('/logout', {
            method: "DELETE",
        }).then(() => onSignOut());
    }

    return (
            <button onClick={handleSignOut()}>Sign Out</button>
    )
}

export default SignOut