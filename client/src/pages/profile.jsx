import React, {useState, useEffect} from "react";
import {
  Link,
  useLoaderData,
  useParams,
  useOutletContext,
} from "react-router-dom";
import {getCurrentUser} from "../features/ui/helpers";
import {
  Container,
  Image,
  Box,
  SimpleGrid,
  Button,
  Divider,
} from "@chakra-ui/react";
// import GameCard from "../components/game-card"
import UserReviewCard from "../components/user-review-card";
import GameEdit from "../features/games/edit-game-form";
import EditUser from "./edituser";

export async function loader() {
  const currentUser = await getCurrentUser();
  return {currentUser};
}
// export current_user

// export const action = async ({request}) => {
//   console.log("in the action");
//   const formData = await request.formData();
//   console.log(formData);
//   const values = Object.fromEntries(formData);
//   console.log(values);

//   try {
//     console.log("in try block");
//     const updatedUser = await updateUser(params.id, values);
//     console.log(updatedUser);
//     return redirect(`../profile`);
//   } catch (error) {
//     return {error: "Error creating a new user."};
//   }
// };
export default function Profile({}) {
  const [profileData, setProfileData] = useState();
  const [user, setUser] = useOutletContext();
  const {currentUser} = useLoaderData();
  const [showForm, setShowForm] = useState(false);
  useEffect(() => {
    //check for a current session
    fetch("/api/@me")
      .then(response => {
        if (response.ok) {
          response.json().then(user => {
            console.log(user);
            if (user == null) {
              navigate("/home");
            }
            setUser(user);
            setProfileData(currentUser);
            // navigate("/home");
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  function toggleForm() {
    setShowForm(prevShowForm => !prevShowForm);
  }

  return (
    <Container className="bg-smokey" p="0" mx="auto" >
      <Container className="my-4 flex">
        <Container className="flex flex-col px-0 items-center bg-white">
          <Image
            src={
              currentUser.pfp_image
                ? currentUser.pfp_image
                : "https://placekitten.com/250/250"
            }
            alt="Pfp Image"
            boxSize="250px"
            borderRadius="full"
          />

          <div className="text-bold text-2xl text-center mt-4 items-center">
            {!showForm ? (
              <Button onClick={toggleForm}>Edit Profile</Button>
            ) : (
              <Button onClick={toggleForm}>Cancel Edit</Button>
            )}
          </div>
        </Container>
        {!showForm ? (
          <Container>
            <Container>
              <div className="text-bold text-2xl">
                {currentUser.username || "username would go here"}
              </div>
              <p>Bio: {currentUser.bio}</p>
              <p>Communities: </p>
            </Container>
            <Container className="mt-8">
              <p>Total Reviews: {currentUser.reviews.length}</p>

              <div>Followers: {currentUser.followers}</div>
              <div>Following: {currentUser.followed}</div>
              {/* <p>Total Games: {currentUser.reviews.length}</p>
              <p>Total Ratings: {currentUser.reviews.length} </p> */}
            </Container>
          </Container>
        ) : (
          <EditUser user={currentUser} toggleForm={toggleForm} />
        )}
      </Container>

      <Container className="flex flex-col">
        <Container>
          <h2 className="text-center text-2xl font-bold">Games</h2>
          {currentUser.games && currentUser.games.length > 0 ? (
            <SimpleGrid columns={[3, null, 4]} spacing="40px" className="mt-4">
              {currentUser.games.slice(0, 4).map(game => (
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
          <h2 className="text-center text-2xl font-bold">Recent Reviews</h2>
          {currentUser.reviews && currentUser.reviews.length > 0 ? (
            <div>
              {currentUser.reviews.slice(0, 5).map(review => (
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
