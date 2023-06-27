import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validation = Yup.object().shape({
    review: Yup.string().required('Review body is required'),
    rating: Yup.number().required('Rating is required').min(0).max(5),
    });



export default function NewReviewForm({toggled, game_loader}) {
    const formik = useFormik({
        initialValues: {
            review: '',
            rating: '',
            game_id: game_loader.id
        },
        validationSchema: validation,
        onSubmit: (values) => {
            toggled()
            console.log(values);
            postReview(values);
        },
    });

    function postReview(values) {
        fetch("/api/reviews", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                review: values.review,
                rating: values.rating,
                game_id: values.game_id
            })
        })
        .then(resp => {
            console.log(resp.status);
            console.log(resp.json());
        })
        .catch((error) => {
            console.error(error)
        })
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <label htmlFor="review">Review Body:</label>
                <textarea
                    id="review"
                    name="review"
                    onChange={formik.handleChange}
                    value={formik.values.review}
                />
                {formik.errors.review && formik.touched.review && (
                    <div>{formik.errors.review}</div>
                )}
            </div>
            <div>
                <label htmlFor="rating">Rating:</label>
                <input
                    type="number"
                    id="rating"
                    name="rating"
                    onChange={formik.handleChange}
                    value={formik.values.rating}
                />
                {formik.errors.rating && formik.touched.rating && (
                    <div>{formik.errors.rating}</div>
                )}
            </div>
            <button type="submit">Submit</button>
        </form>
    )
}
