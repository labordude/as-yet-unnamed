import React, {useState, useEffect} from "react";
import {Link, useLoaderData, useParams} from "react-router-dom";
import {getCurrentUser} from "../features/ui/helpers";
import {Container, Image, Box, SimpleGrid} from "@chakra-ui/react";
// import GameCard from "../components/game-card"
import UserReviewCard from "../components/user-review-card";

export async function loader() {
  const user = await getCurrentUser();
  return {user};
}

export default function Profile() {
  const [profileData, setProfileData] = useState();
  const {user} = useLoaderData();
  useEffect(() => {
    setProfileData(user);
  }, []);

  console.log(user);

  return (
    <Container p="0" mx="auto">
      <Container className="my-4 flex">
        <Container className="flex flex-col px-0 items-center">
          <Image
            src={
              user.pfp_image
                ? user.pfp_image
                : "https://placekitten.com/250/250"
            }
            alt="Pfp Image"
            boxSize="250px"
            borderRadius="full"
          />
          <div className="text-bold text-2xl text-center">
            {user.username || "username would go here"}
          </div>
          <div>Followers: {user.followers}</div>
          <div>Following: {user.followed}</div>
        </Container>
        <Container>
          <Container>
            <p>Name: {user.name}</p>
            <p>Bio: {user.bio}</p>
            <p>Communities: </p>
          </Container>
          <Container className="mt-8">
            <p>Total Reviews: {user.reviews.length}</p>
            <p>Total Games: {user.reviews.length}</p>
            <p>Total Ratings: {user.reviews.length} </p>
          </Container>
        </Container>
      </Container>

      <Container className="flex flex-col">
        <Container>
          <h2 className="text-center text-2xl font-bold">Games</h2>
          {user.games && user.games.length > 0 ? (
            <SimpleGrid columns={[3, null, 4]} spacing="40px" className="mt-4">
              {user.games.slice(0, 4).map(game => (
                // <GameCard key={game.id} game={game} />
                <div className="flex justify-center items-center" key={game.id}>
                  <Image
                    boxSize="100px"
                    key={game.id}
                    src={game.background_image}
                  />
                </div>
              ))}
            </SimpleGrid>
          ) : (
            <p>"No games yet"</p>
          )}
        </Container>
        {/* <Container className="mt-10 ">
          <h2 className="text-center text-2xl font-bold">
            Highest Rated Games
          </h2>
          {user.reviews && user.reviews.length > 0 ? (
            <SimpleGrid columns={[3, null, 4]} spacing="40px" className="mt-4">
              {Array.from(user.reviews)
                .sort(function (a, b) {
                  return b.rating - a.rating;
                })
                .slice(0, 4)
                .map(review => (
                  // <GameCard key={game.id} game={game} />
                  <div
                    className="flex flex-col items-center"
                    key={review.game_id}>
                    <Image
                      boxSize="100px"
                      key={review.game_id}
                      src={user.games[0].background_image}
                    />
                    <span className="text-center">Rating:{review.rating}</span>
                  </div>
                ))}
            </SimpleGrid>
          ) : (
            <p>"No games yet"</p>
          )}
        </Container> */}
        <Container className="mt-10">
          <h2 className="text-center text-2xl font-bold">Recent Activity</h2>
          {user.reviews && user.reviews.length > 0 ? (
            <div>
              {user.reviews.slice(0, 5).map(review => (
                <UserReviewCard key={review.id} review={review} />
                // <p>{review.body}</p>
              ))}
            </div>
          ) : (
            <p>"No reviews yet"</p>
          )}
        </Container>
      </Container>
    </Container>
  );
}
