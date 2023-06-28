import React, { useEffect, useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import BoatPage from "./BoatPage";
import Nav from "./Nav";
import Footer from "./Footer";
import OwnerPage from "./OwnerPage";
import LocationPage from "./LocationPage";
import BoatForm from "./BoatForm";
import BoatDetails from "./BoatDetails";

function App() {
  const [boats, setBoats] = useState([]);
  const [owners, setOwners] = useState([]);
  const [location, setLocation] = useState([]);
  const [user, setUser] = useState(null);
  const [boatEdit, setBoatEdit] = useState(false)
  const history = useHistory()

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

  const addBoat = (newBoat) => {
    setBoats([...boats, newBoat])
  }

  const deleteBoat = (deleted_boat) => setBoats(boats => boats.filter((boat) => boat.id !== deleted_boat.id))

  const handleEdit = (boat) => {
    setBoatEdit(current => !current)
    history.push({
      pathname: `/boats/edit/${boat.id}`,
      state: boat
    })
  }

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
      <BoatDetails handleEdit={handleEdit} deleteBoat={deleteBoat}/>
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