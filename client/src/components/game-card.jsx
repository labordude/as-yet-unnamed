import React from "react";
import {Link} from "react-router-dom";
import {GridItem, Container, Box} from "@chakra-ui/react";
function GameCard({game}) {
  return (
    <Container className="px-4" p="2">
      <div className="card max-w-48 bg-base-100 shadow-xl">
        <figure className="px-0 pt-10 h-48">
          <img
            src={game.background_image}
            alt={game.name}
            className="rounded-xl max-h-48"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{game.name}</h2>
          <p>Rating: {game.rating}</p>
          <div className="card-actions">
            <Link to={`/games/${game.id}`}>Get More Info</Link>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default GameCard;
