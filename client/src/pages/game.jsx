import React, {useEffect, useState} from "react";
import {Link, useLoaderData, useParams} from "react-router-dom";
import {getGamesByID} from "../features/ui/helpers";

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
  return (
    <div>
      Game
      <ul>
        <li>{game_loader.title}</li>
        <li>
          <img src={game_loader.background_image} alt="hi" />
        </li>
        <li>{game_loader.description}</li>
        <li>{game_loader.release_date}</li>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
}
