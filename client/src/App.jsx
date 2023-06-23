import {Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import "./index.css";
function App() {
  return (
    <>
      <main>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
