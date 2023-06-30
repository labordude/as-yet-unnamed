import {useState, useEffect} from "react";
import {Outlet, useNavigate, redirect} from "react-router-dom";
import Header from "./components/Header";
import {Grid, GridItem} from "@chakra-ui/react";
import Login from "./pages/login";
import NewestGames from "./components/newest-games";
import NewestReviews from "./components/newest-reviews";
import SignUpForm from "./components/Auth/SignUpForm";
import "./index.css";

function App() {
  const [user, setUser] = useState(null);
  const [showSignup, setShowSignup] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    //check for a current session
    if (user == null) {
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
    }
  }, []);
  function onLogout(loggedOut) {
    setUser(null);
    navigate("../");
  }
  function toggleSignup() {
    setShowSignup(prev => !prev);
  }
  return (
    <>
      <main>
        <Header user={user} onLogout={onLogout} toggleSignup={toggleSignup} />
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
        ) : !showSignup ? (
          <Login onLogin={setUser} showSignup={showSignup} />
        ) : (
          <SignUpForm onLogin={setUser} />
        )}
      </main>
    </>
  );
}

export default App;
