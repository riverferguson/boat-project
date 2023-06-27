import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import BoatPage from "./BoatPage";
import Nav from "./Nav";
import Footer from "./Footer";
import OwnerPage from "./OwnerPage";
import LocationPage from "./LocationPage";

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

  return (
    <main>
      <Nav />
      <Switch>
      <Route path='/boats'>
      <BoatPage boats={boats} />
      </Route>
      <Route path='/locations'>
      <LocationPage locations={location} />
      </Route>
      <Route path='/owners'>
      <OwnerPage owners={owners} />
      </Route>
      </Switch>
      <Footer />
    </main>
  );
}

export default App;