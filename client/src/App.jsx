import {useState, useEffect} from "react";
import {Outlet, useNavigate, redirect} from "react-router-dom";
import Header from "./components/Header";
import {Grid, GridItem} from "@chakra-ui/react";
import Login from "./pages/login";
import NewestGames from "./components/newest-games";
import NewestReviews from "./components/newest-reviews";
import "./index.css";

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    //check for a current session
    fetch("/api/@me")
      .then(response => {
        if (response.ok) {
          response.json().then(user => {
            setUser(user);

            // navigate("/home");
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  function onLogout(loggedOut) {
    setUser(loggedOut);
    navigate("/home");
  }
  return (
    <>
      <main>
        <Header user={user} onLogout={onLogout} />
        {/* <div className="px-4">
          {!user ? (
            <Login onLogin={setUser} />
          ) : (
            <>
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <GridItem w="100%">
                  Newest Reviews
                  <NewestReviews />
                </GridItem>
                <GridItem w="100%">
                  Newest Games
                  <NewestGames />
                </GridItem>
              </Grid>
            </>
          )}
          {/* <Games /> */}
        {/* </div> */}
        {user != null ? (
          <Outlet context={[user, setUser]} />
        ) : (
          <Login onLogin={setUser} />
        )}
      </main>
    </>
  );
}

export default App;
