import React, {useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
import {
  Input,
  Button,
  InputGroup,
  InputRightElement,
  Textarea,
  Text,
} from "@chakra-ui/react";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);
YupPassword(Yup);
const LoginSchema = Yup.object().shape({
  password: Yup.string().password().required(),
  username: Yup.string().min(6, "Too short").required("Required"),
});

export default function LoginForm() {
  const [formData, setFormData] = useState({username: "", password: ""});
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  function handleChange(event) {
    const name = event.target.name;
    let value = event.target.value;

    setFormData({...formData, [name]: value});
  }
  function handleLogin(event) {}
  // // POST fetch to dispatch
  // fetch(`/new_user`, {
  //   method: "POST",
  //   headers: {"Content-Type": "application/json"},
  //   body: JSON.stringify(values),
  // })
  //   .then(resp => resp.json())
  //   .then(newProfile => {
  //     console.log(newProfile.id);
  //     // ensure we update the local cookie before sending off other data
  //   })
  //   .catch(error => console.log("error", error.message));

  // Pass the useFormik() hook initial form values, a validate function that will be called when
  // form values change or fields are blurred, and a submit function that will
  // be called when the form is submitted

  return (
    <form
      onSubmit={event => handleSubmit(event)}
      className="w-full max-w-sm mx-auto bg-white p-8 rounded-md shadow-md">
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
            name="password"
            id="password"
            autoComplete="current-password"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </div>

      <div className="flex justify-around">
        <button
          className="w-[125px] bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
          type="submit">
          Login
        </button>
      </div>
    </form>
  );
}
