import React, {useEffect, useState} from "react";
import {Link, useLoaderData, useParams} from "react-router-dom";
import {getGamesByID} from "../features/ui/helpers";
import {Container, Image, Button} from "@chakra-ui/react";
import ReviewCardDetailed from "../components/review-card-detailed";
import NewReviewForm from "../components/NewReviewForm";
import GameEdit from "../features/games/edit-game-form";
export async function loader({params}) {
  const game_loader = await getGamesByID(params.id);
  return {game_loader};
}

// components needed:
// data needed: Title, Release Date, Platforms, Community, Description, Rating, CurrentUser rating,
export default function Game() {
  // let {id} = useParams();
  const [gameData, setGameData] = useState();
  const {game_loader} = useLoaderData();
  const [toggle, setToggle] = useState(false);
  const [communities, setCommunities] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const {game_platforms} = game_loader;
  function toggleShowEdit() {
    setShowEdit(prevShowEdit => !prevShowEdit);
  }
  useEffect(() => {
    setGameData(game_loader);
    setCommunities(
      Array.from([
        ...new Set(
          game_loader.game_communities.map(
            community => community.community.name,
          ),
        ),
      ]),
    );
    // console.log(Object.values(communities));
  }, []);
  function toggled() {
    setToggle(prev => !prev);
  }

  return (
    <Container>
      <Container className="my-4 flex">
        <Container boxSize="250px" className="flex flex-col">
          <Image src={game_loader.background_image} alt={game_loader.title} />
          <div>Rating: </div>
        </Container>
        <Container>
          {showEdit ? (
            <GameEdit game={game_loader} toggleShowEdit={toggleShowEdit} />
          ) : (
            <Button onClick={toggleShowEdit}>Show Edit Game Form</Button>
          )}
          <p>{game_loader.title}</p>
          <p>Released on {game_loader.release_date}</p>

          <p>
            Communities:{" "}
            {Object.values(communities).map(community => (
              <span key={community}>
                <Link
                  to={`/communities/${community}`}
                  key={community}
                  className="border-b-2">
                  {community}
                </Link>{" "}
              </span>
            ))}
          </p>
          <p>Game description: {game_loader.description}</p>
        </Container>
      </Container>
      <Container>
        <h2 className="text-center text-2xl font-bold">Game Reviews</h2>
        {game_loader.reviews && game_loader.reviews.length > 0 ? (
          <div>
            {game_loader.reviews.map(review => (
              <ReviewCardDetailed
                key={review.id}
                review={review}
                game={game_loader}
              />
            ))}
          </div>
        ) : (
          <p>"No reviews yet"</p>
        )}
        {!toggle ? (
          <button onClick={toggled}>Add Review</button>
        ) : (
          <NewReviewForm toggled={toggled} game_loader={game_loader} />
        )}
      </Container>
    </Container>
  );
}
