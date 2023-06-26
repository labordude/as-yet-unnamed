import React, {useState, useEffect} from "react";
import {getNewestReviews} from "../features/ui/helpers";
import ReviewCard from "./review-card";
export default function NewestReviews() {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    getNewestReviews().then(data => setReviews(data));
  }, []);

  return (
    <div>
      {reviews.map(review => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
}
