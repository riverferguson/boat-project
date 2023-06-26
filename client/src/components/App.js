import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

function App() {
    const [boats, setBoats] = useState([])

    useEffect(() => {
        fetch("/boats")
        .then((resp) => resp.json())
        .then((boats) => setBoats(boats))
    }, [])

  return (
    <main>
        <BoatPage/>
    </main>
  )
}

export default App;