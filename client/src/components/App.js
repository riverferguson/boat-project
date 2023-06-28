import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
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

  return (
    <main>
      <Nav />
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