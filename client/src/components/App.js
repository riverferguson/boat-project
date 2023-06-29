import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import BoatPage from "./BoatPage";
import Nav from "./Nav";
import Footer from "./Footer";
import OwnerPage from "./OwnerPage";
import LocationPage from "./LocationPage";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import SignOut from "./SignOut";

function App() {
  const [boats, setBoats] = useState([]);
  const [owners, setOwners] = useState([]);
  const [location, setLocation] = useState([]);
  const [user, setUser] = useState(null);
  const [userStatus, setUserStatus] = useState(false)

  useEffect(() => {
    fetch("/boats")
      .then((resp) => resp.json())
      .then((boats) => setBoats(boats));
  }, []);

  useEffect(() => {
    fetch("/owners")
      .then((resp) => resp.json())
      .then((owners) => setOwners(owners));
  }, []);

  useEffect(() => {
    fetch("/locations")
      .then((resp) => resp.json())
      .then((location) => setLocation(location));
  }, []);

  useEffect(() => {
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
        setUserStatus(current => !current)
      }
    });
  }, []);

  const onChange = (user) => setUser(user)

  return (
    <main>
      <Nav user={user} userStatus={userStatus} />
      <Switch>
      <Route path='/boats'>
      <BoatPage boats={boats} location={location}/>
      </Route>
      <Route path='/locations'>
      <LocationPage locations={location} />
      </Route>
      <Route path='/owners'>
      <OwnerPage owners={owners} />
      </Route>
      <Route path='/signup'>
        <SignUp onChange={onChange} />
      </Route>
      <Route path='/signin'>
        <SignIn onChange={onChange} />
      </Route>
      <Route path='/signout'>
        <SignOut onChange={onChange} />
      </Route>
      </Switch>
      <Footer />
    </main>
  );
}

export default App;

//this will need to be added once we figure out how we want to authorize things
//the import can then be uncommented
// if (user) {
//   return <h2>Welcome, {user.username}</h2>
// } else {
//   return <SignIn onSignIn={setUser} />
// }