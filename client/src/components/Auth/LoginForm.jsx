import React, {useState} from "react";

import {
  Input,
  Button,
  InputGroup,
  InputRightElement,
  Textarea,
  Text,
} from "@chakra-ui/react";

import {redirect, useNavigate} from "react-router-dom";

export default function LoginForm({onLogin}) {
  const [formData, setFormData] = useState({username: "", password: ""});
  const [errors, setErrors] = useState([]);
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const navigate = useNavigate();
  function handleChange(event) {
    const name = event.target.name;
    let value = event.target.value;

    setFormData({...formData, [name]: value});
  }
  function handleSubmit(event) {
    event.preventDefault();
    // // POST fetch to dispatch
    fetch(`/api/login`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(formData),
    })
      .then(resp => {
        console.log(resp);
        if (resp.status === 200) {
          resp.json().then(user => {
            console.log(user);
            onLogin(user);
            navigate("../home");
            // ensure we update the local cookie before sending off other data
          });
        }
      })
      .catch(error => setErrors(error.errors));
  }

  return (
    <form
      onSubmit={event => handleSubmit(event)}
      style={{marginTop: "50px", marginBottom: "50px", boxShadow:"3px 5px 8px rgba(0, 0, 0, 1)"}}
      className="w-full max-w-sm mx-auto bg-charcoal p-8 rounded-md shadow-md">
      <div className="mb-4">
        <label
          htmlFor="username"
          className="block text-gray-700 text-sm font-bold mb-2">
          Username
        </label>
        <Input
          id="username"
          name="username"
          type="text"
          style={{
            borderWidth:"2px", 
            borderRadius:"8px",
          }}
          onChange={handleChange}
          value={formData.username}
          autoComplete="username"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-gray-700 text-sm font-bold mb-2">
          Password
        </label>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            style={{
              borderWidth:"2px", 
              borderRadius:"8px",
            }}
            name="password"
            id="password"
            autoComplete="current-password"
          />
          <InputRightElement width="4.5rem">
            <Button 
              // h="1.75rem" 
              size="md" 
              onMouseEnter={(e) => e.target.style.backgroundColor = "#4346EF"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "#6366F1"}
              style={{
                backgroundColor:"#6366F1", 
                color:"white",
                borderWidth:"2px",
              }} 
              onClick={handleClick}>
                {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </div>

      <div className="flex justify-around">
        <button
          className="w-[125px] bg-playstation_blue text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-darker_blue transition duration-300"
          type="submit">
          Login
        </button>
      </div>
    </form>
  );
}