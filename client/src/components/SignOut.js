
function SignOut({ onChange }){

    const handleSignOut = () => {
        fetch('/signout', {
            method: "DELETE",
        }).then(() => onChange(null));
    }

    return (
            <button onClick={handleSignOut()}>Sign Out</button>
    )
}

export default SignOut