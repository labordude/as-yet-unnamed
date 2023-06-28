import React, {useState, useEffect, useMemo} from "react";
import {getGames} from "../features/ui/helpers";
import GameCard from "../components/game-card";
import {SimpleGrid, GridItem} from "@chakra-ui/react";
// import ReactPaginate from "react-paginate";
// Components needed: Search, GameCard
import { Formik, Field, Form, ErrorMessage } from "formik"
import * as Yup from "yup"

export default function Games() {
  const [gamesList, setGamesList] = useState([]);
  const [hasPrev, setHasPrev] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showInputs, setShowInputs] = useState(false);

  useEffect(() => {
    getGames(currentPage).then(data => {
      setGamesList(data.games);
      setHasNext(data.has_next);
      setHasPrev(data.has_prev);
      // setCurrentPage(data.page);
    });
  }, [currentPage]);

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
        (value) => value !== null
      ),
    platform: Yup.string().required("Platform is required"),
  })

  function postGame(values) {
    const platformArray = values.platform
      .split(",")
      .map((item) => item.trim())
      .filter((item) => !isNaN(item))
      .map((item) => parseInt(item, 10));

    const updatedValues = {
      ...values,
      release_date: values.release_date.trim(),
      platform: platformArray.length > 0 ? platformArray.join(",") : ""
    }
    fetch('/api/games', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(updatedValues)
    })
    .then(resp => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("Failed to post game")
      }
    })
    .then(() => {
      console.log(updatedValues)
      console.log("game posted")
      setCurrentPage(1)
      setShowInputs(false)
      window.location.reload()
    })
    .catch((error) => {
      console.error(error)
      console.log(updatedValues)
    })
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
        }}
        validationSchema={validationSchema}
        onSubmit={postGame}
      >
        {({ isSubmitting }) => (
          <Form>
            {showInputs && (
            <div>
              <Field
                type="text"
                name="title"
                placeholder="Title"
              />
              <ErrorMessage name="title" component="div" />

              <Field
                type="text"
                name="description"
                placeholder="Description"
              />
              <ErrorMessage name="description" component="div" />

              <Field
                type="text"
                name="background_image"
                placeholder="Background Image URL"
              />
              <ErrorMessage name="background_image" component="div" />

              <Field
                type="text"
                name="release_date"
                placeholder="Release Date"
              />
              <ErrorMessage name="release_date" component="div" />

              <Field
                type="text"
                name="platform"
                placeholder="Platform"
              />
              <ErrorMessage name="platform" component="div" />

              <button type="submit" disabled={isSubmitting}>
                Add Game
              </button>
            </div>
            )}
          </Form>
        )}
      </Formik>
      <button onClick={() => setShowInputs(!showInputs)}>
        {showInputs ? "Hide Inputs" : "Show Inputs"}
      </button>

      <div className="mx-auto join w-1/3 grid grid-cols-2">
        <button
          className={
            hasPrev
              ? "join-item btn btn-outline"
              : "join-item btn btn-outline btn-disabled"
          }
          onClick={() => setCurrentPage(current => current - 1)}>
          Previous page
        </button>

        <button
          className={
            hasNext
              ? "join-item btn btn-outline"
              : "join-item btn btn-outline btn-disabled"
          }
          onClick={() => setCurrentPage(current => current + 1)}>
          Next
        </button>
      </div>
      <SimpleGrid columns={{sm: 2, md: 3}}>
        {gamesList.map(game => (
          <GameCard key={game.id} game={game} />
        ))}
      </SimpleGrid>
    </div>
  );
}
