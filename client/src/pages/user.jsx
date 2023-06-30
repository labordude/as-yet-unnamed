import React, {useState, useEffect} from "react";
import {
  Link,
  useLoaderData,
  useOutletContext,
  useParams,
  useFetcher,
} from "react-router-dom";
import {getUserByID, followUser, unFollowUser} from "../features/ui/helpers";
import {Container, Button, Image, Text, Box, SimpleGrid} from "@chakra-ui/react";
// import GameCard from "../components/game-card"
// import ReviewCard from '../components/review-card';
import UserReviewCard from "../components/user-review-card";
// import {current_user} from './profile'
export async function loader({params}) {
  const user_loader = await getUserByID(params.id);
  return {user_loader};
}
// export async function loaderCurrent() {
//     const current_user = await getCurrentUser();
//     return {current_user};
// }

export default function User() {
  const [userData, setUserData] = useState();
  const [user, setUser] = useOutletContext();
  const {user_loader} = useLoaderData();
  const [currentUserData, setCurrentUserData] = useState();
  // const {current_user} = useLoaderData();
  const [following, setFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState()
  const fetcher = useFetcher()

  useEffect(() => {
    // setCurrentUserData(user);
    setUserData(user_loader);
    setFollowerCount(user_loader.followers.length)
    if (
      (user.followed &&
        user.followed.length > 0 &&
        user.followed.includes(user_loader.id)) ||
      (user_loader.followers &&
        user_loader.followers.length > 0 &&
        user_loader.followers.includes(user.id))
    ) {
      console.log("following", following);
      setFollowing(prev => !prev);
      console.log(following);
    }
    // navigate("/home");
  }, []);

  console.log(user_loader);
  //   console.log(currentUserData);
  // console.log(current_user)

  // function getFollowers(id) {
  //   return fetch(`/api/users/${id}/followers`)
  //   .then(response => {
  //     if (response.ok) {
  //       return response.json()
  //     }
  //   })
  // }


  function toggleFollow() {
    if (following === true) {
      unFollowUser(user_loader.username)
      .then(followed => setUserData(followed))
      .then(setFollowerCount(followerCount => followerCount - 1))
      setFollowing(prev => !prev)
      // .then(followerCount + 1);
      // current_user.username.followed.append(user_loader.username)
      // currentUserData.followed.append(user_loader)
    } else if (following === false) {
      followUser(user_loader.username)
      .then(followed => setUserData(followed))
      .then(setFollowerCount(followerCount => followerCount + 1))
      setFollowing(prev => !prev)
      // .then(followerCount - 1)
      // current_user.username.followed.remove(user_loader.username)
      // currentUserData.followed.remove(user_loader)
    }
  }

  
  // if (fetcher.formData) {
  //   user_loader.followers = fetcher.formData.get('user_loader.followers.length')
  // }


  return (
    <div className='bg-smokey' style={{backgroundColor:"#334139", paddingBottom:"60.8vh"}}>
      <Container centerContent maxW="600px">
      <SimpleGrid className="my-4 flex" columns={[2]} spacing="20px">
      <Box display='flex' bg='#1E2D24' height='400px' width='300px' alignItems='center'>
        <Container className="flex flex-col px-0 items-center">
          <Image
            src={
              user_loader.pfp_image
                ? user_loader.pfp_image
                : "https://placekitten.com/250/250"
            }
            alt="Pfp Image"
            boxSize="200px"
            objectFit='cover'
            borderRadius="full"
          />
          <div className="text-bold text-2xl text-center" style={{paddingTop:"20px"}}>
            {user_loader.username.toUpperCase() || "username would go here"}
          </div>
          <div><b>Followers:</b> {user_loader.followers}</div>
          <div><b>Following:</b> {user_loader.followed}</div>
        </Container>
        </Box>
        <Container centerContent>
        <Box display='flex' bg='#1E2D24' height='400px' width='300px' alignItems='center'>
        <Container >
          <Container>
            <p><b>Name:</b> {user_loader.name}</p>
            <p><b>Bio:</b> {user_loader.bio}</p>
            <p><b>Communities:</b> </p>
          </Container>
          <Container className="mt-8">
            <p><b>Total Reviews:</b> {user_loader.reviews.length}</p>
            <p><b>Total Games:</b> {user_loader.reviews.length}</p>
            <p><b>Total Ratings:</b> {user_loader.reviews.length} </p>
          </Container>
        
          <Container className="mt-8" conterCenter>
            <Button
              colorScheme={
                (user_loader.followers &&
                  user_loader.followers > 0 &&
                  user_loader.followers.includes(user.id)) ||
                following
                  ? "green"
                  : "blue"
              }
              onClick={toggleFollow}>
              {(user_loader.followers &&
                user_loader.followers > 0 &&
                user_loader.followers.includes(user.id)) ||
              following
                ? "Unfollow"
                : "Follow"}
            </Button>
          </Container>
          </Container>
          </Box>
        </Container>
        </SimpleGrid>

      <Container className="flex flex-col">
        <Container centerContent>
        <Text className="text-center font-bold " fontSize={50}>Games</Text>
          {user_loader.games && user_loader.games.length > 0 ? (
            <SimpleGrid columns={[3, null, 4]} spacing="40px" className="mt-4">
              {user_loader.games.slice(0, 4).map(game => (
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

        <Container className="mt-10" centerContent>
        <Text className="text-center font-bold " fontSize={50}>Recent Reviews</Text>
          {user_loader.reviews && user_loader.reviews.length > 0 ? (
            <Container centerContent maxW='1000px'>
              {user_loader.reviews.slice(0, 5).map(review => (
                <UserReviewCard centerContent key={review.id} review={review} />
                // <p>{review.body}</p>
              ))}
            </Container>
          ) : (
            <p>"No reviews yet"</p>
          )}
        </Container>
      </Container>
    </Container>
    </div>
  );
}
