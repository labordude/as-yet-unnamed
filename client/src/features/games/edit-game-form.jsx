import React, {useState} from "react";
import {useFormik} from "formik";
import {updateGame, deleteGame} from "../ui/helpers";
import * as Yup from "yup";
import {
  Input,
  Button,
  InputGroup,
  InputRightElement,
  Textarea,
  Spinner,
} from "@chakra-ui/react";
import {redirect, useNavigate} from "react-router-dom";

// Yup schema for game validation
const GameSchema = Yup.object().shape({
  title: Yup.string().min(1, "Too Short!").required("Must have a description"),
  description: Yup.string()
    .min(1, "Too short")
    .required("Game must have a description"),
});
export default function GameEdit({game, toggleShowEdit}) {
  const {title, release_date, background_image, platform, description} = game;
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      title: title,
      description: description,
      release_date: release_date,
      platform: platform,
      background_image: background_image,
    },
    validationSchema: GameSchema,
    onSubmit: values => {
      handleSubmit(values);
    },
  });
  function handleDelete() {
    deleteGame(game.id).then(deleted => {
      navigate("/games");
    });
  }

  function handleSubmit(values) {
    updateGame(game.id, values).then(data => {
      toggleShowEdit();
      navigate(`/games/${data.id}`);
    });
  }
  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        method="post"
        style={{backgroundColor:"#1E2D24", boxShadow:"2px 5px 8px rgba(0, 0, 0, 1)", marginBottom:"10px"}}
        className="w-full max-w-sm mx-auto bg-white p-8 rounded-md shadow-md">
        <div className="flex justify-end place-items-end">
          <Button size="sm" colorScheme="red" onClick={handleDelete}>
            Delete Game
          </Button>
        </div>
        <div className="mb-2" style={{paddingBottom:"10px"}}>
          <label
            htmlFor="title"
            style={{color: 'white'}}
            className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <Input
            id="title"
            name="title"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.title}
            style={{borderRadius: "8px", borderWidth: "2px"}}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
          {formik.errors.title ? <div>{formik.errors.title}</div> : null}
        </div>
        <div className="mb-2" style={{paddingBottom:"10px"}}>
          <label
            htmlFor="description"
            style={{color: 'white'}}
            className="block text-gray-700 text-sm font-bold mb-2">
            Description
          </label>
          <Textarea
            name="description"
            style={{borderRadius: "8px", borderWidth: "2px"}}
            value={formik.values.description}
            onChange={formik.handleChange}
            size="sm"
          />
          {formik.errors.description ? (
            <div>{formik.errors.description}</div>
          ) : null}
        </div>
        {/* <div className="mb-2">
          <label
            htmlFor="platform"
            className="block text-gray-700 text-sm font-bold mb-2">
            Platform
          </label>
          <Input
            id="platform"
            name="platform"
            type="platform"
            onChange={formik.handleChange}
            value={formik.values.email}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
          {formik.errors.email ? <div>{formik.errors.email}</div> : null}
        </div> */}
        <div className="mb-2" style={{paddingBottom:"10px"}}>
          <label
            htmlFor="release_date"
            style={{color: 'white'}}
            className="block text-gray-700 text-sm font-bold mb-2">
            Release Date
          </label>
          <Input
            id="release_date"
            name="release_date"
            type="date"
            onChange={formik.handleChange}
            value={formik.values.release_date}
            style={{borderRadius: "8px", borderWidth: "2px"}}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
          {formik.errors.release_date ? (
            <div>{formik.errors.release_date}</div>
          ) : null}
        </div>
        <div className="mb-2" style={{paddingBottom:"20px"}}>
          <label
            htmlFor="background_image"
            style={{color: 'white'}}
            className="block text-gray-700 text-sm font-bold mb-2">
            Image
          </label>
          <input
            id="background_image"
            name="background_image"
            type="file"
            style={{backgroundColor:"#1E2D24", color:"white", borderRadius: "8px", borderWidth: "2px"}}
            onChange={event =>
              formik.setFieldValue(
                "background_image",
                URL.createObjectURL(event.currentTarget.files[0]),
              )
            }
            className="block w-full cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-transparent text-sm rounded-lg file:mr-4 file:py-2 file:px-4 file:bg-indigo-500 file:text-white file:rounded-md"
          />
          {formik.errors.background_image ? (
            <div>{formik.errors.background_image}</div>
          ) : null}
        </div>

        <div className="flex justify-around">
          <button
            className="w-[125px] bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
            type="submit"
            style={{marginRight: "10px"}}
            disabled={navigate.state === "submitting"}>
            {navigate.state === "submitting" && <Spinner />}
            Save
          </button>
          <button
            type="button"
            className="w-[125px] bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
            onClick={toggleShowEdit}>
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}
