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
const ProfileSchema = Yup.object().shape({
  name: Yup.string().min(2, "Too Short!").max(50, "Too Long!"),
  email: Yup.string().email().required("Required"),
  password: Yup.string()
    .password()
    .required(
      "Requires min: 8 characters with >=1 lowercase, >=1 uppercase, >=1number, >=1 symbol",
    ),
  username: Yup.string().min(6, "Too short").required("Required"),
});
// .test("username", "This username is already taken.", function (username) {
//   return checkUsername(username);
// })
const checkUsername = username => {
  return fetch(`/check_username/${username}`)
    .then(response => response.json())
    .then(data => {
      return data.length === 0;
    });
};
export default function SignUpForm() {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const [success, setSuccess] = useState(false);
  function handleNewProfileSubmit(values) {
    setSuccess(prevSuccess => !prevSuccess);
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
  }
  // Pass the useFormik() hook initial form values, a validate function that will be called when
  // form values change or fields are blurred, and a submit function that will
  // be called when the form is submitted
  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      password: "",
      email: "",
      bio: "",
      pfp_image: "",
    },
    validationSchema: ProfileSchema,
    onSubmit: values => handleNewProfileSubmit(values),
  });
  return (
    <>
      {!success ? (
        <form
          onSubmit={formik.handleSubmit}
          className="w-full max-w-sm mx-auto bg-white p-8 rounded-md shadow-md">
          <div className="mb-2">
            <label
              htmlFor="firstName"
              className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
            {formik.errors.name ? <div>{formik.errors.name}</div> : null}
          </div>
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
            {formik.errors.email ? <div>{formik.errors.email}</div> : null}
          </div>
          <div className="mb-2">
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <Input
              id="username"
              name="username"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.username}
              autoComplete="username"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
            {formik.errors.username ? (
              <div>{formik.errors.username}</div>
            ) : null}
          </div>
          <div className="mb-2">
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
                value={formik.values.password}
                onChange={formik.handleChange}
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
            {formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
          </div>
          <div className="mb-2">
            <label
              htmlFor="pfp_image"
              className="block text-gray-700 text-sm font-bold mb-2">
              Image
            </label>
            <input
              id="pfp_image"
              name="pfp_image"
              type="file"
              onChange={event =>
                formik.setFieldValue(
                  "pfp_image",
                  URL.createObjectURL(event.currentTarget.files[0]),
                )
              }
              className="block w-full cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-transparent text-sm rounded-lg file:mr-4 file:py-2 file:px-4 file:bg-slate-600 file:text-white file:rounded-md"
            />
            {formik.errors.pfp_image ? (
              <div>{formik.errors.pfp_image}</div>
            ) : null}
          </div>
          <div className="mb-2">
            <label
              htmlFor="bio"
              className="block text-gray-700 text-sm font-bold mb-2">
              Bio
            </label>
            <Textarea
              name="bio"
              value={formik.values.bio}
              onChange={formik.handleChange}
              placeholder="Tell us about yourself"
              size="sm"
            />
            {formik.errors.bio ? <div>{formik.errors.bio}</div> : null}
          </div>
          <div className="flex justify-around">
            <button
              className="w-[125px] bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
              type="submit">
              Save
            </button>
            <button
              type="button"
              className="w-[125px] bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300">
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div>
          <Success newUser={formik.values} />
        </div>
      )}
    </>
  );
}
function Success({newUser}) {
  const {name, username, password, email, bio, pfp_image} = newUser;
  const hashBrowns = bcrypt.hashSync(password, salt);
  return (
    <div>
      Successfully created:
      <ul>
        New User
        <li>Name: {name}</li>
        <li>Username: {username}</li>
        <li>Password hash: {hashBrowns}</li>
        <li>Email: {email}</li>
        <li>Bio:{bio}</li>
        <li>
          Image:
          <img src={pfp_image} />
        </li>
      </ul>
    </div>
  );
}
