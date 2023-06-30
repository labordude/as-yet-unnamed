import React, {useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useNavigate} from "react-router-dom";
import {getGamesByID} from "../features/ui/helpers";
import {Box, Button, Textarea, Input, Flex} from "@chakra-ui/react";

const validation = Yup.object().shape({
  review: Yup.string().required("Review body is required"),
  rating: Yup.number().required("Rating is required").min(0).max(5),
});

export default function NewReviewForm({
  toggled,
  game_loader,
  onClose,
  handleNewReview,
}) {
  const [submittedReview, setSubmittedReview] = useState(null);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      review: "",
      rating: "",
      game_id: game_loader.id,
    },
    validationSchema: validation,
    onSubmit: values => {
      // toggled()
      console.log(values);
      postReview(values);
    },
  });

  function postReview(values) {
    fetch("/api/reviews", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        review: values.review,
        rating: values.rating,
        game_id: values.game_id,
      }),
    })
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("Failed to post review");
        }
      })
      .then(data => {
        setSubmittedReview(data);
        console.log("review posted");
        onClose();
        handleNewReview(data);
        // window.location.reload()
        // navigate(`/games/${game_loader.id}`);
        // getGamesByID(game_loader.id)
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <div>
      <Box>
        {submittedReview ? (
          <Box>
            <Text>Submitted Review:</Text>
            <Text>Review: {submittedReview.review}</Text>
            <Text>Rating: {submittedReview.rating}</Text>
          </Box>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <Box>
              <label htmlFor="review">
                <b>Review Body:</b>
              </label>
              <Textarea
                id="review"
                name="review"
                onChange={formik.handleChange}
                value={formik.values.review}
                _hover={{borderColor: "blue.400"}}
                style={{
                  marginTop: "10px",
                  marginBottom: "10px",
                  borderRadius: "5px",
                  borderWidth: "2px",
                }}
              />
              {formik.errors.review && formik.touched.review && (
                <Text>{formik.errors.review}</Text>
              )}
            </Box>
            <Box>
              <label htmlFor="rating">
                <b>Rating:</b>
              </label>
              <Input
                type="number"
                id="rating"
                name="rating"
                onChange={formik.handleChange}
                value={formik.values.rating}
                _hover={{borderColor: "blue.400"}}
                style={{borderRadius: "5px", borderWidth: "2px"}}
              />
              {formik.errors.rating && formik.touched.rating && (
                <div>{formik.errors.rating}</div>
              )}
            </Box>
            <Box textAlign="center" paddingTop="3vh">
              <button
                type="submit"
                style={{boxShadow: "2px 2px 8px rgba(0, 0, 0, .7)"}}
                className="w-[125px] bg-playstation_blue text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-darker_blue transition duration-300">
                Submit
              </button>
            </Box>
          </form>
        )}
      </Box>
    </div>
  );
}
