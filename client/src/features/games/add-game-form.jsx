import React, {useState, useEffect, useMemo, useTransition} from "react";
import {getGames} from "../ui/helpers";
import GameCard from "../../components/game-card";
import {SimpleGrid, GridItem, Button} from "@chakra-ui/react";
// import ReactPaginate from "react-paginate";
// Components needed: Search, GameCard
import {Formik, Field, Form, ErrorMessage} from "formik";
import {redirect} from "react-router-dom";
import * as Yup from "yup";
const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  background_image: Yup.string().required("Background image is required"),
  release_date: Yup.date()
    .nullable()
    .transform((value, originalValue) => {
      const date = new Date(originalValue);
      return isNaN(date) ? null : date;
    })
    .required("Release date is required")
    .test(
      "valid-date",
      "Game release date must be a valid date",
      value => value !== null,
    ),
  platform: Yup.string().required("Platform is required"),
  rating: Yup.number().label("rating").min(0).max(100).required(""),
});
export default function AddGame({toggleInput}) {
  function postGame(values) {
    const platformArray = values.platform
      .split(",")
      .map(item => item.trim())
      .filter(item => !isNaN(item))
      .map(item => parseInt(item, 10));

    const updatedValues = {
      ...values,
      release_date: values.release_date.trim(),
      platform: platformArray.length > 0 ? platformArray.join(",") : "",
    };
    fetch("/api/games", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(updatedValues),
    })
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("Failed to post game");
        }
      })
      .then(() => {
        console.log(updatedValues);
        console.log("game posted");
        toggleInput()
        return redirect("/");
      })
      .catch(error => {
        console.error(error);
        console.log(updatedValues);
      });
  }

  return (
    <div>
      <Formik
        initialValues={{
          title: "",
          description: "",
          background_image: "",
          release_date: "",
          platform: "",
          rating: "",
        }}
        validationSchema={validationSchema}
        onSubmit={postGame}>
        {({isSubmitting}) => (
          <Form>
            <div className="flex flex-col w-[400px]">
              <div className="flex flex-row justify-between">
                <label htmlFor="title">Title</label>
                <Field
                  type="text"
                  name="title"
                  placeholder="Title"
                  className="border-2 w-2/3"
                />
              </div>
              <ErrorMessage name="title" component="div" />
              <div className="flex flex-row justify-between">
                <label htmlFor="description">Description</label>
                <Field
                  type="text"
                  name="description"
                  placeholder="Description"
                  className="border-2 w-2/3"
                />
              </div>
              <ErrorMessage name="description" component="div" />
              <div className="flex flex-row justify-between">
                <label htmlFor="image">Image</label>
                <Field
                  type="text"
                  name="background_image"
                  placeholder="Background Image URL"
                  className="border-2 w-2/3"
                />
              </div>
              <ErrorMessage name="background_image" component="div" />
              <div className="flex flex-row justify-between">
                <label htmlFor="release_date">Release Date</label>
                <Field
                  type="text"
                  name="release_date"
                  placeholder="Release Date"
                  className="border-2 w-2/3"
                />
              </div>
              <ErrorMessage name="release_date" component="div" />
              <div className="flex flex-row justify-between">
                <label htmlFor="rating">Rating</label>
                <Field
                  type="number"
                  name="rating"
                  className="border-2 w-2/3"
                  max="100"
                  min="0"
                  step="0.1"
                />
              </div>
              <ErrorMessage name="rating" component="div" />
              <div className="flex flex-row justify-between">
                <label htmlFor="platform">Platform</label>
                <Field
                  type="text"
                  name="platform"
                  placeholder="Platform"
                  className="border-2 w-2/3"
                />
              </div>
              <ErrorMessage name="platform" component="div" />

              <Button type="submit" disabled={isSubmitting} colorScheme="blue">
                Add Game
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
