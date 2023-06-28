import React, {useState} from "react";
import {Image, Icon, Input, Textarea, Button} from "@chakra-ui/react";
import {FaHeart, FaRegComments} from "react-icons/fa";

export default function ReviewCardDetailed({review, game}) {
  const [isDeleted, setIsDeleted] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editedReview, setEditedReview] = useState(review.review)
  const [editedRating, setEditedRating] = useState(review.rating)

  function deleteReview() {
    fetch(`/api/reviews/${review.id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.ok) {
          setIsDeleted(true);
          console.log('Review deleted')
        } else {
          throw new Error("Failed to delete review")
        }
      })
      .catch((error) => console.error(error))
  }

  if (isDeleted) {
    return null
  }

  function editReview() {
    fetch(`/api/reviews/${review.id}`, {
      method: 'PATCH',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        body: editedReview,
        rating: parseInt(editedRating)
      })
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update review")
        }
        return res.json()
      })
      .then((data) => {
        setIsEditing(false);
        setEditedReview({
          ...review,
          review: editedReview,
          rating: data
        })
        window.location.reload()
      })
      .catch((error) => console.error(error));
  }

  return (
    <div className="w-full border-2 flex flex-col px-2">
      <div className="font-bold text-lg">
        {game.title}{" "}
        <span className="font-medium text-sm">
          {game.release_date.slice(0, 4)}
        </span>
      </div>
      <div className="flex flex-row align-top items-start justify-start">
        <div className="justify-start align-top items-start">
          <Image w="250px" src={review.user.pfp_image} />
        </div>
        <div className="flex flex-col ml-2">
          <div className="text-sm font-bold">{review.user.username}</div>
          {isEditing ? (
            <div className='flex flex-col'>
              <Textarea 
                className="text-sm"
                value={editedReview}
                onChange={(e) => setEditedReview(e.target.value)}
                _hover={{ borderColor: "blue.400" }}
              />
              <Input 
                type="number"
                className="text-sm"
                value={editedRating}
                onChange={(e) => setEditedRating(e.target.value)}
                _hover={{ borderColor: "blue.400" }}
              />
            </div>
          ) : (
            <>
              <div className="text-sm font-bold">{review.rating} /5</div>
              <div className="text-sm">{review.body}</div>
            </>
          )}
          <div className="text-sm">
            <Icon as={FaHeart} />
            Likes <Icon as={FaRegComments} />2 See full review
          </div>
          {isEditing ? (
            <Button onClick={editReview}>Save Changes</Button>
          ) : (
            <Button onClick={() => setIsEditing(true)}>Edit Review</Button>
          )}
          <Button onClick={deleteReview}>Delete Review</Button>
        </div>
      </div>
    </div>
  );
}
