import React, { useEffect, useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import BoatPage from "./BoatPage";
import Nav from "./Nav";
import Footer from "./Footer";
import OwnerPage from "./OwnerPage";
import BoatForm from "./BoatForm";
import BoatDetails from "./BoatDetails";
import BoatEdit from "./BoatEdit";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Search from "./Search";

function App() {
  const [boats, setBoats] = useState([]);
  const [owners, setOwners] = useState([]);
  const [location, setLocation] = useState([]);
  const [user, setUser] = useState(null);
  const [boatEdit, setBoatEdit] = useState(false);
  const [searchMake, setSearchMake] = useState("");
  const [searchModel, setSearchModel] = useState("");
  const history = useHistory();
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
        setUser(current => !current)
      }
    });
  }, []);

  const addBoat = (newBoat) => {
    setBoats([...boats, newBoat]);
  };

  const deleteBoat = (deleted_boat) =>
    setBoats((boats) => boats.filter((boat) => boat.id !== deleted_boat.id));

  const handleEdit = (boat) => {
    setBoatEdit((current) => !current);
    history.push({
      pathname: `/boats/edit/${boat.id}`,
      state: boat, owners, location
    });
  };

  const updateBoat = (updated_boat) =>
    setBoats((boats) =>
      boats.map((boat) => (boat.id === updated_boat.id ? updated_boat : boat))
    );


  const filteredBoats = boats.filter((boat) => {
    const makeMatch =
      !searchMake || searchMake === "make"
        ? boat.make.toLowerCase().includes(searchModel.toLowerCase())
        : false;

    const modelMatch =
      !searchMake || searchMake === "model"
        ? boat.model.toLowerCase().includes(searchModel.toLowerCase())
        : false;

    return makeMatch || modelMatch;
  });

  const onChange = (user) => setUser(user)

  return (
    <main>
      <Nav user={user} />
      <Switch>
        <Route exact path="/boats">
          <Search setSearchMake={setSearchMake} setSearchModel={setSearchModel} />
          <BoatPage boats={filteredBoats} owners={owners}/>
        </Route>
        <Route exact path="/owners">
          <OwnerPage owners={owners} />
        </Route>
        <Route exact path="/boats/new">
          <BoatForm addBoat={addBoat} />
        </Route>
        <Route exact path="/boats/:id">
          <BoatDetails handleEdit={handleEdit} deleteBoat={deleteBoat} location={location} owners={owners}/>
        </Route>
        <Route exact path="/boats/edit/:id">
          <BoatEdit boatEdit={boatEdit} updateBoat={updateBoat}  />
        </Route>
        <Route path="/signup">
          <SignUp onChange={onChange} />
        </Route>
        <Route path="/signin">
          <SignIn onChange={onChange} />
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