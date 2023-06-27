import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import BoatPage from "./BoatPage";
import Nav from "./Nav";
import Footer from "./Footer";
import OwnerPage from "./OwnerPage";

function App() {
    const [boats, setBoats] = useState([])
    const [owners, setOwners] = useState([])

    useEffect(() => {
        fetch("/boats")
        .then((resp) => resp.json())
        .then((boats) => setBoats(boats))
    }, [])

    useEffect(() => {
      fetch("/owners")
      .then((resp) => resp.json())
      .then((owners) => setOwners(owners))
  }, [])

  return (
    <main>
      <Nav/>
      <BoatPage boats={boats}/>
      <OwnerPage owners={owners}/>
      <Footer/>
    </main>
  )
}

export default App;