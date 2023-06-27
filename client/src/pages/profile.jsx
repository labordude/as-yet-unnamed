import React, {useState, useEffect} from 'react'
import {Link, useLoaderData, useParams} from "react-router-dom";
import { getCurrentUser } from '../features/ui/helpers'
import {Container, Image, Box} from "@chakra-ui/react";
// import GameCard from "../components/game-card"
import UserReviewCard from '../components/user-review-card'

export async function loader() {
    const user = await getCurrentUser();
    return {user};
}


export default function Profile() {
    const [profileData, setProfileData] = useState();
    const {user} = useLoaderData();
    useEffect(() => {
        setProfileData(user);
    }, [])

    console.log(user)
    

    return (
        <Container>
            <Container className="my-4 flex">
                <Container boxSize="250px" className="flex flex-col">
                    <Image src={user.pfp_image} alt="Pfp Image"/>
                    <div>Username: {user.username}</div>
                    <div>Followers: {user.followers}</div>
                    <div>Following: {user.followed}</div>
                </Container>
                <Container>
                    <p>{user.name}</p>
                    <p>Bio: </p>
                    <p>{user.bio}</p>
                </Container>
            </Container>
            <Container>
                <h2 className="text-center text-2xl font-bold">Games</h2>
                {user.games && user.games.length > 0 ? (
                    <div>
                        {user.games.map(game => (
                            // <GameCard key={game.id} game={game} />
                            <p>{game.title}</p>
                        ))}
                    </div>
                ) : (
                    <p>"No games yet"</p>
                )}
            </Container>
            <Container>
                <h2 className="text-center text-2xl font-bold">Recent Reviews</h2>
                {user.reviews && user.reviews.length > 0 ? (
                    <div>
                        {user.reviews.slice(0,5).map(review => (
                            <UserReviewCard key={review.id} review={review}/>
                            // <p>{review.body}</p>
                        ))}
                    </div>
                ) : (
                    <p>"No reviews yet"</p>
                )}
            </Container>
        </Container>
        
    )


}