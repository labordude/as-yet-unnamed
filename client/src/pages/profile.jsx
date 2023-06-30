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
  Text,
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

  //   return (
  //     <Container className="bg-smokey" p="0" mx="auto" >
  //       <Container className="my-4 flex">
  //         <Container className="flex flex-col px-0 items-center bg-white">
  //           <Image
  //             src={
  //               currentUser.pfp_image
  //                 ? currentUser.pfp_image
  //                 : "https://placekitten.com/250/250"
  //             }
  //             alt="Pfp Image"
  //             boxSize="250px"
  //             borderRadius="full"
  //           />

  //           <div className="text-bold text-2xl text-center mt-4 items-center">
  //             {!showForm ? (
  //               <Button onClick={toggleForm}>Edit Profile</Button>
  //             ) : (
  //               <Button onClick={toggleForm}>Cancel Edit</Button>
  //             )}
  //           </div>
  //         </Container>
  //         {!showForm ? (
  //           <Container>
  //             <Container>
  //               <div className="text-bold text-2xl">
  //                 {currentUser.username || "username would go here"}
  //               </div>
  //               <p>Bio: {currentUser.bio}</p>
  //               <p>Communities: </p>
  //             </Container>
  //             <Container className="mt-8">
  //               <p>Total Reviews: {currentUser.reviews.length}</p>

  //               <div>Followers: {currentUser.followers}</div>
  //               <div>Following: {currentUser.followed}</div>
  //               {/* <p>Total Games: {currentUser.reviews.length}</p>
  //               <p>Total Ratings: {currentUser.reviews.length} </p> */}
  //             </Container>
  //           </Container>
  //         ) : (
  //           <EditUser user={currentUser} toggleForm={toggleForm} />
  //         )}
  //       </Container>

  //       <Container className="flex flex-col">
  //         <Container>
  //           <h2 className="text-center text-2xl font-bold">Games</h2>
  //           {currentUser.games && currentUser.games.length > 0 ? (
  //             <SimpleGrid columns={[3, null, 4]} spacing="40px" className="mt-4">
  //               {currentUser.games.slice(0, 4).map(game => (
  //                 // <GameCard key={game.id} game={game} />
  //                 <div className="flex justify-center items-center" key={game.id}>
  //                   <Image
  //                     boxSize="100px"
  //                     key={game.id}
  //                     src={game.background_image}
  //                   />
  //                 </div>
  //               ))}
  //             </SimpleGrid>
  //           ) : (
  //             <p>"No games yet"</p>
  //           )}
  //         </Container>
  //         {/* <Container className="mt-10 ">
  //           <h2 className="text-center text-2xl font-bold">
  //             Highest Rated Games
  //           </h2>
  //           {user.reviews && user.reviews.length > 0 ? (
  //             <SimpleGrid columns={[3, null, 4]} spacing="40px" className="mt-4">
  //               {Array.from(user.reviews)
  //                 .sort(function (a, b) {
  //                   return b.rating - a.rating;
  //                 })
  //                 .slice(0, 4)
  //                 .map(review => (
  //                   // <GameCard key={game.id} game={game} />
  //                   <div
  //                     className="flex flex-col items-center"
  //                     key={review.game_id}>
  //                     <Image
  //                       boxSize="100px"
  //                       key={review.game_id}
  //                       src={user.games[0].background_image}
  //                     />
  //                     <span className="text-center">Rating:{review.rating}</span>
  //                   </div>
  //                 ))}
  //             </SimpleGrid>
  //           ) : (
  //             <p>"No games yet"</p>
  //           )}
  //         </Container> */}
  //         <Container className="mt-10">
  //           <h2 className="text-center text-2xl font-bold">Recent Reviews</h2>
  //           {currentUser.reviews && currentUser.reviews.length > 0 ? (
  //             <div>
  //               {currentUser.reviews.slice(0, 5).map(review => (
  //                 <UserReviewCard key={review.id} review={review} />
  //                 // <p>{review.body}</p>
  //               ))}
  //             </div>
  //           ) : (
  //             <p>"No reviews yet"</p>
  //           )}
  //         </Container>
  //       </Container>
  //     </Container>
  //   );
  // }

  return (
    // Top part wrapped in this div
    <div className="bg-smokey" style={{minHeight: "100vh"}}>
      <Container
        maxW="600px"
        style={{paddingTop: "70px", paddingBottom: "40px"}}>
        <SimpleGrid className="my-4 flex" columns={[2]} spacing="20px">
          {/* pfp and followers and follwing + Name */}
          <Box
            display="flex"
            bg="#1E2D24"
            height="400px"
            width="300px"
            alignItems="center">
            <Container className="flex flex-col px-0 items-center">
              <Image
                src={
                  currentUser.pfp_image
                    ? currentUser.pfp_image
                    : "https://placekitten.com/250/250"
                }
                alt="Pfp Image"
                boxSize="200px"
                objectFit="cover"
                borderRadius="full"
              />{" "}
              <div
                className="text-bold text-2xl text-center"
                style={{paddingTop: "10px", paddingBottom: "10px"}}>
                {!showForm ? (
                  <Button
                    onClick={toggleForm}
                    // as="button"
                    // height="24px"
                    // lineHeight="1.2"
                    // transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
                    // border="1px"
                    // px="8px"
                    // borderRadius="2px"
                    // fontSize="14px"
                    // fontWeight="semibold"
                    // bg="#f5f6f7"
                    // borderColor="#ccd0d5"
                    // color="#4b4f56"
                    // _hover={{bg: "#ebedf0"}}
                    // _active={{
                    //   bg: "#dddfe2",
                    //   transform: "scale(0.98)",
                    //   borderColor: "#bec3c9",
                    // }}
                    // _focus={{
                    //   boxShadow:
                    //     "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
                    // }}
                    onMouseEnter={e =>
                      (e.target.style.backgroundColor = "#4346EF")
                    }
                    onMouseLeave={e =>
                      (e.target.style.backgroundColor = "#6366F1")
                    }
                    style={{
                      height: "3vh",
                      backgroundColor: "#6366F1",
                      color: "white",
                    }}>
                    Edit User
                  </Button>
                ) : (
                  <Button
                    onClick={toggleForm}
                    onMouseEnter={e =>
                      (e.target.style.backgroundColor = "#FE3D20")
                    }
                    onMouseLeave={e =>
                      (e.target.style.backgroundColor = "#FE654F")
                    }
                    style={{
                      height: "3vh",
                      backgroundColor: "#FE654F",
                      color: "white",
                    }}>
                    Cancel Edit
                  </Button>
                )}
              </div>
              <div className="text-bold text-2xl text-center">
                <b>
                  {currentUser.username.toUpperCase() ||
                    "username would go here"}{" "}
                </b>
              </div>
              <div>
                {" "}
                <b>Followers: </b> {currentUser.followers}
              </div>
              <div>
                {" "}
                <b>Following: </b> {currentUser.followed}
              </div>
            </Container>
          </Box>
          <Box display="flex" bg="#1E2D24" height="400px" alignItems="center">
            {!showForm ? (
              <Container>
                <Container>
                  <p>
                    {" "}
                    <b>Name:</b> {currentUser.name}
                  </p>
                  <p>
                    {" "}
                    <b>Bio:</b> {currentUser.bio}
                  </p>
                  <p>
                    {" "}
                    <b>Communities:</b>{" "}
                  </p>
                </Container>
                <Container className="mt-8">
                  <p>
                    {" "}
                    <b>Total Reviews:</b> {currentUser.reviews.length}
                  </p>
                  <p>
                    {" "}
                    <b>Total Games:</b> {currentUser.reviews.length}
                  </p>
                  <p>
                    {" "}
                    <b>Total Ratings:</b> {currentUser.reviews.length}
                  </p>
                </Container>
              </Container>
            ) : (
              <EditUser
                user={currentUser}
                toggleForm={toggleForm}
                className="z-10"
              />
            )}
          </Box>
        </SimpleGrid>
      </Container>

      <Container maxW="1000px" mt={6}>
        <div>
          <Text className="text-center font-bold " fontSize={50}>
            Games
          </Text>
          {currentUser.games && currentUser.games.length > 0 ? (
            <SimpleGrid columns={[3, null, 4]} spacing="40px" className="mt-4">
              {currentUser.games.slice(0, 4).map(game => (
                // <GameCard key={game.id} game={game} />
                <Box maxW="500px" key={game.id}>
                  <Image
                    // boxSize="200px"
                    key={game.id}
                    src={game.background_image}
                    maxwidth={250}
                    objectFit="align"
                    maxHeight={275}
                    border="2px"
                    borderColor="gray.200"
                    className="rounded-xl"
                  />
                </Box>
              ))}
            </SimpleGrid>
          ) : (
            <p>"No games yet"</p>
          )}
        </div>
        <div>
          <Text className="text-center font-bold " fontSize={50}>
            Recent Comments
          </Text>
          <div className="overflow-x-auto">
            <table className="table">
              <tbody>
                {/* row 1 */}
                {user.comments && user.comments.length > 0 ? (
                  user.comments.slice(0, 4).map(comment => (
                    <tr key={comment.id}>
                      <td key={comment.id}>
                        <Link
                          to={`../threads/${comment.thread_id}`}
                          key={comment.id}>
                          {comment.description}
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <p>"No comments yet"</p>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <Container maxW="1000px">
          <Text className="text-center font-bold " fontSize={50}>
            Recent Reviews
          </Text>
          {currentUser.reviews && currentUser.reviews.length > 0 ? (
            <Container maxW="1000px">
              {currentUser.reviews.slice(0, 5).map(review => (
                <UserReviewCard key={review.id} review={review} />
                // <p>{review.body}</p>
              ))}
            </Container>
          ) : (
            <p>"No reviews yet"</p>
          )}
        </Container>
      </Container>
    </div>
  );
}
