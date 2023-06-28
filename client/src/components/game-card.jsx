import React from "react";
import {Link} from "react-router-dom";
import {GridItem, Container, Box, Button, Image} from "@chakra-ui/react";
function GameCard({game}) {
  
  return (
    <Container className="px-4" p="2">
      <div className="card max-w-48 bg-base-100 shadow-xl">
        <figure className="px-0 pt-10 h-72 object-contain">
          <Image
            src={game.background_image}
            alt={game.name}
            boxSize="350px"
            objectFit="contain"
            className="rounded-xl"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{game.name}</h2>
          <p>Rating: {game.rating && game.rating.toFixed(2)}</p>
          <div className="card-actions">
            <Link to={`/games/${game.id}`}>
              <Button colorScheme="blue">Get More Info</Button>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default GameCard;
