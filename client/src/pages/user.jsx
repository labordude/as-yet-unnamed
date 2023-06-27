import React, {useState, useEffect} from 'react'
import {Link, useLoaderData, useParams} from "react-router-dom";
import { getUserByID } from '../features/ui/helpers'
import {Container, Image, Box} from "@chakra-ui/react";
import GameCard from "../components/game-card"
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

    return (
        <Container>
            <Container className="my-4 flex">
                <Container boxSize="250px" className="flex flex-col">
                    <Image src={user_loader.pfp_image} alt="Pfp Image"/>
                    <div>Username: {user_loader.username}</div>
                    <div>Followers: {user_loader.followers}</div>
                    <div>Following: {user_loader.followed}</div>
                </Container>
                <Container>
                    <p>{user_loader.name}</p>
                    <p>Bio: </p>
                    <p>{user_loader.bio}</p>
                </Container>
            </Container>
            <Container>
                <h2 className="text-center text-2xl font-bold">Your Games</h2>
                {user_loader.games && user_loader.games.length > 0 ? (
                    <div>
                        {user_loader.games.map(game => (
                            <GameCard key={game.id} game={game_loader} />
                        ))}
                    </div>
                ) : (
                    <p>"No games yet"</p>
                )}
            </Container>
        </Container>
        
    )


}