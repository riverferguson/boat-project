import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import BoatPage from "./BoatPage";
import Nav from "./Nav";
import Footer from "./Footer";
import OwnerPage from "./OwnerPage";
import LocationPage from "./LocationPage";
<<<<<<< HEAD
import BoatForm from "./BoatForm";
import BoatDetails from "./BoatDetails";
=======
// import SignIn from "./SignIn";
>>>>>>> main

function App() {
  const [boats, setBoats] = useState([]);
  const [owners, setOwners] = useState([]);
  const [location, setLocation] = useState([]);
  const [user, setUser] = useState(null);

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

<<<<<<< HEAD
  const addBoat = (newBoat) => {
    setBoats([...boats, newBoat])
  }
=======
  useEffect(() => {
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);
>>>>>>> main

  return (
    <main>
      <Nav onSignOut={setUser}/>
      <Switch>
      <Route exact path='/boats'>
      <BoatPage boats={boats} locations={location}/>
      </Route>
      <Route exact path='/locations'>
      <LocationPage locations={location} />
      </Route>
      <Route exact path='/owners'>
      <OwnerPage owners={owners} />
      </Route>
      <Route exact path='/boats/new'>
      <BoatForm addBoat={addBoat}/>
      </Route>
      <Route exact path='/boats/:id'>
      <BoatDetails />
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