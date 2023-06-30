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
export default function AddGame({onClose, addNewGame}) {
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
      .then(newGame => {
        console.log("game posted");
        onClose();
        addNewGame(newGame);
        
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
            <div className="flex flex-col">
              <div className="flex flex-row justify-end" style={{marginBottom:"10px"}}>
                <label htmlFor="title"><b>Title</b></label>
                <Field
                  type="text"
                  name="title"
                  placeholder="Title"
                  className="border-2 w-2/3"
                  style={{
                    backgroundColor:"#334139",
                    marginLeft: "20px",
                    paddingLeft: "20px",
                    paddingTop: "5px",
                    paddingBottom: "5px",
                    borderRadius: "8px",
                  }}
                />
              </div>
              <ErrorMessage name="title" component="div" style={{color:"#FE654F"}} className="flex flex-row justify-end"/>
              <div className="flex flex-row justify-end" style={{marginBottom:"10px", marginTop:"10px"}}>
                <label htmlFor="description"><b>Description</b></label>
                <Field
                  type="text"
                  name="description"
                  placeholder="Description"
                  className="border-2 w-2/3"
                  style={{
                    backgroundColor:"#334139",
                    marginLeft: "20px",
                    paddingLeft: "20px",
                    paddingTop: "5px",
                    paddingBottom: "5px",
                    borderRadius: "8px",
                  }}
                />
              </div>
              <ErrorMessage name="description" component="div" style={{color:"#FE654F"}} className="flex flex-row justify-end"/>
              <div className="flex flex-row justify-end" style={{marginBottom:"10px", marginTop:"10px"}}>
                <label htmlFor="image"><b>Image</b></label>
                <Field
                  type="text"
                  name="background_image"
                  placeholder="Background Image URL"
                  className="border-2 w-2/3"
                  style={{
                    backgroundColor:"#334139",
                    marginLeft: "20px",
                    paddingLeft: "20px",
                    paddingTop: "5px",
                    paddingBottom: "5px",
                    borderRadius: "8px",
                  }}
                />
              </div>
              <ErrorMessage name="background_image" component="div" style={{color:"#FE654F"}} className="flex flex-row justify-end"/>
              <div className="flex flex-row justify-end" style={{marginBottom:"10px", marginTop:"10px"}}>
                <label htmlFor="release_date"><b>Release Date</b></label>
                <Field
                  type="text"
                  name="release_date"
                  placeholder="Release Date"
                  className="border-2 w-2/3"
                  style={{
                    backgroundColor:"#334139",
                    marginLeft: "20px",
                    paddingLeft: "20px",
                    paddingTop: "5px",
                    paddingBottom: "5px",
                    borderRadius: "8px",
                  }}
                />
              </div>
              <ErrorMessage name="release_date" component="div" style={{color:"#FE654F"}} className="flex flex-row justify-end"/>
              <div className="flex flex-row justify-end" style={{marginBottom:"10px", marginTop:"10px"}}>
                <label htmlFor="rating"><b>Rating</b></label>
                <Field
                  type="number"
                  name="rating"
                  className="border-2 w-2/3"
                  max="100"
                  min="0"
                  step="0.1"
                  style={{
                    backgroundColor:"#334139",
                    marginLeft: "20px",
                    paddingLeft: "20px",
                    paddingTop: "5px",
                    paddingBottom: "5px",
                    borderRadius: "8px",
                  }}
                />
              </div>
              <ErrorMessage name="rating" component="div" style={{color:"#FE654F"}} className="flex flex-row justify-end"/>
              <div className="flex flex-row justify-end" style={{marginBottom:"10px", marginTop:"10px"}}>
                <label htmlFor="platform"><b>Platform</b></label>
                <Field
                  type="text"
                  name="platform"
                  placeholder="Platform"
                  className="border-2 w-2/3"
                  style={{
                    backgroundColor:"#334139",
                    marginLeft: "20px",
                    paddingLeft: "20px",
                    paddingTop: "5px",
                    paddingBottom: "5px",
                    borderRadius: "8px",
                  }}
                />
              </div>
              <ErrorMessage name="platform" component="div" style={{color:"#FE654F"}} className="flex flex-row justify-end"/>

              <Button 
                type="submit" 
                onMouseEnter={(e) => e.target.style.backgroundColor = "#4346EF"}
                onMouseLeave={(e) => e.target.style.backgroundColor = "#6366F1"}
                style={{
                  marginTop:"10px", 
                  backgroundColor:"#6366F1",
                  color:"white"
                }} 
                disabled={isSubmitting} >Add Game</Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
