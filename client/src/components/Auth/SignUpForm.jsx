import React, {useState} from "react";
import {
  useNavigate,
  useNavigation,
  useActionData,
  useSubmit,
  redirect,
} from "react-router-dom";
import {useFormik} from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
import {createUser} from "../../features/ui/helpers";
import {
  Input,
  Button,
  InputGroup,
  InputRightElement,
  Textarea,
  Spinner,
} from "@chakra-ui/react";
// import bcrypt from "bcryptjs";
// const salt = bcrypt.genSaltSync(10);
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

export const action = async ({request}) => {
  const formData = await request.formData();
  const values = Object.fromEntries(formData);
  console.log(values);

  try {
    console.log("hello");
    const newUser = await createUser(values);

    return redirect("../profile");
  } catch (error) {
    return {error: "Error creating a new user."};
  }
};
export default function SignUpForm({onLogin, toggleLoginForm}) {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const actionData = useActionData();
  const {error} = actionData || {};
  const navigate = useNavigate();
  const navigation = useNavigation();
  const submit = useSubmit();
  function handleSubmit(values) {
    fetch(`api/signup`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(values),
    })
      .then(response => response.json())
      .then(newUser => {
        onLogin(newUser);
        navigate("../profile");
      });
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
    onSubmit: async values => {
      console.log(values);
      handleSubmit(values);
    },
  });
  return (
    <div className="bg-smokey">
      <form
        onSubmit={formik.handleSubmit}
        method="post"
        style={{
          marginTop: "50px",
          marginBottom: "50px",
          boxShadow: "3px 5px 8px rgba(0, 0, 0, 1)",
        }}
        className="w-full max-w-sm mx-auto bg-charcoal p-8 rounded-md shadow-md">
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
            style={{
              borderWidth: "2px",
              borderRadius: "8px",
              marginBottom: "10px",
            }}
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
            style={{
              borderWidth: "2px",
              borderRadius: "8px",
              marginBottom: "10px",
            }}
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
            style={{
              borderWidth: "2px",
              borderRadius: "8px",
              marginBottom: "10px",
            }}
            onChange={formik.handleChange}
            value={formik.values.username}
            autoComplete="username"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
          {formik.errors.username ? <div>{formik.errors.username}</div> : null}
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
              style={{
                borderWidth: "2px",
                borderRadius: "8px",
                marginBottom: "10px",
              }}
              name="password"
              id="password"
              autoComplete="current-password"
            />
            <InputRightElement width="4.5rem">
              <Button
                size="md"
                onMouseEnter={e => (e.target.style.backgroundColor = "#4346EF")}
                onMouseLeave={e => (e.target.style.backgroundColor = "#6366F1")}
                style={{
                  backgroundColor: "#6366F1",
                  borderWidth: "2px",
                  color: "white",
                }}
                onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          {formik.errors.password ? <div>{formik.errors.password}</div> : null}
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
            style={{
              borderWidth: "2px",
              borderRadius: "8px",
              marginBottom: "10px",
              color: "white",
            }}
            onChange={event =>
              formik.setFieldValue(
                "pfp_image",
                URL.createObjectURL(event.currentTarget.files[0]),
              )
            }
            className="block w-full cursor-pointer bg-gray-50 border border-gray-300 text-white focus:outline-none focus:border-transparent text-sm rounded-lg file:mr-4 file:py-2 file:px-4 file:bg-playstation_blue file:text-white file:rounded-md"
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
            style={{
              borderWidth: "2px",
              borderRadius: "8px",
              marginBottom: "10px",
            }}
            placeholder="Tell us about yourself"
            size="sm"
          />
          {formik.errors.bio ? <div>{formik.errors.bio}</div> : null}
        </div>
        <div className="flex justify-around">
          <button
            className="w-[125px] bg-playstation_blue text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-darker_blue transition duration-300"
            type="submit"
            style={{marginTop: "10px"}}
            disabled={navigation.state === "submitting"}>
            {navigation.state === "submitting" && <Spinner />}
            Save
          </button>
          <button
            type="button"
            onClick={toggleLoginForm}
            style={{marginTop: "10px"}}
            className="w-[125px] bg-tomato text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-darker_red transition duration-300">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
