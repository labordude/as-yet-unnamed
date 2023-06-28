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
      {reviews.map(game => (
        <ReviewCard
          key={game.reviews[0].id}
          review={game.reviews[0]}
          game={game}
        />
      ))}
    </div>
  );
}
