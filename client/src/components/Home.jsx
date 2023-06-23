import React, {useEffect, useState} from "react";
import Games from "./Games";
function Home() {
  const [message, setMessage] = useState({});
  const [errors, setErrors] = useState([]);
  useEffect(() => {
    fetch("/home")
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw response.statusText;
        }
      })
      .then(message => {
        setMessage(message);
        console.log(message.message);
      })
      .catch(error => setErrors(error));
  }, []);
  return (
    <div className="px-4">
      Home<p>{errors || message.message} This text comes from the API.</p>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Games />
    </div>
  );
}

export default Home;
