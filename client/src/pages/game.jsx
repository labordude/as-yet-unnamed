import React, {useEffect, useState} from "react";
import {Link, useLoaderData, useParams} from "react-router-dom";
import {getGamesByID} from "../features/ui/helpers";
import {Container, Image, Box} from "@chakra-ui/react";
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
  useEffect(() => {
    setGameData(game_loader);
  }, []);
  const platforms = game_loader.platform;
  console.log(platforms.split(","));
  return (
    <Container className="my-4 flex">
      <Container boxSize="250px" className="flex flex-col">
        <Image src={game_loader.background_image} alt={game_loader.title} />
        <div>Rating: </div>
      </Container>
      <Container>
        <p>{game_loader.title}</p>
        <p>Released on {game_loader.release_date}</p>
        <ul>
          {/* {platforms.map(platform => (
            <li key={platform.id}>{platform.id}</li>
          ))} */}
        </ul>
      </Container>
    </Container>
  );
}
