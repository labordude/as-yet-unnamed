import React, {useState, useEffect} from 'react'
import {Link, useLoaderData, useParams} from "react-router-dom";
import { getUserByID } from '../features/ui/helpers'
import {Container, Image, Box, SimpleGrid} from "@chakra-ui/react";
// import GameCard from "../components/game-card"
// import ReviewCard from '../components/review-card';
import UserReviewCard from '../components/user-review-card'
export async function loader({params}) {
    const user_loader = await getUserByID(params.id);
    return {user_loader};
}

export default function User() {
    const [userData, setUserData] = useState();
    const {user_loader} = useLoaderData();
    useEffect(() => {
        setUserData(user_loader)
    }, [])

    console.log(user_loader)

    return (
        <Container p="0" mx="auto">
            <Container className="my-4 flex">
                <Container className="flex flex-col px-0 items-center">
                    <Image
                        src={
                            user_loader.pfp_image
                                ? user_loader.pfp_image
                                : "https://placekitten.com/250/250"
                        }
                        alt="Pfp Image"
                        boxSize="250px"
                        borderRadius="full"
                    />
                    <div className="text-bold text-2xl text-center">
                        {user_loader.username || "username would go here"}
                    </div>
                    <div>Followers: {user_loader.followers}</div>
                    <div>Following: {user_loader.followed}</div>
                </Container>
                <Container>
                    <Container>
                        <p>Name: {user_loader.name}</p>
                        <p>Bio: {user_loader.bio}</p>
                        <p>Communities: </p>
                    </Container>
                    <Container className="mt-8">
                        <p>Total Reviews: {user_loader.reviews.length}</p>
                        <p>Total Games: {user_loader.reviews.length}</p>
                        <p>Total Ratings: {user_loader.reviews.length} </p>
                    </Container>
                </Container>
            </Container>
            
            <Container className="flex flex-col">
                <Container>
                    <h2 className="text-center text-2xl font-bold">Games</h2>
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
            

                <Container className="mt-10">
                    <h2 className="text-center text-2xl font-bold">Recent Activity</h2>
                    {user_loader.reviews && user_loader.reviews.length > 0 ? (
                        <div>
                            {user_loader.reviews.slice(0,5).map(review => (
                                <UserReviewCard key={review.id} review={review}/>
                                // <p>{review.body}</p>
                            ))}
                        </div>
                    ) : (
                        <p>"No reviews yet"</p>
                    )}
                </Container>
            </Container>
        </Container>
        
    )

}