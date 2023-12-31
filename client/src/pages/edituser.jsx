import React, {useEffect, useState} from "react";
import {getUserByID, updateUser, deleteUser} from "../features/ui/helpers";
import {
  useLoaderData,
  useNavigate,
  useNavigation,
  useActionData,
  useSubmit,
  redirect,
  useOutletContext,
} from "react-router-dom";
import {useFormik} from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
import {Input, Textarea, Spinner, Button} from "@chakra-ui/react";
YupPassword(Yup);
const EditUserSchema = Yup.object().shape({
  name: Yup.string().min(2, "Too Short!").max(50, "Too Long!"),
  email: Yup.string().email().required("Required"),
  username: Yup.string().min(6, "Too short").required("Required"),
});
// export async function loader({params}) {
//   const newUser = await getUserByID(params.id);
//   return {newUser};
// }
// navigated in here from signup form
// lead to profile when done editing
// export const action = async ({request}) => {
//   console.log("in the action");
//   const formData = await request.formData();
//   console.log(formData);
//   const values = Object.fromEntries(formData);
//   console.log(values);

//   try {
//     console.log("in try block");
//     const updatedUser = await updateUser(params.id, values);
//     console.log(updatedUser);
//     return redirect(`../profile`);
//   } catch (error) {
//     return {error: "Error creating a new user."};
//   }
// };
export default function EditUser({currentUser, toggleForm}) {
  const [userData, setUserData] = useState();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const [user, setUser] = useOutletContext();

  // useEffect(() => {
  //   setUserData(newUser);
  // }, []);

  //
  function handleDelete() {
    deleteUser(user.id).then(deleted => {
      fetch(`/api/logout`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
      })
        .then(response => {
          setUser(null);
          return navigate("../");
        })
        .catch(error => console.log(error));
    });
  }

  function handleSubmit(id, values) {
    updateUser(id, values)
      .then(toggleForm())
      .then(updated => {
        console.log(updated);
        setUser(updated);
        // navigate("../profile");
      });
  }
  const formik = useFormik({
    initialValues: {
      name: user.name,
      username: user.username,

      email: user.email,
      bio: user.bio || "",
      pfp_image: user.pfp_image || "",
    },
    validationSchema: EditUserSchema,
    onSubmit: async values => {
      handleSubmit(user.id, values);
    },
  });
  return (
    <>
      <form
      style={{backgroundColor:"#1E2D24", padding:"20px"}}
        onSubmit={formik.handleSubmit}
        className="">
        <div className="flex justify-end place-items-end">
          <Button 
            centerContent 
            size="md" 
            onMouseEnter={(e) => e.target.style.backgroundColor = "#FE3D20"}
            onMouseLeave={(e) => e.target.style.backgroundColor = "#FE654F"}
            style={{
              backgroundColor:"#FE654F", 
              color:"white",
            }} 
            onClick={handleDelete}>
              Delete Profile
          </Button>
        </div>
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
            style={{borderWidth:"2px",}}
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
            style={{borderWidth:"2px",}}
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
            style={{borderWidth:"2px",}}
            onChange={formik.handleChange}
            value={formik.values.username}
            autoComplete="username"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
          {formik.errors.username ? <div>{formik.errors.username}</div> : null}
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
            style={{borderWidth:"2px",}}
            onChange={event =>
              formik.setFieldValue(
                "pfp_image",
                URL.createObjectURL(event.currentTarget.files[0]),
              )
            }
            className="block w-full cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-transparent text-sm rounded-lg file:mr-4 file:py-2 file:px-4 file:bg-playstation_blue file:text-white file:rounded-md"
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
            style={{borderWidth:"2px", borderRadius:"8px"}}
            placeholder="Tell us about yourself"
            size="sm"
          />
          {formik.errors.bio ? <div>{formik.errors.bio}</div> : null}
        </div>
        <div className="flex justify-around" style={{marginTop:"20px"}}>
          <button
            className="w-[125px] bg-playstation_blue text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-darker_blue transition duration-300"
            type="submit"
            disabled={navigation.state === "submitting"}>
            {navigation.state === "submitting" && <Spinner />}
            Save
          </button>
          <button
            type="button"
            onClick={toggleForm}
            style={{marginLeft:"20px"}}
            className="w-[125px] bg-tomato text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-darker_red transition duration-300">
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}
