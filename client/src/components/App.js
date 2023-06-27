import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import BoatPage from "./BoatPage";
import Nav from "./Nav";
import Footer from "./Footer";

function App() {
    const [boats, setBoats] = useState([])

    useEffect(() => {
        fetch("http://127.0.0.1:5555/boats")
        .then((resp) => resp.json())
        .then((boats) => setBoats(boats))
    }, [])

  return (
    <main>
      <Nav/>
      <BoatPage boats={boats}/>
      <Footer/>
    </main>
  )
}

export default App;