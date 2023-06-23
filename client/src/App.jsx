import {useState, useEffect} from "react";
import {Outlet} from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import "./index.css";
import SignUpForm from "./components/Auth/SignUpForm";
function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    //check for a current session
    fetch("/check_session")
      .then(response => {
        if (response.ok) {
          response.json().then(user => setUser(user));
        }
      })
      .catch(error => console.log(error));
  }, []);
  return (
    <>
      <main>
        <Header />
        <Outlet />
      </main>
    </>
  );
}

export default App;
