import {useState, useEffect} from "react";
import {Outlet} from "react-router-dom";
import Header from "./components/Header";
import "./index.css";

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    //check for a current session
    fetch("/check_session")
      .then(response => {
        if (response.ok) {
          // response.text().then(text => console.log(text));
          response.json().then(user => setUser(user));
        }
      })
      .catch(error => console.log(error));
  }, []);
  function onLogout(loggedOut) {
    setUser(loggedOut);
  }
  return (
    <>
      <main>
        <Header user={user} onLogout={onLogout} />
        <Outlet context={[user, setUser]} />
      </main>
    </>
  );
}

export default App;
